const ADMIN_API_VERSION = "2026-07";
const REVIEW_TYPE = "product_review";

type AdminGraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

let cachedToken: { value: string; expiresAt: number } | null = null;

export function isAdminConfigured() {
  return getAdminConfig() !== null;
}

function getAdminConfig() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const clientId = process.env.SHOPIFY_ADMIN_CLIENT_ID;
  const clientSecret = process.env.SHOPIFY_ADMIN_CLIENT_SECRET;
  if (!domain || !clientId || !clientSecret) return null;
  return { domain, clientId, clientSecret };
}

async function getAdminToken(config: {
  domain: string;
  clientId: string;
  clientSecret: string;
}): Promise<string | null> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.value;
  }

  try {
    const res = await fetch(`https://${config.domain}/admin/oauth/access_token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: config.clientId,
        client_secret: config.clientSecret,
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Shopify Admin token request failed: ${res.status}`);
      return null;
    }

    const json = (await res.json()) as {
      access_token: string;
      expires_in: number;
    };
    cachedToken = {
      value: json.access_token,
      expiresAt: Date.now() + json.expires_in * 1000,
    };
    return cachedToken.value;
  } catch (error) {
    console.error("Shopify Admin token request threw", error);
    return null;
  }
}

async function adminFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: { noStore?: boolean },
): Promise<T | null> {
  const config = getAdminConfig();
  if (!config) return null;

  const token = await getAdminToken(config);
  if (!token) return null;

  try {
    const res = await fetch(
      `https://${config.domain}/admin/api/${ADMIN_API_VERSION}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": token,
        },
        body: JSON.stringify({ query, variables }),
        ...(options?.noStore
          ? { cache: "no-store" as const }
          : { next: { revalidate: 300, tags: ["product-reviews"] } }),
      },
    );

    if (!res.ok) {
      console.error(`Shopify Admin API request failed: ${res.status}`);
      return null;
    }

    const json = (await res.json()) as AdminGraphQLResponse<T>;
    if (json.errors?.length) {
      console.error("Shopify Admin API errors", json.errors);
      return null;
    }

    return json.data ?? null;
  } catch (error) {
    console.error("Shopify Admin API request threw", error);
    return null;
  }
}

export type ProductReview = {
  id: string;
  rating: number;
  title: string;
  body: string;
  authorName: string;
  submittedAt: string;
};

const REVIEWS_QUERY = `
  query ProductReviews($type: String!, $after: String) {
    metaobjects(type: $type, first: 250, after: $after) {
      nodes {
        id
        capabilities {
          publishable {
            status
          }
        }
        product: field(key: "product") {
          reference {
            ... on Product {
              handle
            }
          }
        }
        rating: field(key: "rating") { value }
        title: field(key: "title") { value }
        body: field(key: "body") { value }
        authorName: field(key: "author_name") { value }
        submittedAt: field(key: "submitted_at") { value }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

type ReviewsQueryResult = {
  metaobjects: {
    nodes: {
      id: string;
      capabilities: { publishable: { status: string } | null };
      product: { reference: { handle: string } | null } | null;
      rating: { value: string } | null;
      title: { value: string } | null;
      body: { value: string } | null;
      authorName: { value: string } | null;
      submittedAt: { value: string } | null;
    }[];
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
  };
};

export async function fetchApprovedReviews(
  productHandle: string,
): Promise<ProductReview[]> {
  const reviews: ProductReview[] = [];
  let after: string | null = null;

  do {
    const data: ReviewsQueryResult | null = await adminFetch<ReviewsQueryResult>(
      REVIEWS_QUERY,
      { type: REVIEW_TYPE, after },
    );
    if (!data) return [];

    for (const node of data.metaobjects.nodes) {
      if (node.capabilities.publishable?.status !== "ACTIVE") continue;
      if (node.product?.reference?.handle !== productHandle) continue;
      const rating = Number(node.rating?.value);
      if (!Number.isInteger(rating) || rating < 1 || rating > 5) continue;
      reviews.push({
        id: node.id,
        rating,
        title: node.title?.value ?? "",
        body: node.body?.value ?? "",
        authorName: node.authorName?.value ?? "",
        submittedAt: node.submittedAt?.value ?? "",
      });
    }

    after = data.metaobjects.pageInfo.hasNextPage
      ? data.metaobjects.pageInfo.endCursor
      : null;
  } while (after);

  return reviews.sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
}

const PRODUCT_ID_QUERY = `
  query ProductIdByHandle($handle: String!) {
    productByIdentifier(identifier: { handle: $handle }) {
      id
    }
  }
`;

const REVIEW_CREATE_MUTATION = `
  mutation ReviewCreate($metaobject: MetaobjectCreateInput!) {
    metaobjectCreate(metaobject: $metaobject) {
      metaobject {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function createDraftReview(input: {
  productHandle: string;
  rating: number;
  title: string;
  body: string;
  authorName: string;
}): Promise<boolean> {
  const product = await adminFetch<{ productByIdentifier: { id: string } | null }>(
    PRODUCT_ID_QUERY,
    { handle: input.productHandle },
    { noStore: true },
  );
  const productId = product?.productByIdentifier?.id;
  if (!productId) return false;

  const fields = [
    { key: "product", value: productId },
    { key: "rating", value: String(input.rating) },
    { key: "body", value: input.body },
    { key: "author_name", value: input.authorName },
    { key: "submitted_at", value: new Date().toISOString() },
  ];
  if (input.title) fields.push({ key: "title", value: input.title });

  const data = await adminFetch<{
    metaobjectCreate: {
      metaobject: { id: string } | null;
      userErrors: { field: string[] | null; message: string }[];
    };
  }>(
    REVIEW_CREATE_MUTATION,
    {
      metaobject: {
        type: REVIEW_TYPE,
        capabilities: { publishable: { status: "DRAFT" } },
        fields,
      },
    },
    { noStore: true },
  );

  const result = data?.metaobjectCreate;
  if (!result || result.userErrors.length > 0 || !result.metaobject) {
    if (result?.userErrors.length) {
      console.error("metaobjectCreate errors", result.userErrors);
    }
    return false;
  }
  return true;
}

const API_VERSION = "2025-01";

type ShopifyGraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

function getConfig() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!domain || !token) return null;
  return { domain, token };
}

async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T | null> {
  const config = getConfig();
  if (!config) return null;

  try {
    const res = await fetch(
      `https://${config.domain}/api/${API_VERSION}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": config.token,
        },
        body: JSON.stringify({ query, variables }),
        next: { revalidate: 3600, tags: ["shopify-products"] },
      },
    );

    if (!res.ok) {
      console.error(`Shopify Storefront API request failed: ${res.status}`);
      return null;
    }

    const json = (await res.json()) as ShopifyGraphQLResponse<T>;
    if (json.errors?.length) {
      console.error("Shopify Storefront API errors", json.errors);
      return null;
    }

    return json.data ?? null;
  } catch (error) {
    console.error("Shopify Storefront API request threw", error);
    return null;
  }
}

const PRODUCTS_QUERY = `
  query StorefrontProducts($first: Int!) {
    products(first: $first) {
      nodes {
        handle
        availableForSale
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          nodes {
            url
            altText
          }
        }
      }
    }
  }
`;

type ProductsQueryResult = {
  products: {
    nodes: {
      handle: string;
      availableForSale: boolean;
      priceRange: {
        minVariantPrice: { amount: string; currencyCode: string };
      };
      images: { nodes: { url: string; altText: string | null }[] };
    }[];
  };
};

export type ShopifyProductSummary = {
  handle: string;
  availableForSale: boolean;
  price: number;
  currencyCode: string;
  images: string[];
};

export async function fetchShopifyProducts(): Promise<
  Map<string, ShopifyProductSummary>
> {
  const data = await shopifyFetch<ProductsQueryResult>(PRODUCTS_QUERY, {
    first: 100,
  });

  const byHandle = new Map<string, ShopifyProductSummary>();
  if (!data) return byHandle;

  for (const node of data.products.nodes) {
    byHandle.set(node.handle, {
      handle: node.handle,
      availableForSale: node.availableForSale,
      price: Number(node.priceRange.minVariantPrice.amount),
      currencyCode: node.priceRange.minVariantPrice.currencyCode,
      images: node.images.nodes.map((image) => image.url),
    });
  }

  return byHandle;
}

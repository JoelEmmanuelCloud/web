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
  options?: { noStore?: boolean },
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
        ...(options?.noStore
          ? { cache: "no-store" as const }
          : { next: { revalidate: 3600, tags: ["shopify-products"] } }),
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
        variants(first: 1) {
          nodes {
            id
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
      variants: { nodes: { id: string }[] };
    }[];
  };
};

export type ShopifyProductSummary = {
  handle: string;
  availableForSale: boolean;
  price: number;
  currencyCode: string;
  images: string[];
  variantId: string | null;
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
      variantId: node.variants.nodes[0]?.id ?? null,
    });
  }

  return byHandle;
}

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
    }
    lines(first: 50) {
      nodes {
        id
        quantity
        cost {
          totalAmount { amount currencyCode }
        }
        attributes {
          key
          value
        }
        merchandise {
          ... on ProductVariant {
            id
            title
            image { url }
            product {
              title
              handle
            }
          }
        }
      }
    }
  }
`;

type CartQueryNode = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
  };
  lines: {
    nodes: {
      id: string;
      quantity: number;
      cost: { totalAmount: { amount: string; currencyCode: string } };
      attributes: { key: string; value: string }[];
      merchandise: {
        id: string;
        title: string;
        image: { url: string } | null;
        product: { title: string; handle: string };
      };
    }[];
  };
};

export type CartLineInput = {
  merchandiseId: string;
  quantity: number;
  attributes?: { key: string; value: string }[];
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  subtotal: number;
  currencyCode: string;
  lines: {
    id: string;
    quantity: number;
    title: string;
    productHandle: string;
    image: string | null;
    linePrice: number;
    attributes: { key: string; value: string }[];
  }[];
};

function mapCart(node: CartQueryNode): Cart {
  return {
    id: node.id,
    checkoutUrl: node.checkoutUrl,
    totalQuantity: node.totalQuantity,
    subtotal: Number(node.cost.subtotalAmount.amount),
    currencyCode: node.cost.subtotalAmount.currencyCode,
    lines: node.lines.nodes.map((line) => ({
      id: line.id,
      quantity: line.quantity,
      title: line.merchandise.product.title,
      productHandle: line.merchandise.product.handle,
      image: line.merchandise.image?.url ?? null,
      linePrice: Number(line.cost.totalAmount.amount),
      attributes: line.attributes,
    })),
  };
}

const CART_CREATE_MUTATION = `
  ${CART_FRAGMENT}
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
`;

const CART_LINES_ADD_MUTATION = `
  ${CART_FRAGMENT}
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
`;

const CART_LINES_UPDATE_MUTATION = `
  ${CART_FRAGMENT}
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
`;

const CART_LINES_REMOVE_MUTATION = `
  ${CART_FRAGMENT}
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
`;

const CART_QUERY = `
  ${CART_FRAGMENT}
  query CartQuery($id: ID!) {
    cart(id: $id) { ...CartFields }
  }
`;

export async function shopifyCartCreate(
  lines: CartLineInput[],
): Promise<Cart | null> {
  const data = await shopifyFetch<{
    cartCreate: { cart: CartQueryNode | null; userErrors: { message: string }[] };
  }>(CART_CREATE_MUTATION, { lines }, { noStore: true });

  const result = data?.cartCreate;
  if (!result || result.userErrors.length > 0 || !result.cart) {
    if (result?.userErrors.length) {
      console.error("cartCreate errors", result.userErrors);
    }
    return null;
  }
  return mapCart(result.cart);
}

export async function shopifyCartLinesAdd(
  cartId: string,
  lines: CartLineInput[],
): Promise<Cart | null> {
  const data = await shopifyFetch<{
    cartLinesAdd: { cart: CartQueryNode | null; userErrors: { message: string }[] };
  }>(CART_LINES_ADD_MUTATION, { cartId, lines }, { noStore: true });

  const result = data?.cartLinesAdd;
  if (!result || result.userErrors.length > 0 || !result.cart) {
    if (result?.userErrors.length) {
      console.error("cartLinesAdd errors", result.userErrors);
    }
    return null;
  }
  return mapCart(result.cart);
}

export async function shopifyCartLinesUpdate(
  cartId: string,
  lines: { id: string; quantity: number }[],
): Promise<Cart | null> {
  const data = await shopifyFetch<{
    cartLinesUpdate: { cart: CartQueryNode | null; userErrors: { message: string }[] };
  }>(CART_LINES_UPDATE_MUTATION, { cartId, lines }, { noStore: true });

  const result = data?.cartLinesUpdate;
  if (!result || result.userErrors.length > 0 || !result.cart) {
    if (result?.userErrors.length) {
      console.error("cartLinesUpdate errors", result.userErrors);
    }
    return null;
  }
  return mapCart(result.cart);
}

export async function shopifyCartLinesRemove(
  cartId: string,
  lineIds: string[],
): Promise<Cart | null> {
  const data = await shopifyFetch<{
    cartLinesRemove: { cart: CartQueryNode | null; userErrors: { message: string }[] };
  }>(CART_LINES_REMOVE_MUTATION, { cartId, lineIds }, { noStore: true });

  const result = data?.cartLinesRemove;
  if (!result || result.userErrors.length > 0 || !result.cart) {
    if (result?.userErrors.length) {
      console.error("cartLinesRemove errors", result.userErrors);
    }
    return null;
  }
  return mapCart(result.cart);
}

export async function shopifyFetchCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: CartQueryNode | null }>(
    CART_QUERY,
    { id: cartId },
    { noStore: true },
  );
  if (!data?.cart) return null;
  return mapCart(data.cart);
}

const PRODUCT_VARIANTS_BY_HANDLE_QUERY = `
  query ProductVariantsByHandle($handle: String!) {
    product(handle: $handle) {
      variants(first: 50) {
        nodes {
          id
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;

export async function fetchProductVariantsByHandle(
  handle: string,
): Promise<{ id: string; options: Record<string, string> }[]> {
  const data = await shopifyFetch<{
    product: {
      variants: {
        nodes: { id: string; selectedOptions: { name: string; value: string }[] }[];
      };
    } | null;
  }>(PRODUCT_VARIANTS_BY_HANDLE_QUERY, { handle });

  if (!data?.product) return [];

  return data.product.variants.nodes.map((node) => ({
    id: node.id,
    options: Object.fromEntries(
      node.selectedOptions.map((opt) => [opt.name, opt.value]),
    ),
  }));
}

const ADMIN_API_VERSION = "2025-01";

export const MYINLINE_ADMIN_API_SCOPES = [
  "read_customers",
  "write_orders",
  "read_orders",
  "write_order_edits",
  "read_order_edits",
  "read_payment_terms",
  "read_fulfillments",
  "write_fulfillments",
  "write_returns",
  "read_returns",
  "write_merchant_managed_fulfillment_orders",
  "read_merchant_managed_fulfillment_orders",
  "write_products",
  "read_products",
  "write_product_listings",
  "read_product_listings",
  "write_product_feeds",
  "read_product_feeds",
  "read_purchase_options",
  "read_inventory",
  "write_inventory",
  "read_locations",
  "write_locations",
  "write_inventory_shipments",
  "read_inventory_shipments",
  "write_inventory_shipments_received_items",
  "read_inventory_shipments_received_items",
  "write_inventory_transfers",
  "read_inventory_transfers",
  "read_files",
  "write_files",
  "write_metaobject_definitions",
  "read_metaobject_definitions",
  "write_metaobjects",
  "read_metaobjects",
  "write_shipping",
  "read_shipping",
  "write_delivery_customizations",
  "read_delivery_customizations",
  "write_delivery_option_generators",
  "read_delivery_option_generators",
  "write_fulfillment_constraint_rules",
  "read_fulfillment_constraint_rules",
  "read_companies",
  "write_custom_fulfillment_services",
  "read_custom_fulfillment_services",
] as const;

type ShopifyAdminGraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

function getAdminConfig() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;
  if (!domain || !token) return null;
  return { domain, token };
}

async function shopifyAdminFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T | null> {
  const config = getAdminConfig();
  if (!config) return null;

  try {
    const res = await fetch(
      `https://${config.domain}/admin/api/${ADMIN_API_VERSION}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": config.token,
        },
        body: JSON.stringify({ query, variables }),
        cache: "no-store",
      },
    );

    if (!res.ok) {
      console.error(`Shopify Admin API request failed: ${res.status}`);
      return null;
    }

    const json = (await res.json()) as ShopifyAdminGraphQLResponse<T>;
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

const LOCATIONS_QUERY = `
  query AdminLocations($first: Int!) {
    locations(first: $first) {
      nodes {
        id
        name
        isActive
        fulfillsOnlineOrders
        address {
          formatted
        }
      }
    }
  }
`;

type LocationsQueryResult = {
  locations: {
    nodes: {
      id: string;
      name: string;
      isActive: boolean;
      fulfillsOnlineOrders: boolean;
      address: { formatted: string[] };
    }[];
  };
};

export type ShopifyLocation = {
  id: string;
  name: string;
  isActive: boolean;
  fulfillsOnlineOrders: boolean;
  address: string;
};

export async function fetchLocations(): Promise<ShopifyLocation[]> {
  const data = await shopifyAdminFetch<LocationsQueryResult>(LOCATIONS_QUERY, {
    first: 50,
  });
  if (!data) return [];

  return data.locations.nodes.map((node) => ({
    id: node.id,
    name: node.name,
    isActive: node.isActive,
    fulfillsOnlineOrders: node.fulfillsOnlineOrders,
    address: node.address.formatted.join(", "),
  }));
}

const UNFULFILLED_ORDERS_QUERY = `
  query UnfulfilledOrders($first: Int!, $fulfillmentOrderQuery: String!) {
    orders(first: $first, query: "fulfillment_status:unfulfilled") {
      nodes {
        id
        name
        createdAt
        displayFulfillmentStatus
        shippingAddress {
          address1
          address2
          city
          province
          zip
          countryCodeV2
        }
        shippingLine {
          title
        }
        fulfillmentOrders(first: 5, query: $fulfillmentOrderQuery) {
          nodes {
            id
            status
            lineItems(first: 50) {
              nodes {
                id
                remainingQuantity
                lineItem {
                  sku
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`;

type UnfulfilledOrdersQueryResult = {
  orders: {
    nodes: {
      id: string;
      name: string;
      createdAt: string;
      displayFulfillmentStatus: string;
      shippingAddress: {
        address1: string | null;
        address2: string | null;
        city: string | null;
        province: string | null;
        zip: string | null;
        countryCodeV2: string | null;
      } | null;
      shippingLine: { title: string } | null;
      fulfillmentOrders: {
        nodes: {
          id: string;
          status: string;
          lineItems: {
            nodes: {
              id: string;
              remainingQuantity: number;
              lineItem: { sku: string | null; title: string };
            }[];
          };
        }[];
      };
    }[];
  };
};

export type UnfulfilledOrder = {
  orderId: string;
  name: string;
  createdAt: string;
  shippingAddress: {
    address1: string | null;
    address2: string | null;
    city: string | null;
    province: string | null;
    zip: string | null;
    countryCode: string | null;
  } | null;
  shippingService: string | null;
  fulfillmentOrders: {
    fulfillmentOrderId: string;
    status: string;
    lineItems: {
      fulfillmentOrderLineItemId: string;
      sku: string | null;
      title: string;
      quantity: number;
    }[];
  }[];
};

export async function fetchUnfulfilledOrders(
  locationId: string,
): Promise<UnfulfilledOrder[]> {
  const numericLocationId = locationId.split("/").pop();
  const data = await shopifyAdminFetch<UnfulfilledOrdersQueryResult>(
    UNFULFILLED_ORDERS_QUERY,
    {
      first: 50,
      fulfillmentOrderQuery: `assigned_location_id:${numericLocationId}`,
    },
  );
  if (!data) return [];

  return data.orders.nodes.map((order) => ({
    orderId: order.id,
    name: order.name,
    createdAt: order.createdAt,
    shippingAddress: order.shippingAddress
      ? {
          address1: order.shippingAddress.address1,
          address2: order.shippingAddress.address2,
          city: order.shippingAddress.city,
          province: order.shippingAddress.province,
          zip: order.shippingAddress.zip,
          countryCode: order.shippingAddress.countryCodeV2,
        }
      : null,
    shippingService: order.shippingLine?.title ?? null,
    fulfillmentOrders: order.fulfillmentOrders.nodes.map((fo) => ({
      fulfillmentOrderId: fo.id,
      status: fo.status,
      lineItems: fo.lineItems.nodes.map((li) => ({
        fulfillmentOrderLineItemId: li.id,
        sku: li.lineItem.sku,
        title: li.lineItem.title,
        quantity: li.remainingQuantity,
      })),
    })),
  }));
}

const FULFILLMENT_CREATE_MUTATION = `
  mutation FulfillmentCreate($fulfillment: FulfillmentInput!) {
    fulfillmentCreate(fulfillment: $fulfillment) {
      fulfillment {
        id
        status
        trackingInfo {
          number
          url
          company
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export type CreateFulfillmentInput = {
  fulfillmentOrderId: string;
  lineItems: { fulfillmentOrderLineItemId: string; quantity: number }[];
  trackingNumber?: string;
  trackingUrl?: string;
  trackingCompany?: string;
  notifyCustomer?: boolean;
};

export async function createFulfillment(
  input: CreateFulfillmentInput,
): Promise<{ id: string; status: string } | null> {
  const data = await shopifyAdminFetch<{
    fulfillmentCreate: {
      fulfillment: { id: string; status: string } | null;
      userErrors: { field: string[]; message: string }[];
    };
  }>(FULFILLMENT_CREATE_MUTATION, {
    fulfillment: {
      lineItemsByFulfillmentOrder: [
        {
          fulfillmentOrderId: input.fulfillmentOrderId,
          fulfillmentOrderLineItems: input.lineItems.map((li) => ({
            id: li.fulfillmentOrderLineItemId,
            quantity: li.quantity,
          })),
        },
      ],
      trackingInfo:
        input.trackingNumber || input.trackingUrl || input.trackingCompany
          ? {
              number: input.trackingNumber,
              url: input.trackingUrl,
              company: input.trackingCompany,
            }
          : undefined,
      notifyCustomer: input.notifyCustomer ?? true,
    },
  });

  const result = data?.fulfillmentCreate;
  if (!result || result.userErrors.length > 0 || !result.fulfillment) {
    if (result?.userErrors.length) {
      console.error("fulfillmentCreate errors", result.userErrors);
    }
    return null;
  }
  return result.fulfillment;
}

const INVENTORY_SET_QUANTITIES_MUTATION = `
  mutation InventorySetQuantities($input: InventorySetQuantitiesInput!) {
    inventorySetQuantities(input: $input) {
      inventoryAdjustmentGroup {
        createdAt
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export type InventoryQuantityUpdate = {
  inventoryItemId: string;
  locationId: string;
  quantity: number;
};

export async function setInventoryQuantities(
  updates: InventoryQuantityUpdate[],
  reason = "correction",
): Promise<boolean> {
  const data = await shopifyAdminFetch<{
    inventorySetQuantities: {
      inventoryAdjustmentGroup: { createdAt: string } | null;
      userErrors: { field: string[]; message: string }[];
    };
  }>(INVENTORY_SET_QUANTITIES_MUTATION, {
    input: {
      name: "available",
      reason,
      ignoreCompareQuantity: true,
      quantities: updates.map((update) => ({
        inventoryItemId: update.inventoryItemId,
        locationId: update.locationId,
        quantity: update.quantity,
      })),
    },
  });

  const result = data?.inventorySetQuantities;
  if (!result || result.userErrors.length > 0) {
    if (result?.userErrors.length) {
      console.error("inventorySetQuantities errors", result.userErrors);
    }
    return false;
  }
  return true;
}

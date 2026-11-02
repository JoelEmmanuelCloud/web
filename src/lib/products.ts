import {
  fetchShopifyProducts,
  type ShopifyProductSummary,
} from "@/lib/shopify";

export type Product = {
  slug: string;
  collection: "chocolate-art" | "truffles";
  name: string;
  price: number;
  hook: string;
  weight?: string;
  description: string[];
  flavours?: { name: string; description: string }[];
  ingredients: string;
  allergens: string;
  dietary: string[];
  image: string;
  gallery: string[];
  cardImage?: string;
  photosFit?: "contain";
  storyLink?: { label: string; href: string };
  status?: "coming-soon" | "hidden";
  availableForSale: boolean;
  variantId: string | null;
};

const BESPOKE_HANDLE = "bespoke-chocolate-box";

const STORY_LINKS: Record<string, Product["storyLink"]> = {
  "windrush-truffle-box": { label: "Full Story", href: "/windrush" },
};

const HTML_ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&nbsp;": " ",
};

function htmlToParagraphs(html: string) {
  return html
    .split(/<\/(?:p|div|h[1-6]|li)>|<br\s*\/?>/i)
    .map((block) =>
      block
        .replace(/<[^>]*>/g, "")
        .replace(/&[a-z#0-9]+;/gi, (entity) => HTML_ENTITIES[entity] ?? entity)
        .trim(),
    )
    .filter(Boolean);
}

function parseFlavours(value?: string) {
  if (!value) return undefined;
  const flavours = value.split(/\r?\n/).flatMap((line) => {
    const separator = line.indexOf(":");
    if (separator < 1) return [];
    return [
      {
        name: line.slice(0, separator).trim(),
        description: line.slice(separator + 1).trim(),
      },
    ];
  });
  return flavours.length > 0 ? flavours : undefined;
}

function parseList(value?: string) {
  if (!value) return [];
  try {
    const list: unknown = JSON.parse(value);
    return Array.isArray(list) ? list.map(String) : [];
  } catch {
    return [];
  }
}

function parseStatus(value?: string): Product["status"] {
  if (value === "Coming soon") return "coming-soon";
  if (value === "Hidden") return "hidden";
  return undefined;
}

function toProduct(live: ShopifyProductSummary): Product {
  const { fields } = live;
  const [cardImage, ...photos] = live.images;
  const gallery = photos.length > 0 ? photos : live.images;

  return {
    slug: live.handle,
    collection:
      fields.shop_section === "Chocolate Art Collection"
        ? "chocolate-art"
        : "truffles",
    name: fields.website_name || live.title,
    price: live.price,
    hook: fields.tagline ?? "",
    weight: fields.weight,
    description: htmlToParagraphs(live.descriptionHtml),
    flavours: parseFlavours(fields.flavours),
    ingredients: fields.ingredients ?? "",
    allergens: fields.allergens ?? "",
    dietary: parseList(fields.dietary_notes),
    image: gallery[0],
    gallery,
    cardImage,
    photosFit: fields.photo_display === "Fill" ? undefined : "contain",
    storyLink: STORY_LINKS[live.handle],
    status: parseStatus(fields.website_status),
    availableForSale: live.availableForSale,
    variantId: live.variantId,
  };
}

export async function getProducts(): Promise<Product[]> {
  const shopifyProducts = await fetchShopifyProducts();
  return [...shopifyProducts.values()]
    .filter((live) => live.handle !== BESPOKE_HANDLE && live.images.length > 0)
    .map(toProduct);
}

export async function getShopProducts() {
  const products = await getProducts();
  return products.filter((p) => p.status !== "hidden");
}

export async function getPurchasableProducts() {
  const products = await getProducts();
  return products.filter((p) => !p.status);
}

export async function getProductBySlug(slug: string) {
  const products = await getPurchasableProducts();
  return products.find((p) => p.slug === slug);
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(price);
}

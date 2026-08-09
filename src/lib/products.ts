import { fetchShopifyProducts } from "@/lib/shopify";

export type ProductContent = {
  slug: string;
  shopifyHandle?: string;
  collection: "chocolate-art" | "truffles";
  name: string;
  price: number;
  hook: string;
  serving?: string;
  description: string[];
  flavours?: { name: string; description: string }[];
  ingredients: string;
  allergens: string;
  dietary: string[];
  image: string;
  gallery: string[];
};

export type Product = ProductContent & {
  availableForSale: boolean;
};

export const productContent: ProductContent[] = [
  {
    slug: "art-range-one-box-of-12",
    collection: "chocolate-art",
    name: "Art Range One — Box of 12",
    price: 23.45,
    hook: "Experience the magic of indulgence, our multi-award winning range.",
    description: [
      "Discover the exquisite delight of our award-winning Art Selection Chocolates. With a harmonious blend of artistry and flavour, our chocolates are carefully hand-crafted to offer you an unparalleled indulgence experience.",
      "Each handcrafted piece is a testament to our commitment to using only the finest ingredients, allowing their natural flavours to shine through — and to our belief that chocolates should be a feast for both the eyes and the palate.",
    ],
    flavours: [
      {
        name: "Vanilla Pod",
        description:
          "Natural vanilla pods from two distinct origins, blended into a harmonious, complete ganache.",
      },
      {
        name: "Raspberry",
        description:
          "Genuine raspberry purée, no artificial flavourings — light on the palate, bursting with flavour.",
      },
      {
        name: "Salted Caramel",
        description:
          "Perfectly caramelised sugar balanced with just enough salt, blended with milk and dark chocolate.",
      },
      {
        name: "Passion Fruit",
        description:
          "Real passion fruit purée, no compounds — tangy, smooth, and perfectly balanced.",
      },
    ],
    ingredients:
      "Passion Fruit Purée, Raspberry Purée, MILK Chocolate, Dark Chocolate, WHITE Chocolate, Caramelised Sugar, UHT Cream, Butter, Glucose, Inverted Sugar, Vanilla Pods, Mixed Spice, Lemon, Salt, Pepper. Dark: min 65–70% cocoa solids · Milk: min 35% · White: min 28%.",
    allergens:
      "Contains SOYA & MILK. May contain traces of GLUTEN & NUT. Produced on premises handling WHEAT.",
    dietary: ["Suitable for vegetarians", "Nut free"],
    image: "/images/shopify-cdn/pwgartrangeone121.jpg",
    gallery: [
      "/images/shopify-cdn/pwgartrangeone121.jpg",
      "/images/shopify-cdn/ArtRangeone_2.jpg",
      "/images/shopify-cdn/Rangeone_O.I.2.jpg",
    ],
  },
  {
    slug: "art-range-one-box-of-24",
    collection: "chocolate-art",
    name: "Art Range One — Box of 24",
    price: 42.45,
    hook: "The full expression of our Box of 12, twice over.",
    description: [
      "The same four multi-award winning flavours as our Box of 12 — Vanilla Pod, Raspberry, Salted Caramel, and Passion Fruit — in a larger format built for sharing, gifting, or simply indulging further.",
    ],
    ingredients:
      "Passion Fruit Purée, Raspberry Purée, MILK Chocolate, Dark Chocolate, WHITE Chocolate, Caramelised Sugar, UHT Cream, Butter, Glucose, Inverted Sugar, Vanilla Pods, Mixed Spice, Lemon, Salt, Pepper. Dark: min 65–70% cocoa solids · Milk: min 35% · White: min 28%.",
    allergens:
      "Contains SOYA & MILK. May contain traces of GLUTEN & NUT. Produced on premises handling WHEAT.",
    dietary: ["Suitable for vegetarians", "Nut free"],
    image: "/images/shopify-cdn/pwgartrangeone246.jpg",
    gallery: [
      "/images/shopify-cdn/12chocos_B.jpg",
      "/images/shopify-cdn/ArtRangeOne24.02.jpg",
    ],
  },
  {
    slug: "art-range-two-box-of-12",
    collection: "chocolate-art",
    name: "Art Range Two — Box of 12",
    price: 23.45,
    hook: "Inspired by our multi-award winning Range One.",
    description: [
      "A collection of exquisite chocolates that embodies our philosophy of indulgence — four unique flavours taking you on a memorable flavour journey, each one decorated to be as visually striking as it is delicious.",
      "For the Ecuador flavour, we use cocoa beans grown exclusively in one country, for a truly single-origin chocolate experience.",
    ],
    flavours: [
      {
        name: "Cherry",
        description:
          "Real cherry purée and a touch of sugar for natural sweetness, balanced with subtle acidity.",
      },
      {
        name: "Blackcurrant",
        description:
          "Real blackcurrant purée, no artificial flavourings — tart, vibrant, and true to the fruit.",
      },
      {
        name: "Lemon",
        description:
          "Fresh lemon purée as the base — one of the range's signature chocolates.",
      },
      {
        name: "Ecuador",
        description:
          "Single-origin cocoa from Ecuador — smooth, decadent, and full-bodied.",
      },
    ],
    ingredients:
      "Blackcurrant Purée, Cherry Purée, Lemon, MILK Chocolate, Dark Chocolate, WHITE Chocolate, Caramelised Sugar, UHT Cream, Butter, Glucose, Inverted Sugar, Vanilla Pods, Mixed Spice, Lemon, Salt, Pepper. Dark: min 65–70% · Milk: min 35% · White: min 28%.",
    allergens:
      "Contains SOYA & MILK. May contain traces of GLUTEN & NUT. Produced on premises handling WHEAT.",
    dietary: ["Suitable for vegetarians", "Nut free"],
    image: "/images/shopify-cdn/pwgartrangetwo121.jpg",
    gallery: [
      "/images/shopify-cdn/ArtRange2.D0.02.jpg",
      "/images/shopify-cdn/ArtRangeTwo12.05.jpg",
    ],
  },
  {
    slug: "art-range-two-box-of-24",
    collection: "chocolate-art",
    name: "Art Range Two — Box of 24",
    price: 42.45,
    hook: "The full expression of Range Two, twice over.",
    description: [
      "The same four flavours as our Box of 12 — Cherry, Blackcurrant, Lemon, and single-origin Ecuador — in a larger format built for sharing, gifting, or simply indulging further.",
    ],
    ingredients:
      "Blackcurrant Purée, Cherry Purée, Lemon, MILK Chocolate, Dark Chocolate, WHITE Chocolate, Caramelised Sugar, UHT Cream, Butter, Glucose, Inverted Sugar, Vanilla Pods, Mixed Spice, Lemon, Salt, Pepper. Dark: min 65–70% · Milk: min 35% · White: min 28%.",
    allergens:
      "Contains SOYA & MILK. May contain traces of GLUTEN & NUT. Produced on premises handling WHEAT.",
    dietary: ["Suitable for vegetarians", "Nut free"],
    image: "/images/shopify-cdn/ArtRangeTwo24.04.jpg",
    gallery: [
      "/images/shopify-cdn/pwgartrangetwo122.jpg",
      "/images/shopify-cdn/ArtRangeTwo24..02.jpg",
    ],
  },
  {
    slug: "champagne-cocktail-truffles",
    collection: "truffles",
    name: "Champagne Cocktail Truffles",
    price: 13.95,
    hook: "Perfect for the unforgettable moments.",
    serving: "110g",
    description: [
      "Indulge in the exquisite allure of our Champagne Cocktail Truffles, tailor-made for cherished occasions that deserve a touch of elegance. We use authentic champagne as the cornerstone of the recipe, with added lemon, a touch of rum, mixed spices, and vanilla pod.",
      "No artificial flavourings or compounds — 100% natural ingredients, balanced with the finest chocolate to sustain the flavour through every bite.",
    ],
    ingredients:
      "Real Champagne, Caramelised Sugar, UHT Cream, Butter, Glucose, Inverted Sugar, Lemon, Rum, Vanilla Pods, Mixed Spice, Salt, Pepper. Dark: 65% cocoa solids · White: min 28%.",
    allergens:
      "Contains SOYA & MILK. May contain traces of GLUTEN & NUT. Produced on premises handling WHEAT.",
    dietary: ["Suitable for vegetarians", "Nut free"],
    image: "/images/shopify-cdn/pwgchampagnetruffles.jpg",
    gallery: [
      "/images/shopify-cdn/ChampagneTruffles.02.jpg",
      "/images/shopify-cdn/0009.jpg",
    ],
  },
  {
    slug: "gingerbread-truffles",
    collection: "truffles",
    name: "Gingerbread Truffles",
    price: 12.45,
    hook: "Made with authentic ginger cake.",
    serving: "110g",
    description: [
      "True to our core philosophy, we use genuine gingerbread cake to achieve a rich, robust flavour. A velvety ganache centre, infused with subtle spices, elevates the taste while keeping a luxuriously smooth texture.",
    ],
    ingredients:
      "(60%) Ginger Cake (Wheat Flour, Water, Sugar, Vegetable Oils, Dried Whey Milk Protein, Dried Whole Eggs, Ginger Flavouring), Caramelised Sugar, UHT Cream, Glucose, Inverted Sugar, Vanilla Pods, Ginger, Mixed Spice, Lemon, Dark Chocolate, Milk Chocolate. Dark: min 65% · Milk: min 35% cocoa / 21% milk solids.",
    allergens:
      "Contains SOYA & MILK. May contain traces of GLUTEN & NUT. Produced on premises handling WHEAT.",
    dietary: ["Suitable for vegetarians", "Nut free"],
    image: "/images/shopify-cdn/pwgtrufflesgingerbread1.jpg",
    gallery: ["/images/shopify-cdn/GingerbreadTruffles_3.jpg"],
  },
  {
    slug: "matugga-rum-truffles",
    shopifyHandle: "dark-rum-truffles",
    collection: "truffles",
    name: "Matugga Rum Truffles",
    price: 13.95,
    hook: "Limited stock.",
    serving: "110g",
    description: [
      "Crafted using authentic, high-quality Matugga Spiced Rum, with no artificial flavourings — the distinct essence of the rum interwoven with a carefully selected chocolate medley, plus a subtle infusion of spices.",
    ],
    ingredients:
      "Dark Rum, UHT Cream, Butter, Milk Chocolate, Dark Chocolate, Glucose, Inverted Sugar, Mixed Spice, Vanilla Pods, Salt, Lemon Juice. Dark: 65% · Milk: min 35% · White: min 28%.",
    allergens:
      "Contains SOYA & MILK. May contain traces of GLUTEN & NUT. Produced on premises handling WHEAT.",
    dietary: ["Suitable for vegetarians", "Nut free"],
    image: "/images/shopify-cdn/pwgtrufflesmatugga2.jpg",
    gallery: [
      "/images/shopify-cdn/IMG_6136.16.jpg",
      "/images/shopify-cdn/DarRumTruffles.25.jpg",
    ],
  },
  {
    slug: "mixed-spice-truffles",
    collection: "truffles",
    name: "Mixed Spice Truffles",
    price: 12.95,
    hook: "A uniting infusion of flavours — our first non-dairy truffle.",
    serving: "110g",
    description: [
      "The same decadent vision, delivered dairy-free. Cinnamon through star anise, blended and infused into a velvety ganache, carried by bittersweet chocolate.",
      "Our first entry in the non-dairy selection — can you really taste the difference?",
    ],
    ingredients:
      "Mixed Spices (Cinnamon, Nutmeg, Star Anise, Ginger, Cumin, Clove, Coriander, Allspice), Dark Chocolate, Oat Milk, Rice Milk, Plant-Based Butter, Glucose, Inverted Sugar, Salt, Lemon Juice. Dark: 65% · Oat Milk Chocolate: min 42%.",
    allergens:
      "Contains SOYA & MILK. May contain traces of GLUTEN & NUT. Produced on premises handling WHEAT.",
    dietary: ["Suitable for non-dairy diets", "Suitable for vegetarians", "Nut free"],
    image: "/images/shopify-cdn/pwgtrufflesmixedspice1.jpg",
    gallery: [
      "/images/shopify-cdn/spice1aa.jpg",
      "/images/shopify-cdn/spice3.jpg",
      "/images/shopify-cdn/spice25.jpg",
      "/images/shopify-cdn/SpiceBlack.jpg",
    ],
  },
  {
    slug: "passion-fruit-truffles",
    collection: "truffles",
    name: "Passion Fruit Truffles",
    price: 12.95,
    hook: "One of our delightfully fruity indulgences.",
    serving: "110g",
    description: [
      "Our Passion Fruit Bonbon was the first chocolate in the collection to win an award — reworked here as a truffle. Real passion fruit purée only, no flavourings or compounds.",
      "A smooth, decadent texture with an intense, tangy taste, delicately coated in a unique blend of cocoa and chocolate.",
    ],
    ingredients:
      "Passion Fruit Purée, Dark Chocolate, Milk Chocolate, White Chocolate, UHT Cream, Butter, Glucose, Inverted Sugar, Salt, Lemon Juice. Dark: 65% · Milk: min 35% · White: min 28%.",
    allergens:
      "Contains SOYA & MILK. May contain traces of GLUTEN & NUT. Produced on premises handling WHEAT.",
    dietary: ["Suitable for vegetarians", "Nut free"],
    image: "/images/shopify-cdn/PassionwTruffles.A.1.jpg",
    gallery: ["/images/shopify-cdn/pwgtrufflespassionfruit2.jpg"],
  },
  {
    slug: "salted-caramel-truffles",
    collection: "truffles",
    name: "Salted Caramel Truffles",
    price: 12.95,
    hook: "A sensational flavour experience.",
    serving: "110g",
    description: [
      "Our contemporary take on a beloved classic. A luscious, velvety caramel base is precisely salted for the perfect savoury/sweet balance, finished with a blend of hand-picked chocolates for deep caramel undertones.",
    ],
    ingredients:
      "Caramelised Sugar, Milk Chocolate, Dark Chocolate, UHT Cream, Butter, Glucose, Inverted Sugar, Salt, Lemon Juice. Milk: min 35% · Dark: min 65%.",
    allergens:
      "Contains SOYA & MILK. May contain traces of GLUTEN & NUT. Produced on premises handling WHEAT.",
    dietary: ["Suitable for vegetarians", "Nut free"],
    image: "/images/shopify-cdn/pwgtrufflessaltedcaramel1.jpg",
    gallery: ["/images/shopify-cdn/0020_8a6e79ab-ff9f-438d-8c25-63a6401c94b8.jpg"],
  },
];

export async function getProducts(): Promise<Product[]> {
  const shopifyProducts = await fetchShopifyProducts();

  return productContent.map((content) => {
    const live = shopifyProducts.get(content.shopifyHandle ?? content.slug);
    if (!live) {
      return { ...content, availableForSale: true };
    }

    return {
      ...content,
      price: live.price,
      image: live.images[0] ?? content.image,
      gallery: live.images.length > 0 ? live.images : content.gallery,
      availableForSale: live.availableForSale,
    };
  });
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(price);
}

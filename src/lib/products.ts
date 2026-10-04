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
  cardImage?: string;
  photos?: string[];
  storyLink?: { label: string; href: string };
  status?: "coming-soon" | "hidden";
};

export type Product = ProductContent & {
  availableForSale: boolean;
  variantId: string | null;
};

export const productContent: ProductContent[] = [
  {
    slug: "art-range-one-box-of-12",
    collection: "chocolate-art",
    name: "Art Range One — Box of 12",
    price: 22.95,
    hook: "Four exceptional flavours. One unforgettable chocolate experience.",
    description: [
      "Discover the award-winning Art Selection, a celebration of fine ingredients, craftsmanship and flavour.",
      "Each chocolate is handcrafted in small batches, using carefully selected ingredients and real fruit, spices and natural flavours. Nothing is added simply for effect. Every element is chosen to create balance, depth and a memorable taste.",
      "From the delicate fragrance of natural Vanilla to the vibrant freshness of Passion Fruit, each chocolate offers something different.",
      "Take your time and savour each one and discover your favourite.",
    ],
    flavours: [
      {
        name: "Vanilla Pod",
        description:
          "A beautifully delicate yet surprisingly full-bodied Vanilla chocolate. We blend natural Vanilla Pods from two distinct origins to create a rich and harmonious full body ganache. Soft, creamy vanilla comes first, followed by subtle light caramel notes that linger gently on the palate. Elegant. Smooth. Naturally indulgent.",
      },
      {
        name: "Raspberry",
        description:
          "The taste of real Raspberries, captured in chocolate. Made with genuine Raspberry purée and no artificial flavourings or compounds, this is a bright, fresh chocolate with a beautifully light character. The Raspberry's natural acidity is carefully balanced with the correct amount of chocolate cocoa to allow its vibrant flavour to travel across the palate. Fresh. Fruity. Vibrant.",
      },
      {
        name: "Salted Caramel",
        description:
          "A classic combination, elevated through careful craftsmanship. Sugar is slowly caramelised to create a deep, rich caramel before being delicately balanced with sea salt. Milk and dark chocolate are then blended into the ganache to create layers of sweetness, richness and depth. The result is a beautifully balanced caramel that begins with sweetness and finishes with a gentle touch of sea salt. Rich. Smooth. Moreish.",
      },
      {
        name: "Passion Fruit",
        description:
          "The chocolate that started it all. Our signature Passion Fruit chocolate combines real Passion Fruit purée with carefully selected chocolate to create a beautifully balanced ganache. No artificial flavourings or compounds — just the naturally vibrant character of the fruit. Light, smooth and naturally tangy, it delivers a burst of passion fruit followed by the richness of fine chocolate. This was our first award-winning chocolate and helped establish the flavour philosophy behind the Art Chocolate Collection. Vibrant. Elegant. Unforgettable.",
      },
    ],
    ingredients:
      "Passion Fruit Purée, Raspberry Purée, MILK Chocolate, Dark Chocolate, White Chocolate, Caramelised Sugar, UHT Cream, Butter, Glucose, Inverted Sugar, Sugar, Vanilla Pods, Mixed Spice (Ginger, Vanilla, Nutmeg, Cinnamon, Clove, Pimenta), Lemon, Sea Salt. Dark: min 65 & 70% cocoa solids · Milk: min 36% · White: min 28%.",
    allergens:
      "Contains SOYA & MILK. May contain traces of GLUTEN & NUTS. Produced on premises handling WHEAT.",
    dietary: ["Suitable for vegetarians"],
    image: "/images/shop/art-range-one-12/art-range-one-12-lifestyle.webp",
    gallery: [],
    cardImage: "/images/shop/art-range-one-12/art-range-one-12-white.webp",
    photos: [
      "/images/shop/art-range-one-12/art-range-one-12-lifestyle.webp",
      "/images/shop/art-range-one-12/art-range-one-12-table.webp",
      "/images/shop/art-range-one-12/art-range-one-12-box-open.webp",
      "/images/shop/art-range-one-12/art-range-one-12-close-up.webp",
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
    price: 22.95,
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
    name: "Real Champagne Truffles",
    price: 14.95,
    hook: "A celebration in chocolate.",
    serving: "110g",
    description: [
      "Indulge in the elegance of our Real Champagne Cocktail Truffles — created for moments worth celebrating and crafted for those who appreciate something elegant and a little different.",
      "At the heart of this recipe is Real Champagne, carefully blended with fresh lemon, a touch of rum and warming mixed spices. Each ingredient has been thoughtfully balanced with fine chocolate to create a smooth, sophisticated ganache that allows the Champagne Cocktail notes to unfold with every bite.",
      "There are no artificial flavourings or compounds. Just carefully selected ingredients, expert craftsmanship and a beautifully balanced chocolate experience.",
      "Elegant. Sophisticated. Made to celebrate.",
      "This is more than a Champagne Chocolate. This is a cocktail, transformed into chocolate.",
    ],
    ingredients:
      "Real Champagne, Caramelised Sugar, UHT Cream, Butter, Glucose, Inverted Sugar, Lemon, Rum, Vanilla Pods, Mixed Spice (Ginger, Vanilla, Nutmeg, Cinnamon, Clove, Pimenta), Salt. Dark: min 65% cocoa solids · White: min 28%.",
    allergens:
      "Contains SOYA & MILK. May contain traces of GLUTEN & NUTS. Produced on premises handling WHEAT.",
    dietary: ["Suitable for vegetarians"],
    image: "/images/shop/champagne/champagne-lifestyle-marble.webp",
    gallery: [],
    cardImage: "/images/shop/champagne/champagne-white.webp",
    photos: [
      "/images/shop/champagne/champagne-lifestyle-marble.webp",
      "/images/shop/champagne/champagne-french-table.webp",
      "/images/shop/champagne/champagne-window-view.webp",
      "/images/shop/champagne/champagne-tasting.webp",
    ],
  },
  {
    slug: "matugga-rum-truffles",
    shopifyHandle: "dark-rum-truffles",
    collection: "truffles",
    name: "Real Dark Rum Truffles",
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
    price: 13.95,
    hook: "A contemporary, Award-Winning take on a beloved classic.",
    serving: "110g",
    description: [
      "Our Salted Caramel Truffle begins with a luscious, velvety caramel, carefully crafted to bring out its deep, natural flavour. We balance the caramel with a blend of milk and dark chocolate, adding richness and depth while allowing the caramel to remain the star.",
      "A delicate touch of Sea Salt follows as a back note, bringing out the sweetness of the caramel rather than overpowering it. The result is a beautifully balanced combination of sweet, savoury and rich chocolate flavours that develops with every bite.",
      "Rich. Smooth. Perfectly balanced. Irresistibly indulgent.",
      "Expect deep caramel richness, creamy chocolate and a gentle touch of Sea Salt. The caramel leads, the chocolate adds depth, and the salt quietly brings everything together.",
      "One bite, and the balance becomes the experience.",
    ],
    ingredients:
      "Caramelised Sugar, Milk Chocolate, Dark Chocolate, UHT Cream, Butter, Glucose, Inverted Sugar, Salt. Milk: min 36% cocoa solids · Dark: min 65%.",
    allergens:
      "Contains SOYA & MILK. May contain traces of GLUTEN & NUT. Produced on premises handling WHEAT.",
    dietary: ["Suitable for vegetarians"],
    image: "/images/shop/salted-caramel/salted-caramel-lifestyle-drawing-room.webp",
    gallery: [],
    cardImage: "/images/shop/salted-caramel/salted-caramel-white.webp",
    photos: [
      "/images/shop/salted-caramel/salted-caramel-lifestyle-drawing-room.webp",
      "/images/shop/salted-caramel/salted-caramel-lifestyle-mirror.webp",
      "/images/shop/salted-caramel/salted-caramel-lifestyle-marble.webp",
      "/images/shop/salted-caramel/salted-caramel-collection-banner.webp",
      "/images/shop/salted-caramel/salted-caramel-white-wide.webp",
      "/images/shop/salted-caramel/salted-caramel-lifestyle-dining.webp",
    ],
  },
  {
    slug: "windrush-truffle-box",
    collection: "truffles",
    name: "Windrush Truffle Box",
    price: 10.95,
    hook: "A flavour collection for memories.",
    description: [
      "Some stories deserve to be remembered. The Windrush Collection has been created to honour one of the most significant journeys in modern British history, celebrating the courage, resilience and determination of the men and women who travelled from the Caribbean to Britain, bringing with them their skills, ambition and a rich culture that has helped shape modern Britain.",
      "Six handcrafted truffles, six distinctive flavours.",
    ],
    flavours: [
      {
        name: "Coconut",
        description:
          "A taste of the tropics, beautifully reimagined. Silky white chocolate meets delicate coconut in a luxuriously smooth truffle, bringing the warmth and sweetness of the Caribbean together with refined artisan chocolate craftsmanship. One bite. One memory. Pure indulgence.",
      },
      {
        name: "Passion Fruit",
        description:
          "Bright, vibrant and impossible to resist. A luscious passion fruit centre wrapped in fine rich chocolate, balancing the exotic Caribbean fruit with a sophisticated touch of elegance. Sweet, sharp and wonderfully refreshing is well balanced. A little taste of sunshine in every bite.",
      },
      {
        name: "Fruit Cake",
        description:
          "The taste of home, with a Caribbean soul. Rich soaked fruit, warming spices makes the base of the traditional Fruit cake, then brought together with decadent chocolate. Inspired by the flavours of home, familiar, comforting and beautifully indulgent. A lifetime memory, reimagined in chocolate.",
      },
      {
        name: "Blue Mountain Coffee",
        description:
          "Bold Caribbean character mixed with chocolate luxury. Exceptional Blue Mountain coffee brings its deep roasted notes and subtle richness to this velvety textured chocolate truffle. Creates an elegant balance of intensity, creaminess and chocolate finish. Smooth. Sophisticated. Unforgettable.",
      },
      {
        name: "Dark Caribbean Rum",
        description:
          "Deep, warming and irresistibly grown-up. Rich dark chocolate meets the warmth and depth of flavour of real Caribbean rum, creating a beautifully balanced truffle with lingering notes of spice, oak and sweetness to savour. Slow down. Savour the moment.",
      },
      {
        name: "Sorrel & A Touch Of Mixed Spice",
        description:
          "A Caribbean classic with a luxurious chocolate twist. Fragrant sorrel and warming island spices unfold through rich chocolate, creating a beautifully aromatic truffle that is vibrant, sophisticated and wonderfully nostalgic. Exotic, warming and utterly moreish.",
      },
    ],
    ingredients:
      "Passion Fruit Purée, Coconut Purée, Blue Mountain Coffee, Dark Rum, Sorrel, Mixed Fruit (Sultanas, Raisins, Currants, Prunes, Mixed Peel), Mixed Spice (Ginger, Vanilla, Nutmeg, Cinnamon, Clove, Pimenta), Caramelised Sugar, UHT Cream, Butter, Glucose, Inverted Sugar, Lemon, FLOUR, Sea Salt, Dark Chocolate, Milk Chocolate, White Chocolate, Cocoa Butter. Dark: min 65 & 70% cocoa solids · White: min 28%.",
    allergens:
      "Allergen information for this box is being confirmed. If you have an allergy or dietary requirement, please contact us before ordering.",
    dietary: ["Suitable for vegetarians"],
    image: "/images/windrush/shop/windrush-table-setting.webp",
    gallery: [],
    cardImage: "/images/windrush/shop/windrush-box-white.webp",
    photos: [
      "/images/windrush/shop/windrush-table-setting.webp",
      "/images/windrush/shop/windrush-lifestyle-02.webp",
      "/images/windrush/shop/windrush-collection-hero.webp",
      "/images/windrush/shop/windrush-flavours-box.webp",
      "/images/windrush/shop/windrush-truffles-white.webp",
    ],
    storyLink: { label: "Full Story", href: "/windrush" },
  },
];

export async function getProducts(): Promise<Product[]> {
  const shopifyProducts = await fetchShopifyProducts();

  return productContent.map((content) => {
    const live = shopifyProducts.get(content.shopifyHandle ?? content.slug);
    if (!live) {
      return { ...content, availableForSale: true, variantId: null };
    }

    const images = content.photos ?? live.images;

    return {
      ...content,
      price: live.price,
      image: images[0] ?? content.image,
      gallery: images.length > 0 ? images : content.gallery,
      availableForSale: live.availableForSale,
      variantId: live.variantId,
    };
  });
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

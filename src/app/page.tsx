import { HeroCarousel, type HeroChapter } from "@/components/hero-carousel";
import { StoryGrid, type StoryCard } from "@/components/story-grid";

const chapters: HeroChapter[] = [
  {
    id: "cold-open",
    image: "/images/shopify-cdn/pwgartrangeone121_large.jpg",
    video: { src: "/video/hero-ad-cut.mp4", loop: false },
  },
  {
    id: "opening-pour",
    heading: "Indulgence Is Everything",
    subheading: "Multi-award winning chocolatier Paul Wayne Gregory",
    cta: { label: "Shop Now", href: "/shop" },
    image: "/images/shopify-cdn/pwg-test-images03.jpg",
    video: { src: "/video/opening-pour.mp4" },
  },
  {
    id: "makers-hands",
    eyebrow: "The Philosophy",
    heading: "We Are Masters Of This Craft",
    subheading: "Every piece, hand finished",
    cta: { label: "Our Philosophy", href: "/philosophy" },
    image: "/images/shopify-cdn/pwg_paul_piping_01.jpg",
    video: { src: "/video/makers-hands.mp4" },
  },
  {
    id: "collection",
    eyebrow: "The Collection",
    heading: "Art Range",
    subheading: "Hand-decorated, multi-award winning",
    cta: { label: "Discover Now", href: "/shop" },
    image: "/images/shopify-cdn/pwgartrangeone121_large.jpg",
    video: { src: "/video/collection.mp4" },
  },
];

const storyCards: StoryCard[] = [
  {
    href: "/shop",
    image: "/images/shopify-cdn/pwgtrufflesmatugga2_large.jpg",
    title: "Shop The Collection",
    description:
      "Hand-crafted chocolates and truffles, built around one philosophy: indulgence is everything.",
  },
  {
    href: "/bespoke-box",
    image: "/images/shopify-cdn/12chocos_B.jpg",
    title: "Bespoke Box",
    description:
      "Design your own luxury truffle box — your box, your flavours, your name on the lid.",
  },
  {
    href: "/gallery",
    image: "/images/shopify-cdn/PWG_CHOCOLAT_2018_coverimage_27d762b0-dcd9-4a86-b1a4-703e603d7c96.png",
    title: "The Gallery",
    description:
      "Showpieces, competition work, and the craft behind the collection.",
  },
];

export default function Home() {
  return (
    <>
      <HeroCarousel chapters={chapters} />

      <section className="bg-ink-raised px-6 py-24 text-center sm:px-10">
        <div className="mx-auto flex max-w-2xl flex-col gap-6">
          <p className="text-base leading-8 text-paper-dim sm:text-lg">
            Multi-award winning chocolatier Paul Wayne Gregory has one main
            desire&hellip; to show the world that
          </p>
          <p className="tracked-display text-lg text-accent sm:text-xl">
            &ldquo;Indulgence Is Everything&rdquo;
          </p>
          <p className="text-base leading-8 text-paper-dim sm:text-lg">
            Indulge yourself&hellip;
          </p>
        </div>
      </section>

      <StoryGrid
        eyebrow="Choose Your Indulgence"
        heading="Explore Further"
        cards={storyCards}
      />
    </>
  );
}

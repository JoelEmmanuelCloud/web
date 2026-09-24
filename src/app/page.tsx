import { HeroCarousel, type HeroChapter } from "@/components/hero-carousel";
import { StoryGrid, type StoryCard } from "@/components/story-grid";

const chapters: HeroChapter[] = [
  {
    id: "cold-open",
    image: "/images/shopify-cdn/pwgartrangeone121.jpg",
    video: { src: "/video/hero-ad-cut.mp4", loop: false },
  },
  {
    id: "opening-pour",
    heading: "Indulgence\nIs Everything",
    subheading: "Multi-award winning chocolatier Paul Wayne Gregory",
    cta: { label: "Shop Now", href: "/shop" },
    image: "/images/shopify-cdn/pwg-test-images03.jpg",
    video: { src: "/video/opening-pour.mp4", loop: false },
  },
  {
    id: "makers-hands",
    eyebrow: "The Philosophy",
    heading: "We Are Masters Of This Craft",
    subheading: "Every piece, hand finished",
    cta: { label: "Our Philosophy", href: "/philosophy" },
    image: "/images/shopify-cdn/pwg_paul_piping_01.jpg",
    video: { src: "/video/makers-hands.mp4", loop: false },
  },
  {
    id: "collection",
    eyebrow: "The Collection",
    heading: "Art Range",
    subheading: "Hand-decorated, multi-award winning",
    cta: { label: "Discover Now", href: "/shop" },
    image: "/images/shopify-cdn/pwgartrangeone121.jpg",
    video: { src: "/video/collection.mp4", loop: false },
  },
];

const storyCards: StoryCard[] = [
  {
    href: "/shop",
    image: "/images/shopify-cdn/pwgtrufflesmatugga2.jpg",
    title: "The Shop Collection",
    description:
      "Hand-crafted chocolates and truffles, built around one philosophy: indulgence\u00a0is\u00a0everything.",
  },
  {
    href: "/windrush",
    image: "/images/windrush/windrush-07-box-cover-final.webp",
    title: "The Windrush Collection",
    description:
      "A truffle collection in celebration of legacy, courage and new beginnings.",
  },
  {
    href: "/bespoke-box",
    image: "/images/shopify-cdn/12chocos_B.jpg",
    title: "Bespoke Box",
    description:
      "Design your own luxury chocolate box, from chocolate flavours to your name or logo on top of the box.",
  },
  {
    href: "/gallery",
    image: "/images/shopify-cdn/PWG_CHOCOLAT_2018_coverimage_27d762b0-dcd9-4a86-b1a4-703e603d7c96.jpg",
    title: "The Gallery",
    description:
      "Showpieces, commission works, the craft behind the collections.",
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
            desire.
            <br />
            To show the world that
          </p>
          <p className="tracked-display text-lg text-accent sm:text-xl">
            &ldquo;Indulgence
            <br />
            Is Everything&rdquo;
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

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";

export type StoryCard = {
  href: string;
  image: string;
  title: string;
  description: string;
};

export function StoryGrid({
  eyebrow,
  heading,
  cards,
}: {
  eyebrow: string;
  heading: string;
  cards: StoryCard[];
}) {
  return (
    <section className="bg-ink px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-center gap-3 text-center">
          <h2 className="tracked-display text-xl text-paper sm:text-2xl">
            {eyebrow}
          </h2>
          <p className="tracked-label text-xs text-paper-dim">{heading}</p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2">
          {cards.map((card) => (
            <Reveal key={card.title}>
              <Link href={card.href} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-5 border-l border-line pl-5">
                  <h3 className="tracked-label text-xs text-paper">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm text-paper-dim">
                    {card.description}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

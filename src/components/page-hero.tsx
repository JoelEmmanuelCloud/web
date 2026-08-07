import Image from "next/image";
import Link from "next/link";

export type PageHeroProps = {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  cta?: { label: string; href: string };
  image: string;
  video?: { src: string; poster?: string };
};

export function PageHero({
  eyebrow,
  heading,
  subheading,
  cta,
  image,
  video,
}: PageHeroProps) {
  return (
    <section className="relative flex h-[85dvh] min-h-[560px] items-center justify-center overflow-hidden">
      {video ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={video.src}
          poster={video.poster ?? image}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
        />
      ) : (
        <Image src={image} alt="" fill priority className="object-cover" />
      )}

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-ink/40"
      />

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        {eyebrow && (
          <p className="tracked-label text-xs text-paper-dim">{eyebrow}</p>
        )}
        <h1 className="tracked-display max-w-3xl text-2xl text-paper sm:text-4xl">
          {heading}
        </h1>
        {subheading && (
          <p className="max-w-xl text-sm leading-7 text-paper-dim sm:text-base">
            {subheading}
          </p>
        )}
        {cta && (
          <Link
            href={cta.href}
            className="tracked-label mt-2 flex h-[46px] items-center justify-center rounded-full bg-paper px-8 text-xs text-ink transition-colors hover:bg-accent hover:text-accent-ink"
          >
            {cta.label}
          </Link>
        )}
      </div>
    </section>
  );
}

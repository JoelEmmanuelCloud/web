import Image from "next/image";
import Link from "next/link";

export type PageHeroProps = {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  cta?: { label: string; href: string };
  image: string;
  video?: { src: string; poster?: string };
  framed?: { width: number; height: number; alt: string };
};

export function PageHero({
  eyebrow,
  heading,
  subheading,
  cta,
  image,
  video,
  framed,
}: PageHeroProps) {
  const copy = (
    <>
      {eyebrow && (
        <p className="tracked-label text-xs text-paper-dim">{eyebrow}</p>
      )}
      <h1 className="tracked-display max-w-3xl whitespace-pre-line text-[length:clamp(1rem,calc((100vw_-_4rem)/13.5),1.5rem)] leading-[calc(2/1.5)] text-accent sm:text-4xl sm:leading-[calc(2.5/2.25)]">
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
    </>
  );

  if (framed) {
    return (
      <section className="bg-ink pt-24">
        <div className="sm:px-10 sm:pt-10">
          <Image
            src={image}
            alt={framed.alt}
            width={framed.width}
            height={framed.height}
            priority
            sizes={`(max-width: ${framed.width}px) 100vw, ${framed.width}px`}
            className="mx-auto h-auto sm:rounded-3xl"
            style={{
              width: `min(100%, ${framed.width}px, calc(70dvh * ${framed.width / framed.height}))`,
            }}
          />
        </div>
        <div className="flex flex-col items-center gap-6 px-6 py-14 text-center">
          {copy}
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex h-[100dvh] items-center justify-center overflow-hidden">
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
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-ink/40"
      />

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        {copy}
      </div>
    </section>
  );
}

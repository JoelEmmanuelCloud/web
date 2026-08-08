import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center px-6 pt-24 pb-16 sm:px-10">
      <div className="mx-auto flex max-w-md flex-col items-center gap-8 text-center">
        <p className="tracked-label text-xs text-accent">404</p>
        <h1 className="tracked-display text-xl text-paper sm:text-2xl">
          Page Not Found
        </h1>
        <p className="text-base leading-8 text-paper-dim">
          The page you&rsquo;re looking for doesn&rsquo;t exist, or has moved.
        </p>
        <Link
          href="/"
          className="tracked-label flex h-[46px] items-center justify-center rounded-full bg-paper px-8 text-xs text-ink transition-colors hover:bg-accent hover:text-accent-ink"
        >
          Back To Home
        </Link>
      </div>
    </div>
  );
}

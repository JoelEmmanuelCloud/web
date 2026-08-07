import Link from "next/link";
import { siteEmails } from "@/lib/site-config";

export function PolicyPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="px-6 pt-40 pb-32 sm:px-10">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
        <h1 className="tracked-display text-xl text-paper sm:text-2xl">
          {title}
        </h1>
        <p className="text-base leading-8 text-paper-dim">{description}</p>
        <p className="text-base leading-8 text-paper-dim">
          This page is being finalized ahead of launch. In the meantime,
          please reach out directly and we&rsquo;ll answer any question
          personally.
        </p>
        <Link
          href={`mailto:${siteEmails.general}`}
          className="tracked-label flex h-[46px] items-center justify-center rounded-full bg-paper px-8 text-xs text-ink transition-colors hover:bg-accent hover:text-accent-ink"
        >
          {siteEmails.general}
        </Link>
      </div>
    </div>
  );
}

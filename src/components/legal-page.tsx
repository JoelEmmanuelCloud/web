import Link from "next/link";
import { siteEmails } from "@/lib/site-config";

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

export function LegalPage({
  title,
  lastUpdated,
  intro,
  sections,
}: {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <div className="px-6 pt-40 pb-32 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="tracked-display text-xl text-paper sm:text-2xl">
          {title}
        </h1>
        <p className="tracked-label mt-4 text-xs text-paper-dim">
          Last Updated: {lastUpdated}
        </p>
        <p className="mt-8 text-base leading-8 text-paper-dim">{intro}</p>

        <div className="mt-16 flex flex-col gap-12">
          {sections.map((section, i) => (
            <div key={section.heading} className="border-t border-line pt-8">
              <h2 className="text-lg font-semibold text-paper sm:text-xl">
                {i + 1}. {section.heading}
              </h2>
              {section.paragraphs?.map((paragraph, j) => (
                <p
                  key={j}
                  className="mt-4 text-base leading-8 text-paper-dim"
                >
                  {paragraph}
                </p>
              ))}
              {section.list && (
                <ul className="mt-4 flex flex-col gap-2">
                  {section.list.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-base leading-8 text-paper-dim"
                    >
                      <span className="text-accent">&mdash;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8">
          <p className="tracked-label text-xs text-paper-dim">Questions</p>
          <p className="text-base leading-8 text-paper-dim">
            Reach out any time at{" "}
            <Link
              href={`mailto:${siteEmails.general}`}
              className="text-paper underline underline-offset-4 transition-colors hover:text-accent"
            >
              {siteEmails.general}
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

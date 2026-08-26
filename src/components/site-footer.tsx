import Link from "next/link";
import { footerInfoLinks, siteEmails } from "@/lib/site-config";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink-raised">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-16 sm:px-10">
        <div className="tracked-display text-center text-sm text-paper">
          Paul Wayne Gregory
        </div>

        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {footerInfoLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="tracked-label text-xs text-paper-dim transition-colors hover:text-paper"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-4 text-center">
          <p className="tracked-label text-xs text-paper-dim">
            Subscribe to Indulgence
          </p>
          <form className="flex w-full max-w-sm items-center border-b border-line pb-2">
            <input
              type="email"
              required
              placeholder="Email"
              className="w-full bg-transparent text-sm text-paper placeholder:text-paper-dim focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="tracked-label shrink-0 text-xs text-paper transition-colors hover:text-accent"
            >
              &rarr;
            </button>
          </form>
        </div>

        <div className="flex flex-col items-center gap-2 border-t border-line pt-8 text-center">
          <p className="text-xs text-paper-dim">
            &copy; {year}, Paul Wayne Gregory Chocolates
          </p>
          <a
            href={`mailto:${siteEmails.general}`}
            className="text-xs text-paper-dim transition-colors hover:text-paper"
          >
            {siteEmails.general}
          </a>
        </div>
      </div>
    </footer>
  );
}

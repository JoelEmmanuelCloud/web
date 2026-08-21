import Image from "next/image";
import type { Metadata } from "next";
import { socialLinks, siteEmails } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Coming Soon | Paul Wayne Gregory Chocolates",
  description: "The new Paul Wayne Gregory Chocolates site is on its way.",
  robots: { index: false, follow: false },
};

export default function ComingSoonPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 bg-ink px-6 py-24 text-center">
      <Image
        src="/images/brand/pwg-logo-GRY.png"
        alt="Paul Wayne Gregory"
        width={220}
        height={122}
        className="h-16 w-auto invert"
        priority
      />

      <div className="flex flex-col items-center gap-4">
        <p className="tracked-display text-lg text-accent sm:text-xl">
          Coming Soon
        </p>
        <p className="max-w-md text-base leading-8 text-paper-dim sm:text-lg">
          We&rsquo;re putting the finishing touches on something new.
          Indulgence is everything &mdash; and it&rsquo;s worth the wait.
        </p>
      </div>

      <div className="flex flex-col items-center gap-3">
        <p className="tracked-label text-xs text-paper-dim">Get in touch</p>
        <a
          href={`mailto:${siteEmails.general}`}
          className="text-sm text-paper underline underline-offset-4 hover:text-accent"
        >
          {siteEmails.general}
        </a>
        <div className="mt-2 flex items-center gap-6 text-xs">
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noreferrer"
            className="tracked-label text-paper-dim hover:text-paper"
          >
            Instagram
          </a>
          <a
            href={socialLinks.x}
            target="_blank"
            rel="noreferrer"
            className="tracked-label text-paper-dim hover:text-paper"
          >
            X
          </a>
        </div>
      </div>
    </main>
  );
}

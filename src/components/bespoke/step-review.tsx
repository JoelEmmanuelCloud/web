"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/products";
import { siteEmails } from "@/lib/site-config";
import type { BuilderState } from "@/components/bespoke/live-summary";
import { encodeBuilderState } from "@/lib/bespoke-share";

export function StepReview({
  state,
  price,
}: {
  state: BuilderState;
  price: number;
}) {
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const truffleCount = Object.values(state.flavours).reduce((a, b) => a + b, 0);
  const canShare = state.personalise.mode !== "logo";

  function revealLink() {
    const params = encodeBuilderState(state);
    const url = `${window.location.origin}/bespoke-box/build?${params}`;
    setShareUrl(url);
    setCopied(false);
    requestAnimationFrame(() => inputRef.current?.select());
  }

  async function copyRevealedLink() {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch {
      inputRef.current?.select();
    }
  }

  const summaryLines = [
    `Box: ${state.boxStyle?.name ?? "—"} (${state.boxColour?.name ?? "—"})`,
    `Size: ${state.size ?? "—"} pieces`,
    `Truffles: ${truffleCount} selected`,
    `Personalisation: ${
      state.personalise.mode === "none"
        ? "None"
        : state.personalise.mode === "logo"
          ? "Uploaded logo"
          : state.personalise.name || "Name (not yet typed)"
    }`,
    `Estimated total: ${formatPrice(price)}`,
  ];

  const enquireHref = `mailto:${siteEmails.webSales}?subject=${encodeURIComponent(
    "Bespoke Box Enquiry",
  )}&body=${encodeURIComponent(summaryLines.join("\n"))}`;

  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="tracked-label mb-6 text-xs text-paper-dim">
          Review Your Design
        </p>
        <div className="flex flex-col gap-3 border border-line p-6">
          {summaryLines.map((line) => (
            <p key={line} className="text-sm text-paper-dim">
              {line}
            </p>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href={enquireHref}
          className="tracked-label flex h-[46px] flex-1 items-center justify-center rounded-full bg-paper px-8 text-xs text-ink transition-colors hover:bg-accent hover:text-accent-ink"
        >
          Enquire About This Design
        </Link>
        <button
          type="button"
          onClick={revealLink}
          disabled={!canShare}
          className="tracked-label flex h-[46px] flex-1 items-center justify-center rounded-full border border-line px-8 text-xs text-paper-dim transition-colors hover:border-paper-dim hover:text-paper disabled:opacity-40"
        >
          {canShare
            ? "Save & Share This Design"
            : "Uploaded Logos Can't Be Shared Via Link"}
        </button>
      </div>

      {shareUrl && (
        <div className="flex flex-col gap-2 border-t border-line pt-6">
          <p className="tracked-label text-xs text-paper-dim">
            Your Link — Select Copy, Or Use The Button
          </p>
          <div className="flex gap-3">
            <input
              ref={inputRef}
              readOnly
              value={shareUrl}
              onFocus={(e) => e.target.select()}
              className="flex-1 border border-line bg-transparent px-4 py-3 text-sm text-paper focus:outline-none"
            />
            <button
              type="button"
              onClick={copyRevealedLink}
              className="tracked-label shrink-0 border border-line px-5 text-xs text-paper-dim transition-colors hover:border-paper-dim hover:text-paper"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      )}

      <p className="text-xs text-paper-dim">
        This sends your design directly to our team rather than through an
        automated checkout — production timelines and payment details are
        confirmed with you personally once we&rsquo;ve reviewed it.
      </p>
    </div>
  );
}

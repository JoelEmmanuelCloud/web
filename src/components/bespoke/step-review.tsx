"use client";

import { useRef, useState, useTransition } from "react";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";
import { siteEmails } from "@/lib/site-config";
import type { BuilderState } from "@/components/bespoke/live-summary";
import { encodeBuilderState } from "@/lib/bespoke-share";
import { addBespokeBoxToCart } from "@/lib/cart";

export function StepReview({
  state,
  price,
  truffleFlavours,
}: {
  state: BuilderState;
  price: number;
  truffleFlavours: Product[];
}) {
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [addedToCart, setAddedToCart] = useState(false);
  const [cartError, setCartError] = useState(false);
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

  const flavourBreakdown = Object.entries(state.flavours)
    .filter(([, count]) => count > 0)
    .map(([slug, count]) => {
      const flavour = truffleFlavours.find((f) => f.slug === slug);
      return `${flavour?.name ?? slug} x${count}`;
    })
    .join(", ");

  const personalisationDetail =
    state.personalise.mode === "none"
      ? "None"
      : state.personalise.mode === "name"
        ? `Name "${state.personalise.name}" (${state.personalise.fontId} font, ${state.personalise.foilColour?.name ?? "gold"} foil)`
        : `Logo uploaded (${state.personalise.foilColour?.name ?? "gold"} foil) — file to follow via email`;

  const canAddToCart = !!(state.boxStyle && state.boxColour && state.size);

  function handleAddToCart() {
    if (!state.size) return;
    setCartError(false);
    startTransition(async () => {
      const result = await addBespokeBoxToCart({
        size: state.size!,
        personalised: state.personalise.mode !== "none",
        attributes: [
          { key: "Box Style", value: state.boxStyle?.name ?? "—" },
          { key: "Box Colour", value: state.boxColour?.name ?? "—" },
          { key: "Truffles", value: flavourBreakdown || "—" },
          { key: "Personalisation", value: personalisationDetail },
        ],
      });
      if (result.ok) {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2500);
      } else {
        setCartError(true);
      }
    });
  }

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
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!canAddToCart || isPending}
          className="tracked-label flex h-[46px] flex-1 items-center justify-center rounded-full bg-paper px-8 text-xs text-ink transition-colors hover:bg-accent hover:text-accent-ink disabled:opacity-60"
        >
          {isPending
            ? "Adding…"
            : addedToCart
              ? "Added To Cart"
              : "Add To Cart"}
        </button>
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

      {cartError && (
        <p className="text-xs text-accent">
          Something went wrong adding this to your cart — please enquire
          directly below instead.
        </p>
      )}

      <Link
        href={enquireHref}
        className="tracked-label text-xs text-paper-dim transition-colors hover:text-paper"
      >
        Or enquire about this design directly
      </Link>

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
        Personalisation and production details are confirmed with you
        directly before your box goes into production.
      </p>
    </div>
  );
}

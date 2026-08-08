"use client";

import { useState } from "react";
import Image from "next/image";
import type { BoxColour, BoxStyle, FoilColour } from "@/lib/bespoke-config";
import { formatPrice } from "@/lib/products";

export type BuilderState = {
  boxStyle: BoxStyle | null;
  boxColour: BoxColour | null;
  size: number | null;
  flavours: Record<string, number>;
  personalise: {
    mode: "none" | "logo" | "name";
    logoDataUrl: string | null;
    name: string;
    fontId: string;
    foilColour: FoilColour | null;
  };
};

export function LiveSummary({
  state,
  price,
}: {
  state: BuilderState;
  price: number;
}) {
  const [zoom, setZoom] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const truffleCount = Object.values(state.flavours).reduce((a, b) => a + b, 0);

  const preview = (
    <button
      type="button"
      onClick={() => setZoom((v) => !v)}
      className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl border border-line"
      style={{
        backgroundColor: state.boxColour?.hex ?? "#17120e",
      }}
      aria-label="Toggle preview zoom"
    >
      <div
        className={`transition-transform duration-500 ${zoom ? "scale-150" : "scale-100"}`}
      >
        {state.personalise.mode === "logo" && state.personalise.logoDataUrl ? (
          <div className="relative h-24 w-40 overflow-hidden rounded-xl">
            <Image
              src={state.personalise.logoDataUrl}
              alt="Your logo"
              fill
              unoptimized
              sizes="160px"
              className="object-contain"
              style={{
                filter:
                  state.personalise.foilColour?.id === "silver"
                    ? "grayscale(1) brightness(1.6)"
                    : undefined,
              }}
            />
          </div>
        ) : state.personalise.mode === "name" && state.personalise.name ? (
          <p
            className="text-2xl"
            style={{
              fontFamily:
                state.personalise.fontId === "script"
                  ? "cursive"
                  : state.personalise.fontId === "serif"
                    ? "serif"
                    : "sans-serif",
              color: state.personalise.foilColour?.hex ?? "#c9a24b",
            }}
          >
            {state.personalise.name}
          </p>
        ) : (
          <p className="tracked-label text-xs text-paper-dim">
            {state.boxStyle?.name ?? "Your Box"}
          </p>
        )}
      </div>
      <span className="tracked-label absolute bottom-3 right-3 text-[10px] text-paper-dim">
        {zoom ? "Shrink" : "Zoom"}
      </span>
    </button>
  );

  const details = (
    <div className="flex flex-col gap-2 text-sm">
      <Row label="Box" value={state.boxStyle?.name ?? "Not selected"} />
      <Row label="Colour" value={state.boxColour?.name ?? "Not selected"} />
      <Row
        label="Size"
        value={state.size ? `${state.size} pieces` : "Not selected"}
      />
      <Row
        label="Truffles"
        value={truffleCount > 0 ? `${truffleCount} selected` : "Not selected"}
      />
      <Row
        label="Personalisation"
        value={
          state.personalise.mode === "none"
            ? "None"
            : state.personalise.mode === "logo"
              ? "Logo"
              : state.personalise.name || "Name (not typed yet)"
        }
      />
    </div>
  );

  return (
    <>
      <div className="hidden flex-col gap-6 border border-line bg-ink-raised p-6 lg:sticky lg:top-40 lg:flex">
        {preview}
        {details}
        <div className="flex items-baseline justify-between border-t border-line pt-4">
          <span className="tracked-label text-xs text-paper-dim">
            Current Total
          </span>
          <span className="text-lg text-paper">{formatPrice(price)}</span>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink-raised lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label="Toggle order summary"
          className="flex min-h-[44px] w-full items-center justify-between gap-4 px-6 py-4"
        >
          <span className="flex items-center gap-3">
            <span
              aria-hidden
              className="h-8 w-8 shrink-0 rounded-full border border-line"
              style={{ backgroundColor: state.boxColour?.hex ?? "#17120e" }}
            />
            <span className="tracked-label text-xs text-paper-dim">
              {mobileOpen ? "Hide Summary" : "View Summary"}
            </span>
          </span>
          <span className="flex items-center gap-3">
            <span className="text-base text-paper">{formatPrice(price)}</span>
            <span
              aria-hidden
              className={`text-paper-dim transition-transform duration-300 ${
                mobileOpen ? "rotate-180" : ""
              }`}
            >
              &uarr;
            </span>
          </span>
        </button>

        {mobileOpen && (
          <div className="flex max-h-[70vh] flex-col gap-6 overflow-y-auto border-t border-line px-6 py-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
            <div className="mx-auto w-40">{preview}</div>
            {details}
          </div>
        )}
      </div>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-paper-dim">{label}</span>
      <span className="text-paper">{value}</span>
    </div>
  );
}

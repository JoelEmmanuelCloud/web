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
  const truffleCount = Object.values(state.flavours).reduce((a, b) => a + b, 0);

  return (
    <div className="sticky top-40 flex flex-col gap-6 border border-line bg-ink-raised p-6">
      <button
        type="button"
        onClick={() => setZoom((v) => !v)}
        className="relative flex aspect-square w-full items-center justify-center overflow-hidden border border-line"
        style={{
          backgroundColor: state.boxColour?.hex ?? "#17120e",
        }}
        aria-label="Toggle preview zoom"
      >
        <div
          className={`transition-transform duration-500 ${zoom ? "scale-150" : "scale-100"}`}
        >
          {state.personalise.mode === "logo" && state.personalise.logoDataUrl ? (
            <div className="relative h-24 w-40">
              <Image
                src={state.personalise.logoDataUrl}
                alt="Your logo"
                fill
                unoptimized
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

      <div className="flex items-baseline justify-between border-t border-line pt-4">
        <span className="tracked-label text-xs text-paper-dim">
          Current Total
        </span>
        <span className="text-lg text-paper">{formatPrice(price)}</span>
      </div>
    </div>
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

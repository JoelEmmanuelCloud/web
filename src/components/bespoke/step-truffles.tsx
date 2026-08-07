"use client";

import Image from "next/image";
import { products } from "@/lib/products";
import { boxSizes } from "@/lib/bespoke-config";
import type { BuilderState } from "@/components/bespoke/live-summary";

const truffleFlavours = products.filter((p) => p.collection === "truffles");

export function StepTruffles({
  state,
  onChange,
}: {
  state: BuilderState;
  onChange: (patch: Partial<BuilderState>) => void;
}) {
  const size = state.size ?? 0;
  const maxFlavours =
    boxSizes.find((s) => s.count === size)?.maxFlavours ?? 1;
  const totalSelected = Object.values(state.flavours).reduce(
    (a, b) => a + b,
    0,
  );
  const distinctSelected = Object.values(state.flavours).filter(
    (v) => v > 0,
  ).length;
  const remaining = size - totalSelected;

  function adjust(slug: string, delta: number) {
    const current = state.flavours[slug] ?? 0;
    const next = Math.max(0, current + delta);

    if (delta > 0) {
      if (remaining <= 0) return;
      if (current === 0 && distinctSelected >= maxFlavours) return;
    }

    onChange({ flavours: { ...state.flavours, [slug]: next } });
  }

  if (!state.size) {
    return (
      <p className="text-sm text-paper-dim">
        Choose a box size first — that determines how many flavours you can
        mix.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-baseline justify-between">
        <p className="tracked-label text-xs text-paper-dim">
          Choose Your Truffles — {totalSelected} of {size} selected
        </p>
        <p className="text-xs text-paper-dim">
          Up to {maxFlavours} flavour{maxFlavours > 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {truffleFlavours.map((flavour) => {
          const count = state.flavours[flavour.slug] ?? 0;
          const disabled =
            count === 0 && (remaining <= 0 || distinctSelected >= maxFlavours);

          return (
            <div
              key={flavour.slug}
              className={`flex flex-col gap-3 border p-4 transition-colors ${
                count > 0 ? "border-accent" : "border-line"
              }`}
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-paper/5">
                <Image
                  src={flavour.image}
                  alt={flavour.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <p className="tracked-label text-xs text-paper">
                {flavour.name}
              </p>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => adjust(flavour.slug, -1)}
                  disabled={count === 0}
                  className="h-8 w-8 border border-line text-paper-dim transition-colors hover:border-paper-dim disabled:opacity-30"
                >
                  &minus;
                </button>
                <span className="text-sm text-paper">{count}</span>
                <button
                  type="button"
                  onClick={() => adjust(flavour.slug, 1)}
                  disabled={disabled}
                  className="h-8 w-8 border border-line text-paper-dim transition-colors hover:border-paper-dim disabled:opacity-30"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

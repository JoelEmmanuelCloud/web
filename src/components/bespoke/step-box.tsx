"use client";

import { boxStyles, boxColours, boxSizes } from "@/lib/bespoke-config";
import type { BuilderState } from "@/components/bespoke/live-summary";

export function StepBox({
  state,
  onChange,
}: {
  state: BuilderState;
  onChange: (patch: Partial<BuilderState>) => void;
}) {
  return (
    <div className="flex flex-col gap-14">
      <div>
        <p className="tracked-label mb-6 text-xs text-paper-dim">
          Choose Your Box Style
        </p>
        <div className="grid gap-6 sm:grid-cols-3">
          {boxStyles.map((style) => (
            <button
              key={style.id}
              type="button"
              onClick={() => onChange({ boxStyle: style })}
              className={`flex flex-col items-start gap-4 border p-6 text-left transition-colors ${
                state.boxStyle?.id === style.id
                  ? "border-accent"
                  : "border-line hover:border-paper-dim"
              }`}
            >
              <div
                className="h-24 w-full"
                style={{ backgroundColor: style.swatch }}
              />
              <div>
                <p className="tracked-label text-xs text-paper">
                  {style.name}
                </p>
                <p className="mt-2 text-sm text-paper-dim">
                  {style.description}
                </p>
              </div>
            </button>
          ))}
        </div>
        <p className="mt-4 text-xs text-paper-dim">
          Reference swatches shown — final packaging photography pending
          supplier samples.
        </p>
      </div>

      <div>
        <p className="tracked-label mb-6 text-xs text-paper-dim">
          Choose Your Box Colour
        </p>
        <div className="flex flex-wrap gap-5">
          {boxColours.map((colour) => (
            <button
              key={colour.id}
              type="button"
              onClick={() => onChange({ boxColour: colour })}
              className="flex flex-col items-center gap-2"
            >
              <span
                className={`h-12 w-12 rounded-full border-2 transition-colors ${
                  state.boxColour?.id === colour.id
                    ? "border-accent"
                    : "border-line"
                }`}
                style={{ backgroundColor: colour.hex }}
              />
              <span className="tracked-label text-[10px] text-paper-dim">
                {colour.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="tracked-label mb-6 text-xs text-paper-dim">
          Choose Your Box Size
        </p>
        <div className="flex flex-wrap gap-4">
          {boxSizes.map((size) => (
            <button
              key={size.count}
              type="button"
              onClick={() => onChange({ size: size.count, flavours: {} })}
              className={`flex h-16 w-16 flex-col items-center justify-center border transition-colors ${
                state.size === size.count
                  ? "border-accent text-paper"
                  : "border-line text-paper-dim hover:border-paper-dim"
              }`}
            >
              <span className="text-sm">{size.count}</span>
              <span className="text-[9px]">pieces</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

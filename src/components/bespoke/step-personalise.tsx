"use client";

import { foilColours, approvedFonts } from "@/lib/bespoke-config";
import type { BuilderState } from "@/components/bespoke/live-summary";

export function StepPersonalise({
  state,
  onChange,
}: {
  state: BuilderState;
  onChange: (patch: Partial<BuilderState>) => void;
}) {
  function setMode(mode: BuilderState["personalise"]["mode"]) {
    onChange({ personalise: { ...state.personalise, mode } });
  }

  function handleLogoUpload(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onChange({
        personalise: {
          ...state.personalise,
          mode: "logo",
          logoDataUrl: reader.result as string,
        },
      });
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="flex flex-col gap-10">
      <p className="max-w-xl text-sm leading-7 text-paper-dim">
        Foil printing has real design limitations — not every logo transfers
        cleanly to foil. We&rsquo;ll confirm feasibility with you directly
        before production begins.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
        <button
          type="button"
          onClick={() => setMode("logo")}
          className={`tracked-label flex-1 border px-6 py-4 text-xs transition-colors ${
            state.personalise.mode === "logo"
              ? "border-accent text-paper"
              : "border-line text-paper-dim hover:border-paper-dim"
          }`}
        >
          Upload A Logo
        </button>
        <button
          type="button"
          onClick={() => setMode("name")}
          className={`tracked-label flex-1 border px-6 py-4 text-xs transition-colors ${
            state.personalise.mode === "name"
              ? "border-accent text-paper"
              : "border-line text-paper-dim hover:border-paper-dim"
          }`}
        >
          Add A Name
        </button>
        <button
          type="button"
          onClick={() => setMode("none")}
          className={`tracked-label flex-1 border px-6 py-4 text-xs transition-colors ${
            state.personalise.mode === "none"
              ? "border-accent text-paper"
              : "border-line text-paper-dim hover:border-paper-dim"
          }`}
        >
          No Personalisation
        </button>
      </div>

      {state.personalise.mode === "logo" && (
        <div className="flex flex-col gap-3">
          <label className="tracked-label text-xs text-paper-dim">
            JPEG, PNG, or SVG — logo must be supplied in black. Foil area is
            up to 125mm &times; 125mm, set in 1.5cm from the edge of the box.
          </label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/svg+xml"
            onChange={(e) => handleLogoUpload(e.target.files?.[0])}
            className="text-sm text-paper-dim file:mr-4 file:border file:border-line file:bg-transparent file:px-4 file:py-2 file:text-xs file:text-paper"
          />
        </div>
      )}

      {state.personalise.mode === "name" && (
        <div className="flex flex-col gap-6">
          <input
            type="text"
            maxLength={24}
            placeholder="Type the name to foil-stamp"
            value={state.personalise.name}
            onChange={(e) =>
              onChange({
                personalise: { ...state.personalise, name: e.target.value },
              })
            }
            className="border-b border-line bg-transparent pb-3 text-lg text-paper placeholder:text-paper-dim focus:outline-none"
          />
          <div>
            <p className="tracked-label mb-4 text-xs text-paper-dim">
              Font
            </p>
            <div className="flex flex-wrap gap-4">
              {approvedFonts.map((font) => (
                <button
                  key={font.id}
                  type="button"
                  onClick={() =>
                    onChange({
                      personalise: {
                        ...state.personalise,
                        fontId: font.id,
                      },
                    })
                  }
                  style={{ fontFamily: font.family }}
                  className={`border px-5 py-3 text-sm transition-colors ${
                    state.personalise.fontId === font.id
                      ? "border-accent text-paper"
                      : "border-line text-paper-dim hover:border-paper-dim"
                  }`}
                >
                  {font.name}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-paper-dim">
              Foil area is up to 125mm &times; 125mm, set in 1.5cm from the
              edge of the box. Approved font list still pending confirmation
              from our foiling supplier.
            </p>
          </div>
        </div>
      )}

      {state.personalise.mode !== "none" && (
        <div>
          <p className="tracked-label mb-4 text-xs text-paper-dim">
            Foil Colour
          </p>
          <div className="flex gap-5">
            {foilColours.map((colour) => (
              <button
                key={colour.id}
                type="button"
                onClick={() =>
                  onChange({
                    personalise: {
                      ...state.personalise,
                      foilColour: colour,
                    },
                  })
                }
                className="flex flex-col items-center gap-2"
              >
                <span
                  className={`h-10 w-10 rounded-full border-2 transition-colors ${
                    state.personalise.foilColour?.id === colour.id
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
      )}
    </div>
  );
}

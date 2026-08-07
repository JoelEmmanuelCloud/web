import { boxStyles, boxColours, foilColours } from "@/lib/bespoke-config";
import type { BuilderState } from "@/components/bespoke/live-summary";

export function encodeBuilderState(state: BuilderState) {
  const params = new URLSearchParams();
  if (state.boxStyle) params.set("style", state.boxStyle.id);
  if (state.boxColour) params.set("colour", state.boxColour.id);
  if (state.size) params.set("size", String(state.size));

  const flavourPairs = Object.entries(state.flavours)
    .filter(([, count]) => count > 0)
    .map(([slug, count]) => `${slug}:${count}`)
    .join(",");
  if (flavourPairs) params.set("flavours", flavourPairs);

  if (state.personalise.mode !== "none") {
    params.set("mode", state.personalise.mode);
    if (state.personalise.mode === "name") {
      params.set("name", state.personalise.name);
      params.set("font", state.personalise.fontId);
    }
    if (state.personalise.foilColour) {
      params.set("foil", state.personalise.foilColour.id);
    }
  }

  return params.toString();
}

export function decodeBuilderState(
  params: URLSearchParams,
): Partial<BuilderState> | null {
  if (![...params.keys()].length) return null;

  const state: Partial<BuilderState> = {};

  const styleId = params.get("style");
  if (styleId) {
    state.boxStyle = boxStyles.find((s) => s.id === styleId) ?? null;
  }

  const colourId = params.get("colour");
  if (colourId) {
    state.boxColour = boxColours.find((c) => c.id === colourId) ?? null;
  }

  const size = params.get("size");
  if (size) state.size = Number(size);

  const flavourPairs = params.get("flavours");
  if (flavourPairs) {
    const flavours: Record<string, number> = {};
    flavourPairs.split(",").forEach((pair) => {
      const [slug, count] = pair.split(":");
      if (slug && count) flavours[slug] = Number(count);
    });
    state.flavours = flavours;
  }

  const mode = params.get("mode");
  if (mode === "name" || mode === "logo") {
    state.personalise = {
      mode,
      logoDataUrl: null,
      name: params.get("name") ?? "",
      fontId: params.get("font") ?? "script",
      foilColour:
        foilColours.find((f) => f.id === params.get("foil")) ?? null,
    };
  }

  return state;
}

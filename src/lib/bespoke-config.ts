export type BoxStyle = {
  id: string;
  name: string;
  description: string;
  swatch: string;
};

export const boxStyles: BoxStyle[] = [
  {
    id: "rigid",
    name: "Rigid Box",
    description:
      "A separate lid and base in a substantial, structured board — the classic luxury gift-box construction.",
    swatch: "#17120e",
  },
  {
    id: "folded",
    name: "Folded Box",
    description:
      "Assembles from a single folded sheet — lighter, and lays flat before assembly for easy storage.",
    swatch: "#241a12",
  },
  {
    id: "window",
    name: "Window Box",
    description:
      "A die-cut window in the lid, so the collection is visible before the box is even opened.",
    swatch: "#2a1e18",
  },
];

export type BoxColour = {
  id: string;
  name: string;
  hex: string;
};

export const boxColours: BoxColour[] = [
  { id: "noir", name: "Noir", hex: "#0e0b09" },
  { id: "blush", name: "Blush", hex: "#f2cfe0" },
  { id: "cocoa", name: "Cocoa", hex: "#4a3222" },
];

export type BoxSize = {
  count: number;
  maxFlavours: number;
};

export const boxSizes: BoxSize[] = [
  { count: 4, maxFlavours: 1 },
  { count: 6, maxFlavours: 1 },
  { count: 9, maxFlavours: 2 },
  { count: 12, maxFlavours: 2 },
  { count: 18, maxFlavours: 3 },
  { count: 24, maxFlavours: 4 },
];

export type FoilColour = {
  id: string;
  name: string;
  hex: string;
};

export const foilColours: FoilColour[] = [
  { id: "gold", name: "Gold", hex: "#c9a24b" },
  { id: "silver", name: "Silver", hex: "#c7c7c7" },
  { id: "pink", name: "Pink", hex: "#e6007e" },
];

export const approvedFonts = [
  { id: "script", name: "Signature Script", family: "cursive" },
  { id: "serif", name: "Classic Serif", family: "serif" },
  { id: "sans", name: "Modern Sans", family: "sans-serif" },
];

export const TRUFFLE_UNIT_PRICE = 2.1;
export const BOX_BASE_PRICE = 6.5;
export const PERSONALISATION_PRICE = 4.5;

export function calculatePrice({
  truffleCount,
  hasPersonalisation,
}: {
  truffleCount: number;
  hasPersonalisation: boolean;
}) {
  const truffles = truffleCount * TRUFFLE_UNIT_PRICE;
  const personalisation = hasPersonalisation ? PERSONALISATION_PRICE : 0;
  return BOX_BASE_PRICE + truffles + personalisation;
}

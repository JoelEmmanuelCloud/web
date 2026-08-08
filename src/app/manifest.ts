import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Paul Wayne Gregory Chocolates",
    short_name: "PWG Chocolates",
    description:
      "Multi-award winning chocolatier Paul Wayne Gregory. Indulgence is everything.",
    start_url: "/",
    display: "standalone",
    background_color: "#0e0b09",
    theme_color: "#0e0b09",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

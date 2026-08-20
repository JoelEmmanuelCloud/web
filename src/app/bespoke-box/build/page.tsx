import { Suspense } from "react";
import type { Metadata } from "next";
import { Builder } from "@/components/bespoke/builder";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Configure Your Box | Paul Wayne Gregory Chocolates",
  robots: { index: false, follow: true },
};

export default async function BespokeBoxBuildPage() {
  const products = await getProducts();
  const truffleFlavours = products.filter((p) => p.collection === "truffles");

  return (
    <div className="relative min-h-screen">
      <video
        className="fixed inset-0 -z-10 h-full w-full object-cover opacity-30 blur-sm"
        src="/video/atelier-backdrop.mp4"
        autoPlay
        muted
        loop
        playsInline
        controls={false}
      />
      <div className="fixed inset-0 -z-10 bg-ink/80" />
      <Suspense fallback={null}>
        <Builder truffleFlavours={truffleFlavours} />
      </Suspense>
    </div>
  );
}

import { Suspense } from "react";
import type { Metadata } from "next";
import { Builder } from "@/components/bespoke/builder";

export const metadata: Metadata = {
  title: "Configure Your Box | Paul Wayne Gregory Chocolates",
};

export default function BespokeBoxBuildPage() {
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
        <Builder />
      </Suspense>
    </div>
  );
}

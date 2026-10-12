import type { ReactNode } from "react";

export function Skeleton({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`skeleton ${className}`} />;
}

export function SkeletonPage({ children }: { children: ReactNode }) {
  return (
    <div role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">Loading</span>
      {children}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <section className="flex h-[100dvh] items-center justify-center bg-ink-raised">
      <div className="flex w-full flex-col items-center gap-6 px-6">
        <Skeleton className="h-3 w-40 rounded-full" />
        <Skeleton className="h-8 w-full max-w-md rounded-full sm:h-10" />
        <Skeleton className="h-3 w-full max-w-sm rounded-full" />
      </div>
    </section>
  );
}

export function SectionHeadingSkeleton() {
  return <Skeleton className="mx-auto mb-14 h-6 w-64 max-w-full rounded-full" />;
}

export function TextLinesSkeleton({ lines = 4 }: { lines?: number }) {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          className={`h-3 rounded-full ${i === lines - 1 ? "w-2/3" : "w-full"}`}
        />
      ))}
    </div>
  );
}

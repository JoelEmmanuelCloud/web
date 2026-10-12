import {
  HeroSkeleton,
  SectionHeadingSkeleton,
  Skeleton,
  SkeletonPage,
} from "@/components/skeleton";

function ProductCardSkeleton({ aspect }: { aspect: string }) {
  return (
    <div>
      <Skeleton className={`${aspect} w-full rounded-3xl`} />
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <Skeleton className="h-3 w-40 rounded-full" />
        <Skeleton className="h-3 w-14 rounded-full" />
      </div>
      <Skeleton className="mt-3 h-3 w-3/4 rounded-full" />
    </div>
  );
}

function ProductSectionSkeleton({
  count,
  aspect,
  tone,
}: {
  count: number;
  aspect: string;
  tone: string;
}) {
  return (
    <section className={`px-6 py-24 sm:px-10 ${tone}`}>
      <div className="mx-auto max-w-7xl">
        <SectionHeadingSkeleton />
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: count }, (_, i) => (
            <ProductCardSkeleton key={i} aspect={aspect} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Loading() {
  return (
    <SkeletonPage>
      <HeroSkeleton />
      <ProductSectionSkeleton count={2} aspect="aspect-[3/2]" tone="bg-ink" />
      <ProductSectionSkeleton
        count={3}
        aspect="aspect-square"
        tone="bg-ink-raised"
      />
    </SkeletonPage>
  );
}

import { HeroSkeleton, Skeleton, SkeletonPage } from "@/components/skeleton";

export default function Loading() {
  return (
    <SkeletonPage>
      <HeroSkeleton />
      <section className="bg-ink px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }, (_, i) => (
              <Skeleton key={i} className="aspect-square w-full rounded-3xl" />
            ))}
          </div>
        </div>
      </section>
    </SkeletonPage>
  );
}

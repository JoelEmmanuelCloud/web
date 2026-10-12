import {
  HeroSkeleton,
  SectionHeadingSkeleton,
  SkeletonPage,
  TextLinesSkeleton,
} from "@/components/skeleton";

export default function Loading() {
  return (
    <SkeletonPage>
      <HeroSkeleton />
      <section className="bg-ink px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <SectionHeadingSkeleton />
          <TextLinesSkeleton lines={5} />
        </div>
      </section>
    </SkeletonPage>
  );
}

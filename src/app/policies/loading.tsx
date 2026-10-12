import { Skeleton, SkeletonPage, TextLinesSkeleton } from "@/components/skeleton";

export default function Loading() {
  return (
    <SkeletonPage>
      <div className="px-6 pt-40 pb-32 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <Skeleton className="h-6 w-72 max-w-full rounded-full sm:h-8" />
          <Skeleton className="mt-4 h-3 w-40 rounded-full" />
          <div className="mt-8">
            <TextLinesSkeleton lines={3} />
          </div>
          <div className="mt-16 flex flex-col gap-12">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="border-t border-line pt-8">
                <Skeleton className="mb-6 h-5 w-56 max-w-full rounded-full" />
                <TextLinesSkeleton lines={4} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SkeletonPage>
  );
}

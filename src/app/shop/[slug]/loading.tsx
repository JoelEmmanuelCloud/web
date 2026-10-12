import { Skeleton, SkeletonPage, TextLinesSkeleton } from "@/components/skeleton";

export default function Loading() {
  return (
    <SkeletonPage>
      <div className="px-6 pt-32 pb-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <Skeleton className="mb-10 h-3 w-32 rounded-full" />
          <div className="grid gap-14 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <Skeleton className="aspect-square w-full rounded-3xl" />
              <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
                {Array.from({ length: 4 }, (_, i) => (
                  <Skeleton key={i} className="aspect-square rounded-2xl" />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div>
                <Skeleton className="h-6 w-full max-w-sm rounded-full sm:h-8" />
                <Skeleton className="mt-4 h-3 w-56 max-w-full rounded-full" />
                <Skeleton className="mt-7 h-4 w-24 rounded-full" />
              </div>
              <Skeleton className="h-[46px] w-full max-w-xs rounded-full" />
              <div className="border-t border-line pt-8">
                <TextLinesSkeleton lines={6} />
              </div>
              <div className="border-t border-line pt-8">
                <Skeleton className="mb-4 h-3 w-28 rounded-full" />
                <TextLinesSkeleton lines={2} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonPage>
  );
}

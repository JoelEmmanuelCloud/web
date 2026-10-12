import { Skeleton, SkeletonPage } from "@/components/skeleton";

export default function Loading() {
  return (
    <SkeletonPage>
      <div className="px-6 pt-32 pb-24 sm:px-10">
        <div className="mx-auto max-w-4xl">
          <Skeleton className="h-6 w-48 rounded-full sm:h-8" />
          <div className="mt-10 flex flex-col gap-6">
            {Array.from({ length: 2 }, (_, i) => (
              <div key={i} className="flex gap-6 border-b border-line pb-6">
                <Skeleton className="h-24 w-24 shrink-0 rounded-xl" />
                <div className="flex flex-1 flex-col justify-between gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <Skeleton className="h-3 w-40 max-w-full rounded-full" />
                    <Skeleton className="h-3 w-14 rounded-full" />
                  </div>
                  <Skeleton className="h-8 w-32 rounded-full" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
            <Skeleton className="h-3 w-20 rounded-full" />
            <Skeleton className="h-4 w-16 rounded-full" />
          </div>
          <Skeleton className="mt-8 h-[46px] w-full rounded-full" />
        </div>
      </div>
    </SkeletonPage>
  );
}

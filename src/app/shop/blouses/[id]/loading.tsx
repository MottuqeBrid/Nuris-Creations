import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <section className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 rounded-2xl border border-base-300 bg-base-100 p-4 sm:gap-8 sm:p-6 lg:grid-cols-2">
        {/* Image skeleton */}
        <div className="space-y-3">
          <Skeleton className="aspect-4/5 rounded-xl" />
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="aspect-square rounded-lg" />
            ))}
          </div>
        </div>

        {/* Details skeleton */}
        <div className="flex flex-col gap-4 sm:gap-5">
          {/* Badges */}
          <div className="flex gap-2">
            <Skeleton width={80} height={24} borderRadius={999} />
            <Skeleton width={100} height={24} borderRadius={999} />
          </div>

          {/* Title */}
          <div>
            <Skeleton height={32} width="75%" />
            <Skeleton height={32} width="50%" className="mt-2" />
          </div>

          {/* Description */}
          <div>
            <Skeleton count={3} />
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <Skeleton width={120} height={40} />
            <Skeleton width={80} height={24} />
            <Skeleton width={100} height={24} />
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3 rounded-xl border border-base-300 p-3 sm:gap-4 sm:p-4">
            {[...Array(3)].map((_, index) => (
              <div key={index}>
                <Skeleton width={80} height={16} className="mb-2" />
                <Skeleton width={100} height={20} />
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} width={60} height={28} borderRadius={6} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

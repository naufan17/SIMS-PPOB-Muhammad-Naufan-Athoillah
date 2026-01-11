interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
  );
};

export const ServiceSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Skeleton className="w-14 h-14 rounded-xl" />
      <Skeleton className="h-3 w-16" />
    </div>
  );
};

export const BannerSkeleton = () => {
  return (
    <Skeleton className="min-w-[270px] h-28 rounded-xl" />
  );
};

export const BalanceSkeleton = () => {
  return (
    <div className="w-full h-full p-6 bg-red-600 rounded-xl flex flex-col justify-between">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-20 bg-white/20" />
        <Skeleton className="h-9 w-48 bg-white/20 mt-1" />
      </div>
      <Skeleton className="h-4 w-24 bg-white/20" />
    </div>
  );
};

export const ProfileSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-4 overflow-hidden">
      <Skeleton className="w-20 h-20 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-8 w-48" />
      </div>
    </div>
  );
};

export const TransactionSkeleton = () => {
  return (
    <div className="w-full p-5 border border-gray-100 rounded-xl flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-4 w-40" />
    </div>
  );
};

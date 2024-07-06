import React from "react";
import Skeleton from "../Skeleton";

export default function StackedBarChartSkeleton() {
  return (
    <div className="w-full h-full flex justify-between items-end border-l border-b px-4 min-h-96">
      <Skeleton className={"rounded-t-md w-10 sm:w-20 h-1/3"} />
      <Skeleton className={"rounded-t-md w-10 sm:w-20 h-1/2"} />
      <Skeleton className={"rounded-t-md w-10 sm:w-20 h-full"} />
      <Skeleton className={"rounded-t-md w-10 sm:w-20 h-2/3"} />
      <Skeleton className={"rounded-t-md w-10 sm:w-20 h-4/5"} />
    </div>
  );
}

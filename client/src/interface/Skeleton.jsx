import React from "react";

export default function Skeleton({ className, children }) {
  return (
    <div className={`animate-pulse w-full bg-gray-200 ${className}`}>{children}</div>
  );
}

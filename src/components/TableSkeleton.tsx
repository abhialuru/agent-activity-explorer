import React from 'react';

interface TableSkeletonProps {
  rows?: number;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({ rows = 10 }) => {
  return (
    <div className="w-full divide-y divide-zinc-100" role="status" aria-label="Loading events">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center px-4 py-2.5 gap-4 animate-pulse bg-white text-xs select-none"
        >
          {/* Checkbox placeholder */}
          <div className="w-4 h-4 rounded bg-zinc-100 shrink-0" />

          {/* Timestamp */}
          <div className="w-36 shrink-0">
            <div className="h-3.5 bg-zinc-100 rounded w-28" />
          </div>

          {/* Agent */}
          <div className="w-36 shrink-0">
            <div className="h-3.5 bg-zinc-100 rounded w-24" />
          </div>

          {/* Tool */}
          <div className="flex-1 min-w-[140px]">
            <div className="h-4 bg-zinc-100 rounded-md w-32" />
          </div>

          {/* Status */}
          <div className="w-24 shrink-0">
            <div className="h-4 bg-zinc-100 rounded-full w-14" />
          </div>

          {/* Latency */}
          <div className="w-20 shrink-0 text-right">
            <div className="h-3.5 bg-zinc-100 rounded w-12 ml-auto" />
          </div>
        </div>
      ))}
    </div>
  );
};

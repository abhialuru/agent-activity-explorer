import React from "react";
interface DashboardHeaderProps {
  totalEvents?: number;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  totalEvents,
}) => {
  return (
    <header className="border-b border-zinc-200/80 bg-white px-6 py-4">
      {/* Top breadcrumb + State demo switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-600">
          <span className="hover:text-zinc-700 transition-colors cursor-pointer">
            Explorer
          </span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-900 font-semibold">Activity</span>
        </div>
      </div>

      {/* Main title and controls row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="mt-5">
          <div className="flex items-center gap-2.5">
            <h1 className="text-lg font-semibold text-zinc-900 tracking-tight">
              Agent Activity
            </h1>
            {/* Compact visual indicator for dataset count */}
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono bg-zinc-100/90 text-zinc-700 border border-zinc-200">
              {totalEvents.toLocaleString()} events
            </span>
          </div>
          <p className="text-xs text-zinc-600 mt-0.5">
            Inspect agent runs, tool calls, and execution outcomes.
          </p>
        </div>
      </div>
    </header>
  );
};

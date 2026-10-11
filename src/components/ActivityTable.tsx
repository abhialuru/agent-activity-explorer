import React from "react";
import type { ActivityEvent } from "../types/activity";
import { StatusBadge } from "./StatusBadge";
import {
  IconChevronLeft,
  IconChevronRight,
  IconBot,
  IconTerminal,
} from "./icons/Icons";

interface ActivityTableProps {
  events: ActivityEvent[];
  selectedEventId: string | null;
  onSelectEvent: (event: ActivityEvent) => void;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export const ActivityTable: React.FC<ActivityTableProps> = ({
  events,
  selectedEventId,
  onSelectEvent,
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
}) => {
  // Format ISO timestamp to compact time "HH:mm:ss.SSS"
  const formatTime = (isoString: string) => {
    try {
      const d = new Date(isoString);
      const hours = String(d.getUTCHours()).padStart(2, "0");
      const mins = String(d.getUTCMinutes()).padStart(2, "0");
      const secs = String(d.getUTCSeconds()).padStart(2, "0");
      const ms = String(d.getUTCMilliseconds()).padStart(3, "0");
      return `${hours}:${mins}:${secs}.${ms}`;
    } catch {
      return isoString;
    }
  };

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(startIndex + events.length - 1, totalCount);

  return (
    <div className="flex-1 flex flex-col justify-between overflow-hidden bg-white">
      {/* Scrollable table container */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-zinc-200/90 bg-zinc-50/75 text-zinc-600 font-mono text-[11px] uppercase tracking-wider select-none sticky top-0 z-10">
              <th className="py-2.5 pl-6 pr-3 w-10 font-medium">
                <input
                  type="checkbox"
                  aria-label="Select all events"
                  className="rounded border-zinc-300 text-zinc-900 focus:ring-0 cursor-pointer"
                />
              </th>
              <th className="py-2.5 px-3 font-medium min-w-[130px]">
                Timestamp
              </th>
              <th className="py-2.5 px-3 font-medium min-w-[150px]">Agent</th>
              <th className="py-2.5 px-3 font-medium min-w-[170px]">Tool</th>
              <th className="py-2.5 px-3 font-medium min-w-[110px]">Status</th>
              <th className="py-2.5 pl-3 pr-6 font-medium text-right min-w-[100px]">
                Latency
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {events.map((event) => {
              const isSelected = event.id === selectedEventId;

              return (
                <tr
                  key={event.id}
                  onClick={() => onSelectEvent(event)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelectEvent(event);
                    }
                  }}
                  className={`group transition-colors cursor-pointer focus:outline-none ${
                    isSelected
                      ? "bg-zinc-100/80 ring-1 ring-inset ring-zinc-300"
                      : "hover:bg-zinc-50/80 focus:bg-zinc-50"
                  }`}
                >
                  {/* Checkbox */}
                  <td
                    className="py-2.5 pl-6 pr-3 align-middle"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onSelectEvent(event)}
                      aria-label={`Select event ${event.id}`}
                      className="rounded border-zinc-300 text-zinc-900 focus:ring-0 cursor-pointer"
                    />
                  </td>

                  {/* Timestamp */}
                  <td className="py-2.5 px-3 align-middle font-mono text-zinc-600 tracking-tight whitespace-nowrap">
                    <span title={event.timestamp}>
                      {formatTime(event.timestamp)}
                    </span>
                  </td>

                  {/* Agent */}
                  <td className="py-2.5 px-3 align-middle whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <IconBot className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                      <span className="font-mono text-zinc-900 font-medium tracking-tight">
                        {event.agent}
                      </span>
                    </div>
                  </td>

                  {/* Tool */}
                  <td className="py-2.5 px-3 align-middle whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <IconTerminal className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                      <span className="font-mono text-zinc-700 bg-zinc-100/90 border border-zinc-200/80 px-1.5 py-0.5 rounded text-[11px]">
                        {event.tool}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-2.5 px-3 align-middle whitespace-nowrap">
                    <StatusBadge status={event.status} />
                  </td>

                  {/* Latency */}
                  <td className="py-2.5 pl-3 pr-6 align-middle text-right font-mono text-zinc-600 whitespace-nowrap">
                    <span
                      className={`inline-block ${
                        event.latencyMs > 2000
                          ? "text-amber-600 font-medium"
                          : event.latencyMs > 4000
                            ? "text-rose-600 font-medium"
                            : "text-zinc-600"
                      }`}
                    >
                      {event.latencyMs.toLocaleString()} ms
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Pagination & Range Footer */}
      <div className="border-t border-zinc-200/80 bg-zinc-50/60 px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs select-none">
        <div className="text-zinc-600 font-mono text-[11px]">
          Showing{" "}
          <span className="font-semibold text-zinc-800">{startIndex}</span>–
          <span className="font-semibold text-zinc-800">{endIndex}</span> of{" "}
          <span className="font-semibold text-zinc-800">
            {totalCount.toLocaleString()}
          </span>{" "}
          events
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-zinc-600 font-mono">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => onPageChange(currentPage - 1)}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-zinc-700 bg-white border border-zinc-200 rounded hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-xs"
            >
              <IconChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-zinc-700 bg-white border border-zinc-200 rounded hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-xs"
            >
              <span>Next</span>
              <IconChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

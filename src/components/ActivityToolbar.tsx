import React from "react";
import { IconSearch, IconX, IconChevronDown } from "./icons/Icons";
import type { ActivityFilters } from "../types/activity";

interface ActivityToolbarProps {
  filters: ActivityFilters;
  onFilterChange: (filters: ActivityFilters) => void;
  onClearFilters: () => void;
  agents: string[];
  totalResults: number;
}

export const ActivityToolbar: React.FC<ActivityToolbarProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  agents,
  totalResults,
}) => {
  const hasActiveFilters = Boolean(
    filters.query || filters.agent || filters.status,
  );

  const statuses = [
    { value: "", label: "All Statuses" },
    { value: "ok", label: "Success (ok)" },
    { value: "error", label: "Error" },
    { value: "blocked", label: "Blocked" },
  ];

  return (
    <div className="bg-white border-b border-zinc-200/80 px-6 py-3 space-y-2.5">
      {/* Primary Toolbar Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        {/* Search input with icon */}
        <div className="relative flex-1 min-w-[240px]">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-zinc-600">
            <IconSearch className="w-3.5 h-3.5" />
          </div>
          <input
            type="text"
            value={filters.query}
            onChange={(e) =>
              onFilterChange({ ...filters, query: e.target.value })
            }
            placeholder="Search events, agents, tools..."
            className="w-full pl-8 pr-8 py-1.5 text-xs text-zinc-900 placeholder:text-zinc-600 bg-zinc-50/60 hover:bg-zinc-50 focus:bg-white border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-colors"
          />
          {filters.query && (
            <button
              type="button"
              onClick={() => onFilterChange({ ...filters, query: "" })}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-zinc-600 hover:text-zinc-600 cursor-pointer"
            >
              <IconX className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filters Group */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {/* Agent Dropdown */}
          <div className="relative">
            <select
              value={filters.agent}
              onChange={(e) =>
                onFilterChange({ ...filters, agent: e.target.value })
              }
              className="appearance-none pl-2.5 pr-7 py-1.5 text-xs text-zinc-700 bg-white hover:bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none cursor-pointer transition-colors font-sans"
            >
              <option value="">All Agents</option>
              {agents.map((agent) => (
                <option key={agent} value={agent}>
                  {agent}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-600">
              <IconChevronDown className="w-3 h-3" />
            </div>
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <select
              value={filters.status}
              onChange={(e) =>
                onFilterChange({ ...filters, status: e.target.value })
              }
              className="appearance-none pl-2.5 pr-7 py-1.5 text-xs text-zinc-700 bg-white hover:bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-900 cursor-pointer transition-colors font-sans"
            >
              {statuses.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-600">
              <IconChevronDown className="w-3 h-3" />
            </div>
          </div>

          {/* Clear filters action */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors cursor-pointer shrink-0"
            >
              <IconX className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter chips & count bar */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-zinc-100 text-[11px]">
          <span className="text-zinc-600 font-medium">Active:</span>

          {filters.query && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 border border-zinc-200 font-mono">
              q: "{filters.query}"
              <button
                type="button"
                onClick={() => onFilterChange({ ...filters, query: "" })}
                className="hover:text-zinc-900 cursor-pointer"
              >
                <IconX className="w-2.5 h-2.5" />
              </button>
            </span>
          )}

          {filters.agent && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 border border-zinc-200 font-mono">
              agent: {filters.agent}
              <button
                type="button"
                onClick={() => onFilterChange({ ...filters, agent: "" })}
                className="hover:text-zinc-900 cursor-pointer"
              >
                <IconX className="w-2.5 h-2.5" />
              </button>
            </span>
          )}

          {filters.status && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 border border-zinc-200 font-mono">
              status: {filters.status}
              <button
                type="button"
                onClick={() => onFilterChange({ ...filters, status: "" })}
                className="hover:text-zinc-900 cursor-pointer"
              >
                <IconX className="w-2.5 h-2.5" />
              </button>
            </span>
          )}

          <span className="text-zinc-600 ml-auto font-mono">
            {totalResults} matched
          </span>
        </div>
      )}
    </div>
  );
};

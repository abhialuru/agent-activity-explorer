import React from 'react';
import { IconSearch } from './icons/Icons';

interface EmptyStateProps {
  onClearFilters?: () => void;
  title?: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onClearFilters,
  title = "No activity events found",
  description = "No logs match your current query or filter criteria. Try broadening your search or resetting active filters."
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white">
      <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200/80 flex items-center justify-center text-zinc-500 mb-3 shadow-xs">
        <IconSearch className="w-5 h-5" />
      </div>
      <h3 className="text-sm font-semibold text-zinc-900 tracking-tight mb-1">
        {title}
      </h3>
      <p className="text-xs text-zinc-500 max-w-sm mb-4 leading-relaxed">
        {description}
      </p>
      {onClearFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-800 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-md transition-colors shadow-xs focus:outline-none focus:ring-2 focus:ring-zinc-400 cursor-pointer"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
};

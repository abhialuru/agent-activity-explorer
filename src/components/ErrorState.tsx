import React from 'react';
import { IconAlertCircle, IconRefresh } from './icons/Icons';

interface ErrorStateProps {
  onRetry?: () => void;
  message?: string;
  code?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  onRetry,
  message = "Failed to load activity logs from service endpoint",
  code = "ERR_UPSTREAM_TIMEOUT (504)"
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white">
      <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-600 mb-3 shadow-xs">
        <IconAlertCircle className="w-5 h-5" />
      </div>
      <h3 className="text-sm font-semibold text-zinc-900 tracking-tight mb-1">
        Unable to load agent activity
      </h3>
      <p className="text-xs text-zinc-500 max-w-md mb-2 leading-relaxed">
        {message}
      </p>
      {code && (
        <span className="font-mono text-[11px] text-zinc-400 bg-zinc-100/80 px-2 py-0.5 rounded border border-zinc-200 mb-4 select-all">
          {code}
        </span>
      )}
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-800 bg-white hover:bg-zinc-50 border border-zinc-200 rounded-md transition-colors shadow-xs focus:outline-none focus:ring-2 focus:ring-zinc-400 cursor-pointer"
        >
          <IconRefresh className="w-3.5 h-3.5 text-zinc-500" />
          <span>Retry connection</span>
        </button>
      )}
    </div>
  );
};

import React, { useState, useEffect } from "react";
import type { ActivityEvent } from "../types/activity";
import { StatusBadge } from "./StatusBadge";
import {
  IconX,
  IconCopy,
  IconCheck,
  IconShield,
  IconTerminal,
  IconBot,
  IconClock,
  IconAlertCircle,
} from "./icons/Icons";

interface EventDetailsDrawerProps {
  event: ActivityEvent | null;
  onClose: () => void;
}

export const EventDetailsDrawer: React.FC<EventDetailsDrawerProps> = ({
  event,
  onClose,
}) => {
  const [copiedId, setCopiedId] = useState(false);
  const [copiedArgs, setCopiedArgs] = useState(false);
  const [copiedResult, setCopiedResult] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!event) return null;

  const copyToClipboard = (text: string, type: "id" | "args" | "result") => {
    navigator.clipboard.writeText(text);
    if (type === "id") {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 1800);
    } else if (type === "args") {
      setCopiedArgs(true);
      setTimeout(() => setCopiedArgs(false), 1800);
    } else if (type === "result") {
      setCopiedResult(true);
      setTimeout(() => setCopiedResult(false), 1800);
    }
  };

  const formattedArgs = JSON.stringify(event.args, null, 2);
  const formattedResult = event.result
    ? JSON.stringify(event.result, null, 2)
    : null;

  return (
    <>
      {/* Backdrop on mobile/tablet screens */}
      <div
        className="fixed inset-0 bg-zinc-900/20 backdrop-blur-xs z-30 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className="fixed inset-y-0 right-0 z-40 lg:z-10 lg:static lg:h-full w-full sm:w-[480px] lg:w-[480px] xl:w-[540px] shrink-0 bg-white border-l border-zinc-200/90 shadow-xl lg:shadow-none flex flex-col animate-in slide-in-from-right duration-200"
        aria-labelledby="drawer-title"
        role="dialog"
        aria-modal="true"
      >
        {/* Drawer Header */}
        <div className="h-14 px-6 border-b border-zinc-200/80 flex items-center justify-between bg-zinc-50/50">
          <div className="flex items-center gap-3 min-w-0">
            <StatusBadge status={event.status} size="md" />
            <div className="flex items-center gap-1.5 min-w-0">
              <span
                id="drawer-title"
                className="font-mono text-xs font-semibold text-zinc-900 truncate"
                title={event.id}
              >
                {event.id}
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(event.id, "id")}
                className="text-zinc-600 hover:text-zinc-900 p-1 rounded hover:bg-zinc-200/60 transition-colors cursor-pointer"
                title="Copy event ID"
                aria-label="Copy event ID"
              >
                {copiedId ? (
                  <IconCheck className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <IconCopy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Close Button + ESC indicator */}
          <div className="flex items-center gap-2">
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-zinc-600 bg-zinc-100 border border-zinc-200 rounded">
              ESC
            </kbd>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors cursor-pointer"
              aria-label="Close drawer"
            >
              <IconX className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Drawer Body - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 text-xs">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-lg bg-zinc-50 border border-zinc-200/70">
            <div>
              <div className="text-[11px] text-zinc-600 font-medium mb-1">
                Agent
              </div>
              <div className="flex items-center gap-1.5 font-mono text-zinc-900 font-medium truncate">
                <IconBot className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                <span>{event.agent}</span>
              </div>
            </div>

            <div>
              <div className="text-[11px] text-zinc-600 font-medium mb-1">
                Tool
              </div>
              <div className="flex items-center gap-1.5 font-mono text-zinc-900 font-medium truncate">
                <IconTerminal className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                <span>{event.tool}</span>
              </div>
            </div>

            <div>
              <div className="text-[11px] text-zinc-600 font-medium mb-1">
                Timestamp
              </div>
              <div className="flex items-center gap-1.5 font-mono text-zinc-700">
                <IconClock className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                <span className="truncate">{event.timestamp}</span>
              </div>
            </div>

            <div>
              <div className="text-[11px] text-zinc-600 font-medium mb-1">
                Execution Latency
              </div>
              <div className="font-mono text-zinc-900 font-semibold">
                {event.latencyMs.toLocaleString()} ms
              </div>
            </div>

            {event.initiator && (
              <div className="col-span-2 pt-2 border-t border-zinc-200/60 flex items-center justify-between text-[11px]">
                <span className="text-zinc-600">Trigger / Initiator</span>
                <span className="font-mono text-zinc-800">
                  {event.initiator}
                </span>
              </div>
            )}

            {event.tokens && (
              <div className="col-span-2 flex items-center justify-between text-[11px] text-zinc-600 font-mono">
                <span>Token usage</span>
                <span>
                  {event.tokens.prompt} prompt • {event.tokens.completion}{" "}
                  completion ({event.tokens.total} total)
                </span>
              </div>
            )}
          </div>

          {/* Policy Matches Section */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <IconShield className="w-3.5 h-3.5 text-zinc-600" />
              <span className="text-xs font-semibold text-zinc-900 uppercase tracking-wider font-mono">
                Policy Matches ({event.policyMatches.length})
              </span>
            </div>
            {event.policyMatches.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {event.policyMatches.map((policy) => (
                  <span
                    key={policy}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-100 text-zinc-800 border border-zinc-200 font-mono text-[11px]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                    {policy}
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-xs text-zinc-600 italic">
                No security or guardrail policies triggered.
              </div>
            )}
          </div>

          {/* Arguments Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-zinc-900 uppercase tracking-wider font-mono">
                  Arguments Payload
                </span>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(formattedArgs, "args")}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 border border-zinc-200 transition-colors cursor-pointer"
              >
                {copiedArgs ? (
                  <>
                    <IconCheck className="w-3 h-3 text-emerald-600" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <IconCopy className="w-3 h-3" />
                    <span>Copy JSON</span>
                  </>
                )}
              </button>
            </div>
            <div className="rounded-md border border-zinc-200 bg-zinc-900 text-zinc-100 p-3.5 overflow-x-auto shadow-inner">
              <pre className="font-mono text-[11px] leading-relaxed">
                <code>{formattedArgs}</code>
              </pre>
            </div>
          </div>

          {/* Result Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-zinc-900 uppercase tracking-wider font-mono">
                  Execution Result
                </span>
              </div>
              {formattedResult && (
                <button
                  type="button"
                  onClick={() => copyToClipboard(formattedResult, "result")}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 border border-zinc-200 transition-colors cursor-pointer"
                >
                  {copiedResult ? (
                    <>
                      <IconCheck className="w-3 h-3 text-emerald-600" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <IconCopy className="w-3 h-3" />
                      <span>Copy JSON</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {event.error && (
              <div className="p-3 mb-3 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                <IconAlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <span className="font-semibold block mb-0.5">
                    Execution Failed
                  </span>
                  <p className="font-mono text-[11px] text-rose-700 leading-snug">
                    {event.error}
                  </p>
                </div>
              </div>
            )}

            {event.status === "running" && !event.result ? (
              <div className="p-4 rounded-md border border-amber-200/80 bg-amber-50/50 text-amber-900 flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
                </span>
                <div>
                  <span className="font-medium text-xs block">
                    Event actively executing
                  </span>
                  <span className="text-[11px] text-amber-700">
                    Waiting for tool process termination signal...
                  </span>
                </div>
              </div>
            ) : formattedResult ? (
              <div className="rounded-md border border-zinc-200 bg-zinc-900 text-zinc-100 p-3.5 overflow-x-auto shadow-inner">
                <pre className="font-mono text-[11px] leading-relaxed">
                  <code>{formattedResult}</code>
                </pre>
              </div>
            ) : (
              <div className="p-3.5 rounded-md border border-zinc-200 bg-zinc-50 text-zinc-600 text-xs italic">
                No result payload returned.
              </div>
            )}
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="px-6 py-3 border-t border-zinc-200/80 bg-zinc-50/50 flex items-center justify-between text-xs text-zinc-600">
          <span className="font-mono text-[11px]">Event Inspector</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 font-medium text-xs text-zinc-700 hover:text-zinc-900 bg-white hover:bg-zinc-50 border border-zinc-200 rounded transition-colors cursor-pointer shadow-xs"
          >
            Done
          </button>
        </div>
      </aside>
    </>
  );
};

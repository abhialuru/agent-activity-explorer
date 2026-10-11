import React from "react";
import type { ActivityStatus } from "../types/activity";

interface StatusBadgeProps {
  status: ActivityStatus;
  size?: "sm" | "md";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = "sm",
}) => {
  const normalized = status === "success" ? "ok" : status;

  const config = {
    ok: {
      label: "Success",
      code: "ok",
      bg: "bg-emerald-500/10 text-emerald-700 border-emerald-600/20",
      dot: "bg-emerald-500",
      pulse: false,
    },
    running: {
      label: "Running",
      code: "running",
      bg: "bg-amber-500/10 text-amber-700 border-amber-600/20",
      dot: "bg-amber-500",
      pulse: true,
    },
    error: {
      label: "Error",
      code: "error",
      bg: "bg-rose-500/10 text-rose-700 border-rose-600/20",
      dot: "bg-rose-500",
      pulse: false,
    },
    blocked: {
      label: "Blocked",
      code: "blocked",
      bg: "bg-purple-500/10 text-purple-700 border-purple-600/20",
      dot: "bg-purple-500",
      pulse: false,
    },
  }[normalized] || {
    label: normalized,
    code: normalized,
    bg: "bg-zinc-100 text-zinc-700 border-zinc-200",
    dot: "bg-zinc-400",
    pulse: false,
  };

  const sizeClasses =
    size === "md" ? "px-2.5 py-1 text-xs" : "px-2 py-0.5 text-[11px]";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border transition-colors select-none font-mono ${config.bg} ${sizeClasses}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        {config.pulse && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.dot}`}
          />
        )}
        <span
          className={`relative inline-flex rounded-full h-1.5 w-1.5 ${config.dot}`}
        />
      </span>
      <span>{config.code}</span>
    </span>
  );
};

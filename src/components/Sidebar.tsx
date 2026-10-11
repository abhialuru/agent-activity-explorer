import React from "react";
import {
  IconActivity,
  IconLayers,
  IconBot,
  IconShield,
  IconSettings,
  IconPanelRightClose,
} from "./icons/Icons";

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
}) => {
  const navItems = [
    {
      id: "activity",
      label: "Activity",
      icon: IconActivity,
      active: true,
      badge: "50k",
    },
    { id: "overview", label: "Overview", icon: IconLayers, active: false },
    { id: "agents", label: "Agents", icon: IconBot, active: false },
    { id: "policies", label: "Policies", icon: IconShield, active: false },
    { id: "settings", label: "Settings", icon: IconSettings, active: false },
  ];

  return (
    <aside
      className={`h-screen border-r border-zinc-200/80 bg-white flex flex-col justify-between transition-all duration-200 z-30 shrink-0 select-none ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Top Branding */}
      <div>
        <div className="h-14 px-4 flex items-center justify-between border-b border-zinc-100">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-7 h-7 rounded-md bg-zinc-900 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-xs">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-zinc-900 tracking-tight truncate leading-tight">
                  Agent Activity
                </span>
                <span className="text-[10px] text-zinc-600 font-mono tracking-wider uppercase">
                  Explorer
                </span>
              </div>
            )}
          </div>
          {!collapsed && (
            <button
              onClick={onToggleCollapse}
              title="Collapse sidebar"
              className="p-1 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors cursor-pointer"
              aria-label="Collapse sidebar"
            >
              <IconPanelRightClose className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="p-2 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 text-xs rounded-md transition-colors text-left cursor-pointer group ${
                  item.active
                    ? "bg-zinc-100/90 text-zinc-900 font-medium"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 font-normal"
                } ${collapsed ? "justify-center px-0" : ""}`}
                title={collapsed ? item.label : undefined}
              >
                <Icon
                  className={`shrink-0 transition-colors ${
                    item.active
                      ? "text-zinc-900"
                      : "text-zinc-600 group-hover:text-zinc-900"
                  }`}
                  size={15}
                />
                {!collapsed && (
                  <>
                    <span className="truncate flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-zinc-200/70 text-zinc-800">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom status and collapse control */}
      <div className="p-2 border-t border-zinc-100">
        {collapsed && (
          <button
            onClick={onToggleCollapse}
            title="Expand sidebar"
            className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors cursor-pointer"
            aria-label="Expand sidebar"
          >
            <IconPanelRightClose className="w-4 h-4 rotate-180" />
          </button>
        )}
      </div>
    </aside>
  );
};

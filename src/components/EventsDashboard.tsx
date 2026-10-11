import React, { useState, useCallback, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { DashboardHeader } from "./DashboardHeader";
import { ActivityToolbar } from "./ActivityToolbar";
import { ActivityTable } from "./ActivityTable";
import { EventDetailsDrawer } from "./EventDetailsDrawer";
import { TableSkeleton } from "./TableSkeleton";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import type {
  EventsResponse,
  ActivityEvent,
  ActivityFilters,
  ViewState,
} from "../types/activity";

export const EventsDashboard: React.FC = () => {
  // Sidebar state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Filter state
  const [filters, setFilters] = useState<ActivityFilters>({
    query: "",
    agent: "",
    status: "",
  });

  // Selected event for detail drawer
  const [selectedEvent, setSelectedEvent] = useState<ActivityEvent | null>(
    null,
  );

  // Live mode presentation toggle
  const [liveMode, setLiveMode] = useState(false);

  // View state demo toggle (Ready / Loading / Empty / Error)
  const [viewState, setViewState] = useState<ViewState>("ready");

  // Refresh spinner state
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter events client-side based on toolbar controls

  const [events, setEvents] = useState<ActivityEvent[]>([]);
  const [agents, setAgents] = useState<string[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [totalEvents, setTotalEvents] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageCursors, setPageCursors] = useState<Array<string | null>>([null]);

  const cursorForPage = pageCursors[currentPage - 1] ?? null;

  const [refreshKey, setRefreshKey] = useState(0);

  const pageSize = 15;

  useEffect(() => {
    const controller = new AbortController();

    async function fetchEvents() {
      setIsLoading(true);
      setApiError(null);

      try {
        const params = new URLSearchParams();

        params.set("limit", String(pageSize));

        if (filters.query.trim()) {
          params.set("q", filters.query.trim());
        }

        if (filters.agent) {
          params.set("agent", filters.agent);
        }

        if (filters.status) {
          params.set("status", filters.status);
        }

        if (cursorForPage) {
          params.set("cursor", cursorForPage);
        }

        const response = await fetch(
          `http://localhost:4000/events?${params.toString()}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data: EventsResponse = await response.json();

        setEvents(data.items);
        setNextCursor(data.nextCursor);
        setTotalEvents(data.total);
        setViewState(data.items.length === 0 ? "empty" : "ready");
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setApiError(
          error instanceof Error ? error.message : "Unable to load events.",
        );
        setViewState("error");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchEvents();

    return () => controller.abort();
  }, [
    filters.query,
    filters.agent,
    filters.status,
    cursorForPage,
    pageSize,
    refreshKey,
  ]);

  const handleClearFilters = useCallback(() => {
    setFilters({
      query: "",
      agent: "",
      status: "",
    });

    setCurrentPage(1);
    setPageCursors([null]);
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshKey((value) => value + 1);
  }, []);

  const handleSelectEvent = useCallback((event: ActivityEvent) => {
    setSelectedEvent((prev) => (prev?.id === event.id ? null : event));
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("http://localhost:4000/events");

        if (!response.ok) {
          throw new Error("Failed to load agents");
        }

        const data = await response.json();
        setEvents(data.items);
        setNextCursor(data.nextCursor);
        setTotalEvents(data.total);
        console.log(data);
      } catch (error) {
        console.log("Could not load agents:", error);
      }
    }
    fetchEvents();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchAgents() {
      try {
        const response = await fetch("http://localhost:4000/agents", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();

        console.log("Agents response:", data);

        setAgents(data);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        console.error("Could not load agents:", error);
      }
    }

    fetchAgents();

    return () => controller.abort();
  }, []);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page === currentPage - 1 && currentPage > 1) {
        setCurrentPage(page);
        return;
      }

      if (page === currentPage + 1 && nextCursor) {
        setPageCursors((previous) => [
          ...previous.slice(0, currentPage),
          nextCursor,
        ]);

        setCurrentPage(page);
      }
    },
    [currentPage, nextCursor],
  );

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#fafafa] text-zinc-900 font-sans">
      {/* 1. Slim Left Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        {/* 2. Main Dashboard Header */}
        <DashboardHeader totalEvents={totalEvents} />

        {/* 3. Search and Filters Toolbar */}
        <ActivityToolbar
          filters={filters}
          onFilterChange={(newFilters) => {
            setFilters(newFilters);
            setCurrentPage(1);
            setPageCursors([null]);
          }}
          onClearFilters={handleClearFilters}
          agents={agents}
          totalResults={totalEvents}
        />

        {/* 4. Activity Content / Table Area & Side-by-Side Drawer */}
        <main className="flex-1 flex flex-row min-h-0 relative overflow-hidden bg-white">
          <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden">
            {isLoading ? (
              <TableSkeleton rows={12} />
            ) : apiError ? (
              <ErrorState onRetry={handleRefresh} />
            ) : events.length === 0 ? (
              <EmptyState
                onClearFilters={handleClearFilters}
                title="No matching events found"
                description="Try adjusting or clearing your filters."
              />
            ) : (
              <ActivityTable
                events={events}
                selectedEventId={selectedEvent?.id ?? null}
                onSelectEvent={handleSelectEvent}
                currentPage={currentPage}
                totalPages={Math.max(1, Math.ceil(totalEvents / pageSize))}
                totalCount={totalEvents}
                pageSize={pageSize}
                onPageChange={handlePageChange}
              />
            )}
          </div>

          {/* 5. Event Details Drawer */}
          <EventDetailsDrawer
            event={selectedEvent}
            onClose={handleCloseDrawer}
          />
        </main>
      </div>
    </div>
  );
};

export default EventsDashboard;

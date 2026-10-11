export type ActivityStatus = "ok" | "error" | "running" | "blocked" | "success";

export interface EventsResponse {
  items: ActivityEvent[];
  nextCursor: string | null;
  total: number;
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  agent: string;
  tool: string;
  status: ActivityStatus;
  latencyMs: number;
  argsPreview?: string;
  args: Record<string, unknown>;
  result: Record<string, unknown> | string | null;
  policyMatches: string[];
  error?: string;
  initiator?: string;
  tokens?: {
    prompt: number;
    completion: number;
    total: number;
  };
}

export interface ActivityFilters {
  query: string;
  agent: string;
  status: string;
}

export type ViewState = "ready" | "loading" | "empty" | "error";

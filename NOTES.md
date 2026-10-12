# Implementation Notes

## Part A — Agent Activity Explorer

### Features implemented

- Built a React + TypeScript dashboard using Vite.
- Integrated the events API and agents API.
- Implemented event listing with timestamp, agent, tool, status, and latency.
- Implemented free-text search and agent/status filters.
- Synchronized search and filters with URL query parameters.
- Implemented cursor-based pagination with Next/Previous navigation.
- Built an event details drawer that fetches the selected event.
- Supported direct event links through the `eventId` URL parameter.
- Supported browser Back/Forward navigation for event details.
- Added loading, empty, and error states.
- Built a responsive dashboard interface.

### Implementation decisions

- Chose React with Vite and TypeScript for a component-based UI and a lightweight development setup.
- Used the native Fetch API for HTTP requests.
- Used URL query parameters and the browser History API to synchronize filters and event details with navigation.
- Used `AbortController` to cancel obsolete requests where applicable.
- Organized the interface into reusable components.

### Trade-offs and limitations

- Pagination uses cursor-based navigation, with previously visited cursors maintained in component state.
- Pagination position is not currently persisted in the URL.

### AI usage

- Used Antigravity IDE's AI extensively to generate the initial dashboard UI, then iteratively refined the design, fixed UI bugs, and adapted the generated interface to the assignment's data and requirements.
- Used ChatGPT and Claude to understand the assignment, discuss implementation approaches, troubleshoot issues, and clarify technical concepts during development.
- Prioritized connecting the APIs to the dashboard and making the UI work with the actual data, reviewing and testing changes along the way.

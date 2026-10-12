# Agent Activity Explorer

A React + TypeScript dashboard for exploring agent activity events, with search, filters, cursor-based pagination, and event details.

The repository also includes a standalone Performance Clinic with browser performance optimizations.

## Features

- Event activity table with timestamps, agents, tools, status, and latency
- Search and filter events by query, agent, and status
- URL-synchronized filters and linkable event details
- Cursor-based pagination
- Loading, empty, and error states
- Performance improvements to the standalone Performance Clinic

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Native Fetch API
- HTML, CSS, and JavaScript for the Performance Clinic

## Getting Started

### Requirements

- Node.js and npm

### Installation

```bash
git clone <your-public-repository-url>
cd agent-activity-explorer
npm install
```

### Run the mock API

```bash
npm run api
```

### Run the dashboard

In a separate terminal, run the dashboard's development command from the `app/` directory.

```bash
cd app
npm install
npm run dev
```

Open the local URL printed by Vite.

### Run the Performance Clinic

From the repository root, run:

```bash
npm run perf-clinic
```

Open http://localhost:5174.

## Documentation

- `NOTES.md` — Implementation decisions, tradeoffs, limitations, and AI usage.
- `PERF.md` — Performance issues identified, fixes applied, and before/after measurements.

## License

Created as part of a frontend engineering take-home assignment.

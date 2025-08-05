# playwright-mcp-server

**Playwright MCP Server for browser automation**

## Overview

This project implements a Model Context Protocol (MCP) server using Playwright for browser automation. It provides an example MCP server and client integration, supporting prompt templates, resource listing, and tool calls.

## Features

- MCP server implementation using `@modelcontextprotocol/sdk`
- Playwright-based browser automation
- Example prompt and resource handlers
- Automated tests with Playwright and Jest
- TypeScript support

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```powershell
npm install
npm run install-browsers
```

### Running the Server

```powershell
npm start
```

### Running Tests

```powershell
npm test
```

Or to run Playwright UI tests:

```powershell
npm run test:ui
```

### Project Structure

- `src/index.ts`: MCP server implementation
- `tests/automation.test.ts`: Playwright and MCP client integration tests
- `package.json`: Project metadata and scripts
- `tsconfig.json`: TypeScript configuration
- `test.config.js`: Jest configuration

### Example Usage

The server exposes prompt templates and resources via MCP. The client can connect and interact with the server, as shown in the integration tests.

---

import { test, expect } from '@playwright/test';

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

test('basic navigation test', async ({ page }) => {
  await page.goto('https://example.com');
  const title = await page.title();
  expect(title).toBe('Example Domain');
});

test('MCP client integration', async () => {
  const transport = new StdioClientTransport({
    command: "node",
    args: ["--no-warnings", "--loader", "ts-node/esm", "src/index.ts"]
  });

  const client = new Client({
    name: "example-client",
    version: "1.0.0"
  });

  await client.connect(transport);

  // List prompts
  const prompts = await client.listPrompts();
  expect(prompts).toBeDefined();

  // Get a prompt
  const prompt = await client.getPrompt({
    name: "example-prompt",
    arguments: {
      arg1: "value"
    }
  });
  expect(prompt).toBeDefined();

  // List resources
  const resources = await client.listResources();
  expect(resources).toBeDefined();

  // Read a resource
  const resource = await client.readResource({
    uri: "file:///example.txt"
  });
  expect(resource).toBeDefined();

  // Call a tool
  const result = await client.callTool({
    name: "example-tool",
    arguments: {
      arg1: "value"
    }
  });
  expect(result).toBeDefined();
});
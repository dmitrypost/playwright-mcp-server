import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  CallToolRequestSchema
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "example-server",
    version: "1.0.0"
  },
  {
    capabilities: {
      prompts: {},
      resources: {},
      tools: {} // Add this line to declare tool support
    }
  }
);

server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [{
      name: "example-prompt",
      description: "An example prompt template",
      arguments: [{
        name: "arg1",
        description: "Example argument",
        required: true
      }]
    }]
  };
});

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  if (request.params.name !== "example-prompt") {
    throw new Error("Unknown prompt");
  }
  console.log("GetPromptRequestSchema", request);
  return {
    description: "Example prompt",
    messages: [{
      role: "user",
      content: {
        type: "text",
        text: "Example prompt text"
      }
    }]
  };
});

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  // Return a list of resources
  return { resources: [{ uri: "file:///example.txt", name: "example.txt" }] };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  return {
    contents: [
      {
        uri: request.params.uri,
        blob: Buffer.from("Example content for " + request.params.uri).toString("base64")
      }
    ]
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  // Return a result for the tool call
  return { result: `Tool ${request.params.name} called with arguments: ${JSON.stringify(request.params.arguments)}` };
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.log("Server is running");
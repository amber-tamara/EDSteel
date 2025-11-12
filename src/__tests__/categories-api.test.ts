// src/__tests__/categories-api.test.ts
import { GET } from "@/app/api/categories/route";
import { NextResponse } from "next/server";

// Mock node-fetch to provide Request
const fetch = require("node-fetch");
global.Request = fetch.Request;

// Mock NextResponse properly
global.NextResponse = {
  json: jest.fn((data, options) => ({
    status: options?.status || 200,
    data, // Match your expected result.data access
    json: async () => data, // Ensure .json() works
  })),
};

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: async () => [
      { id: 1, name: "Electricals", parent: 0 },
      { id: 2, name: "Cables", parent: 1 },
    ],
  })
);

describe("GET /api/categories", () => {
  it("returns structured mainCat/subCats data", async () => {
    // Create a mock Request object
    const mockRequest = new Request("http://localhost/api/categories");
    const result = await GET(mockRequest); // Pass mockRequest to GET

    expect(result.data).toEqual([
      { mainCat: "Electricals", subCats: ["Cables"] },
    ]);
  });
});

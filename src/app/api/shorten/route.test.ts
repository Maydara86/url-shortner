import { Mock, beforeEach, describe, expect, it, vi } from "vitest"

import prisma from "@/lib/prisma"

import { POST } from "./route"

vi.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: {
    url: {
      create: vi.fn(),
    },
  },
}))

describe("POST /api/shorten", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should return 400 for invalid URL", async () => {
    const req = new Request("http://localhost:3000", {
      method: "POST",
      body: JSON.stringify({ url: "invalid-url" }),
    })

    const response = await POST(req)
    expect(response.status).toBe(400)
  })

  it("should create a short URL for valid input", async () => {
    const mockData = {
      originalUrl: "https://valid-url.com",
      shortId: "abc123",
    }

    ;(prisma.url.create as Mock).mockResolvedValue(mockData)

    const req = new Request("http://localhost:3000", {
      method: "POST",
      body: JSON.stringify({ url: mockData.originalUrl }),
    })

    const response = await POST(req)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.shortUrl).toContain(mockData.shortId)
    expect(prisma.url.create).toHaveBeenCalledWith({
      data: {
        originalUrl: mockData.originalUrl,
        shortId: expect.any(String),
      },
    })
  })
})

import { NextResponse } from "next/server"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { BASE_URL } from "@/lib/constants"
import prisma from "@/lib/prisma"

import { POST } from "./route"

vi.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: {
    url: {
      findFirst: vi.fn(),
      create: vi.fn(),
    },
  },
}))

describe("POST /api/shorten", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should return 400 for invalid URL", async () => {
    const request = new Request(`${BASE_URL}/api/shorten`, {
      method: "POST",
      body: JSON.stringify({ url: "invalid-url" }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBeDefined()
  })

  it("should return 409 if URL already exists", async () => {
    vi.mocked(prisma.url.findFirst).mockResolvedValueOnce({
      id: "1",
      shortId: "abc123",
      originalUrl: "https://example.com",
      createdAt: new Date(),
    })

    const request = new Request(`${BASE_URL}/api/shorten`, {
      method: "POST",
      body: JSON.stringify({ url: "https://example.com" }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(409)
    expect(data.error).toBe("URL already exists")
  })

  it("should create and return shortened URL", async () => {
    vi.mocked(prisma.url.findFirst).mockResolvedValueOnce(null)
    vi.mocked(prisma.url.create).mockResolvedValueOnce({
      id: "1",
      shortId: "abc123",
      originalUrl: "https://example.com",
      createdAt: new Date(),
    })

    const request = new Request(`${BASE_URL}/api/shorten`, {
      method: "POST",
      body: JSON.stringify({ url: "https://example.com" }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response).toBeInstanceOf(NextResponse)
    expect(data.shortUrl).toBe(`${BASE_URL}/api/shortened/abc123`)
  })

  it("should return 500 on server error", async () => {
    vi.mocked(prisma.url.findFirst).mockRejectedValueOnce(
      new Error("Database error")
    )

    const request = new Request(`${BASE_URL}/api/shorten`, {
      method: "POST",
      body: JSON.stringify({ url: "https://example.com" }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe("Internal server error")
  })
})

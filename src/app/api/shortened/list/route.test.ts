import { nanoid } from "nanoid"
import { NextResponse } from "next/server"
import { Mock, afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { GET } from "@/app/api/shortened/list/route"
import { BASE_URL } from "@/lib/constants"
import prisma from "@/lib/prisma"

vi.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: {
    url: {
      findFirst: vi.fn(),
      create: vi.fn(),
      findMany: vi.fn(),
      count: vi.fn(),
    },
  },
}))

describe("GET /api/shortened/list", () => {
  const mockUrls = Array.from({ length: 20 }, (_, i) => ({
    id: `${i + 1}`,
    shortId: nanoid(6),
    originalUrl: `https://example${i + 1}.com`,
    createdAt: new Date(2023, 0, i + 1),
  }))

  beforeEach(() => {
    vi.mocked(prisma.url.findMany).mockResolvedValue(mockUrls)
    vi.mocked(prisma.url.count).mockResolvedValue(mockUrls.length)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it("should return paginated urls", async () => {
    const request = new Request(`${BASE_URL}/api/shortened/list?page=1`)
    const response = await GET(request)
    const data = await response.json()

    expect(response).toBeInstanceOf(NextResponse)
    expect(data.urls).toHaveLength(20)
    expect(data.pagination).toEqual({
      currentPage: 1,
      totalPages: 4,
      totalItems: 20,
      perPage: 5,
    })
  })

  it("should return second page of urls", async () => {
    const request = new Request(`${BASE_URL}/api/shortened/list?page=2`)
    const response = await GET(request)
    const data = await response.json()

    expect(response).toBeInstanceOf(NextResponse)
    expect(data.urls).toHaveLength(20)
    expect(data.pagination.currentPage).toBe(2)
  })

  it("should return error for invalid page parameter", async () => {
    const request = new Request(`${BASE_URL}/api/shortened/list?page=invalid`)
    const response = await GET(request)
    const data = await response.json()

    expect(response).toBeInstanceOf(NextResponse)
    expect(response.status).toBe(400)
    expect(data.error).toBe("Invalid page number")
  })

  it("should return empty array when page exceeds total pages", async () => {
    vi.mocked(prisma.url.findMany).mockResolvedValue([])
    vi.mocked(prisma.url.count).mockResolvedValue(0)

    const request = new Request(`${BASE_URL}/api/shortened/list?page=999`)
    const response = await GET(request)
    const data = await response.json()

    expect(response).toBeInstanceOf(NextResponse)
    expect(data.urls).toHaveLength(0)
  })

  it("should handle database errors gracefully", async () => {
    ;(prisma.url.findMany as Mock).mockRejectedValue(
      new Error("Database error")
    )

    const request = new Request(`${BASE_URL}/api/shortened/list`)
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe("Internal server error")
  })
})

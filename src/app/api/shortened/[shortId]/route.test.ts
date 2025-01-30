import { Mock, beforeEach, describe, expect, it, vi } from "vitest"

import { BASE_URL } from "@/lib/constants"
import prisma from "@/lib/prisma"

import { GET } from "./route"

vi.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: {
    url: {
      findUnique: vi.fn(),
    },
  },
}))

describe("GET /api/shortened/[shortId]", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should redirect to original URL", async () => {
    const mockUrl = {
      originalUrl: "https://example.com/",
      shortId: "abc123",
    }

    ;(prisma.url.findUnique as Mock).mockResolvedValue(mockUrl)

    const params = { shortId: mockUrl.shortId }
    const response = await GET({} as Request, { params })

    expect(response.status).toBe(307)
    expect(response.headers.get("Location")).toBe(mockUrl.originalUrl)
  })

  it("should return 404 for non-existent shortId", async () => {
    ;(prisma.url.findUnique as Mock).mockResolvedValue(null)

    const params = { shortId: "invalid-id" }
    const response = await GET({} as Request, { params })
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data.error).toBe("Short URL not found")
  })

  it("should return 500 when database query fails", async () => {
    ;(prisma.url.findUnique as Mock).mockRejectedValue(
      new Error("Database error")
    )

    const params = { shortId: "invalid-id" }
    const response = await GET({} as Request, { params })
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe("Internal server error")
  })
})

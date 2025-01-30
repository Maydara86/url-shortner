import { revalidatePath } from "next/cache"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { BASE_URL } from "@/lib/constants"

import { getURLs, shortenURL } from "./urls"

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}))

describe("URL actions", () => {
  const mockFetch = vi.fn()
  global.fetch = mockFetch

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("shortenURL", () => {
    it("should successfully shorten a URL", async () => {
      const formData = new FormData()
      formData.append("url", "https://example.com")

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ shortId: "abc123" }),
      })

      await shortenURL(formData)

      expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/api/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: "https://example.com" }),
      })
      expect(revalidatePath).toHaveBeenCalledWith("/")
    })

    it("should throw error when URL is missing", async () => {
      const formData = new FormData()

      await expect(shortenURL(formData)).rejects.toThrow("URL is required")
    })

    it("should throw error when API returns error", async () => {
      const formData = new FormData()
      formData.append("url", "https://example.com")

      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ error: "API Error" }),
      })

      await expect(shortenURL(formData)).rejects.toThrow("API Error")
    })
  })

  describe("getURLs", () => {
    const mockURLs = [{ originalUrl: "https://example.com", shortId: "abc123" }]
    const mockPagination = {
      currentPage: 1,
      totalPages: 1,
      totalItems: 1,
      perPage: 5,
    }

    it("should fetch URLs successfully", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            urls: mockURLs,
            pagination: mockPagination,
          }),
      })

      const result = await getURLs()

      expect(mockFetch).toHaveBeenCalledWith(
        `${BASE_URL}/api/shortened/list?page=1`,
        { cache: "no-store" }
      )
      expect(result).toEqual({
        urls: mockURLs,
        pagination: mockPagination,
      })
    })

    it("should handle API errors gracefully", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ error: "API Error" }),
      })

      const result = await getURLs()

      expect(result).toEqual({
        urls: [],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalItems: 0,
          perPage: 5,
        },
      })
    })

    it("should handle network errors gracefully", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"))

      const result = await getURLs()

      expect(result).toEqual({
        urls: [],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalItems: 0,
          perPage: 5,
        },
      })
    })
  })
})

import { describe, expect, it } from "vitest"

import { urlSchema } from "./zod"

describe("URL Validation", () => {
  it("should validate correct URLs", () => {
    const validUrls = [
      "https://example.com",
      "http://sub.example.com/path?query=param",
      "1.1.1.1",
      "2606:4700:4700::1111",
    ]
    validUrls.forEach((url) => {
      const result = urlSchema.safeParse({ url })
      expect(result.success, `URL ${url} should be invalid`).toBe(true)
    })
  })

  it("should reject invalid URLs", () => {
    const invalidUrls = [
      "http://not-a-url",
      "ftp://example.com",
      "1.1.1.x",
      "2606:4700:4700::111x",
    ]
    invalidUrls.forEach((url) => {
      const result = urlSchema.safeParse({ url })
      expect(result.success, `URL ${url} should be invalid`).toBe(false)
    })
  })
})

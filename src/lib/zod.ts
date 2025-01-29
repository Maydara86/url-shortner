import { z } from "zod"

export const urlSchema = z.object({
  url: z.union([
    z.string().refine(
      (value) => {
        try {
          const parsed = new URL(value)
          if (parsed.protocol !== "http:" && parsed.protocol !== "https:")
            return false
          return parsed.hostname.includes(".")
        } catch {
          return false
        }
      },
      { message: "Invalid HTTP/HTTPS URL" }
    ),
    z.string().ip("Invalid IP address"),
  ]),
})

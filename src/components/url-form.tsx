"use client"

import { useState } from "react"
import { toast } from "sonner"

import { shortenURL } from "@/actions/urls"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function UrlForm() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    try {
      setLoading(true)
      await shortenURL(formData)
      toast.success("URL shortened successfully!")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to shorten URL")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form action={handleSubmit} className="mb-8 flex gap-2">
      <Input
        type="url"
        name="url"
        placeholder="Enter your URL here"
        required
        className="flex-grow"
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Shortening..." : "Shorten"}
      </Button>
    </form>
  )
}

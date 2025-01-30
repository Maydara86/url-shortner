"use server"

import { revalidatePath } from "next/cache"

import { BASE_URL } from "@/lib/constants"

export type ShortenedURL = {
  originalUrl: string
  shortId: string
}

export type Pagination = {
  currentPage: number
  totalPages: number
  totalItems: number
  perPage: number
}

export async function shortenURL(formData: FormData) {
  const url = formData.get("url") as string

  if (!url) {
    throw new Error("URL is required")
  }

  try {
    const response = await fetch(`${BASE_URL}/api/shorten`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ url }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Failed to shorten URL")
    }

    revalidatePath("/")
  } catch (error) {
    console.error(error)

    throw error
  }
}

export async function getURLs(page = 1) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/shortened/list?page=${page}`,
      { cache: "no-store" }
    )
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch URLs")
    }

    return {
      urls: data.urls,
      pagination: data.pagination,
    }
  } catch (error) {
    console.error(error)
    return {
      urls: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        perPage: 5,
      },
    }
  }
}

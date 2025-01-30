"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

import { type Pagination as PaginationType } from "@/actions/urls"
import { Button } from "@/components/ui/button"

export default function Pagination({
  pagination,
  page,
}: {
  pagination: PaginationType
  page: number
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const createPageQueryString = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", page.toString())
    return params.toString()
  }

  return (
    <>
      {pagination.totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => {
              router.push(`?${createPageQueryString(page - 1)}`)
            }}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <span>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <Button
            variant="outline"
            disabled={page === pagination.totalPages}
            onClick={() => {
              router.push(`?${createPageQueryString(page + 1)}`)
            }}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  )
}

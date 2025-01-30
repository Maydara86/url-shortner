import {
  type Pagination as PaginationType,
  type ShortenedURL,
  getURLs,
  shortenURL,
} from "@/actions/urls"
import Pagination from "@/components/pagination"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import UrlsList from "@/components/urls-list"

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  const page = Number(searchParams.page) || 1
  const {
    urls,
    pagination,
  }: { urls: ShortenedURL[]; pagination: PaginationType } = await getURLs(page)

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-center text-3xl font-bold text-blue-900">
        URL Shortener
      </h1>
      <form action={shortenURL} className="mb-8 flex gap-2">
        <Input
          type="url"
          name="url"
          placeholder="Enter your URL here"
          required
          className="flex-grow"
        />
        <Button type="submit">Shorten</Button>
      </form>
      <UrlsList urls={urls} />
      <Pagination pagination={pagination} page={page} />
    </main>
  )
}

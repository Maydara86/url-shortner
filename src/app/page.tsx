import { UrlForm } from "@/components/url-form"
import UrlsList from "@/components/urls-list"

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-center text-3xl font-bold text-blue-900">
        URL Shortener
      </h1>
      <UrlForm />
      <UrlsList searchParams={searchParams} />
    </main>
  )
}

import { UrlForm } from "@/components/url-form"
import UrlsList from "@/components/urls-list"

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams
  const page = Number(searchParams?.page) || 1

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-center text-3xl font-bold text-blue-900">
        URL Shortener
      </h1>
      <UrlForm />
      <UrlsList page={page} />
    </main>
  )
}

import {
  type Pagination as PaginationType,
  type ShortenedURL,
  getURLs,
} from "@/actions/urls"
import { BASE_URL } from "@/lib/constants"

import Pagination from "./pagination"

export default async function UrlsList({ page }: { page: number }) {
  const {
    urls,
    pagination,
  }: { urls: ShortenedURL[]; pagination: PaginationType } = await getURLs(page)

  return (
    <>
      <div className="space-y-4">
        {urls.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Shortened URL</th>
                  <th className="px-4 py-2 text-left">Original URL</th>
                </tr>
              </thead>
              <tbody>
                {urls.map((url, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">
                      <a
                        href={`${BASE_URL}/api/shortened/${url.shortId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {`${BASE_URL}/api/shortened/${url.shortId}`}
                      </a>
                    </td>
                    <td className="px-4 py-2">
                      <span className="block max-w-xs truncate text-gray-600">
                        {url.originalUrl}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No URLs shortened yet.</p>
        )}
      </div>
      <Pagination pagination={pagination} page={page} />
    </>
  )
}

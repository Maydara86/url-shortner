import { NextResponse } from "next/server"

import { BASE_URL } from "@/lib/constants"
import prisma from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: { shortId: string } }
) {
  try {
    const { shortId } = await params

    const urlEntry = await prisma.url.findUnique({
      where: { shortId },
    })

    if (!urlEntry) {
      return NextResponse.json(
        { error: "Short URL not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      originalUrl: urlEntry.originalUrl,
      shortUrl: `${BASE_URL}/api/shortened/${urlEntry.shortId}`,
    })
  } catch (error: unknown) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

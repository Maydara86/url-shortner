import { type NextRequest, NextResponse } from "next/server"

import prisma from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: { shortId: string } }
) {
  try {
    const { shortId } = params

    const urlEntry = await prisma.url.findUnique({
      where: { shortId },
    })

    if (!urlEntry) {
      return NextResponse.json(
        { error: "Short URL not found" },
        { status: 404 }
      )
    }

    return NextResponse.redirect(urlEntry.originalUrl)
  } catch (error: unknown) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

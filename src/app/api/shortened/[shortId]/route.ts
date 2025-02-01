import { NextRequest, NextResponse } from "next/server"

import prisma from "@/lib/prisma"

export async function GET(
  _request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: { params: { shortId: string } } & any
) {
  try {
    const { shortId } = await context.params

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

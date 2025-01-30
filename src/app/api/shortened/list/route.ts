import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")

    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { error: "Invalid page number" },
        { status: 400 }
      )
    }

    const perPage = 5
    const skip = (page - 1) * perPage

    const urls = await prisma.url.findMany({
      select: {
        originalUrl: true,
        shortId: true,
      },
      skip,
      take: perPage,
      orderBy: {
        createdAt: "desc",
      },
    })

    const total = await prisma.url.count()
    const totalPages = Math.ceil(total / perPage)

    return NextResponse.json({
      urls,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        perPage,
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

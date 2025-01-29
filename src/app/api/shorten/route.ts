import { nanoid } from "nanoid"
import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"
import { urlSchema } from "@/lib/zod"

export async function POST(request: Request) {
  try {
    const { url } = await request.json()

    const validated = urlSchema.safeParse({ url })
    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.errors[0].message },
        { status: 400 }
      )
    }

    const shortId = nanoid(6)

    const data = await prisma.url.create({
      data: {
        originalUrl: url,
        shortId,
      },
    })

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    return NextResponse.json({
      shortUrl: `${baseUrl}/${data.shortId}`,
    })
  } catch (error: unknown) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

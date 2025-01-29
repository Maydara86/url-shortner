import { nanoid } from "nanoid"
import { NextResponse } from "next/server"

import { BASE_URL } from "@/lib/constants"
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

    const existingUrl = await prisma.url.findFirst({
      where: {
        originalUrl: url,
      },
    })

    if (existingUrl) {
      return NextResponse.json({ error: "URL already exists" }, { status: 409 })
    }

    const shortId = nanoid(6)

    const data = await prisma.url.create({
      data: {
        originalUrl: url,
        shortId,
      },
    })

    return NextResponse.json({
      shortUrl: `${BASE_URL}/api/shortened/${data.shortId}`,
    })
  } catch (error: unknown) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

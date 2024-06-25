import { NextResponse } from "next/server"
import { prisma } from "@/src/lib/prismaClient"
import { country } from "@prisma/client"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"

export async function GET(request: Request, { params }: Params) {
  const { slug } = params

  try {
    const countries: country[] = await prisma.country.findMany({ where: { Continent: slug } })
    return NextResponse.json(countries)
  } catch (error) {
    return NextResponse.json(error)
  }
}

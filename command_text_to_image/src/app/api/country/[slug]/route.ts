import { NextResponse } from "next/server"
import { prisma } from "@/src/lib/prismaClient"
import { country } from "@prisma/client"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"

export async function GET(request: Request, { params }: Params) {
  const { slug } = params
  const continents = slug.split("--")

  try {
    const countries: country[] = []
    for (const continent of continents) {
      const continentCountries = await prisma.country.findMany({ where: { Continent: continent } })
      countries.push(...continentCountries)
    }
    return NextResponse.json(countries)
  } catch (error) {
    return NextResponse.json({ error: error.message }) //error=unknown type
  }
}

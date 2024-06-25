import { NextResponse } from "next/server"
import { prisma } from "@/src/lib/prismaClient"
import { country } from "@prisma/client"

export async function GET(request, { params }) {
  const { slug } = params

  try {
    const countries: country[] = await prisma.country.findMany({ where: { Continent: slug } })
    return NextResponse.json(countries)
  } catch (error) {
    return NextResponse.json(error)
  }
}

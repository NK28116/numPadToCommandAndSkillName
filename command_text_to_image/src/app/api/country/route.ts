// /api/countryでcountryに一致するデータを全て取得するData
import { NextResponse } from "next/server"
import { prisma } from "@/src/lib/prismaClient"
import { country } from "@prisma/client"
export async function GET() {
  try {
    const countries: country[] = await prisma.country.findMany()
    return NextResponse.json(countries)
  } catch (error) {
    return NextResponse.json(error)
  }
}

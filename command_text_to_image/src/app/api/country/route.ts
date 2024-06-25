import { NextResponse } from "next/server"
import { prisma } from "@/src/lib/prismaClient"
import { country } from "@prisma/client"
export async function GET() {
  // todoテーブルから全件取得
  try {
    const countries: country[] = await prisma.country.findMany()
    return NextResponse.json(countries)
  } catch (error) {
    return NextResponse.json(error)
  }
}

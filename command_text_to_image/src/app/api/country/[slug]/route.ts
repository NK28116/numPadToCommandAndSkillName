// api/country/[slug]/route
// api/country/Asia などで表示するDB

import { NextResponse } from "next/server"
import { prisma } from "@/src/lib/prismaClient"
import { country } from "@prisma/client" //対象model
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"

export async function GET(request: Request, { params }: Params) {
  const { slug } = params
  const paramsSplit = slug.split("--")

  try {
    const dataArray: country[] = []
    for (const paramsSplitElement of paramsSplit) {
      const jsonArray = await prisma.country.findMany({ where: { Continent: paramsSplitElement } })
      dataArray.push(...jsonArray)
    }
    return NextResponse.json(dataArray)
  } catch (error) {
    return NextResponse.json({ error: error.message }) //error=unknown type
  }
}

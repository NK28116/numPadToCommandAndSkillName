//character:skill(1:N)
//名前に紐づいた横方向のjson取得のapi
import { NextResponse } from "next/server"
import { prisma } from "@/src/lib/prismaClient"

type Params = {
  character: string
}

export async function GET(request: Request, { params }: { params: Params }) {
  const { character } = params

  try {
    let characterData

    if (character === "All") {
      // "All" が指定された場合、全レコードを取得
      characterData = await prisma.streetFighter6.findMany()
    } else {
      // 指定されたキャラクター名に一致するレコードを取得
      characterData = await prisma.streetFighter6.findMany({
        where: { CharacterName: character },
      })
    }

    if (characterData.length === 0) {
      return NextResponse.json({ message: "CharacterData not found" }, { status: 404 })
    }

    return NextResponse.json(characterData)
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}

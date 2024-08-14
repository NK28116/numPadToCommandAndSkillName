import { NextResponse } from "next/server"
import { prisma } from "@/src/lib/prismaClient"

type Params = {
  character: string
}

export async function GET(request: Request, { params }: { params: Params }) {
  const { character } = params

  try {
    // データベースから指定されたキャラクター名に一致するレコードを取得
    const characterData = await prisma.streetFighter6.findMany({
      where: { CharacterName: character },
    })

    if (characterData.length === 0) {
      return NextResponse.json({ message: "Character not found" }, { status: 404 })
    }

    return NextResponse.json(characterData)
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}

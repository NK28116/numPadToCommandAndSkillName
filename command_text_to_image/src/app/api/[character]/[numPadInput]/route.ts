import { NextResponse } from "next/server"
import { prisma } from "@/src/lib/prismaClient"

type Params = {
  character: string
  numPadInput: string
}

export async function GET(request: Request, { params }: { params: Params }) {
  const { character, numPadInput } = params

  try {
    // キャラクター名と numPadInput に基づいてレコードを取得
    const numPadInputData = await prisma.streetFighter6.findMany({
      where: {
        CharacterName: character,
        numPadInput: numPadInput,
      },
    })

    // データが存在しない場合
    if (numPadInputData.length === 0) {
      return NextResponse.json({ message: "numPadInputData not found" }, { status: 404 })
    }

    // レスポンスを返す
    return NextResponse.json(numPadInputData)
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}

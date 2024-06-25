import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  if (id === "1") {
    return NextResponse.json({ id: 1, name: "Mike" })
  } else {
    return new NextResponse(JSON.stringify({ error: "無効なユーザーID" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}

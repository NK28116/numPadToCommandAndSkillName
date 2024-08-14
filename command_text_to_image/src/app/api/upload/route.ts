import { NextResponse } from "next/server"
import { prisma } from "@/src/lib/prismaClient"
import { parse } from "csv-parse/sync"
import { StreetFighter6 } from "@prisma/client"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as Blob

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const fileContent = await file.text()
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    })

    const formattedRecords = records.map((record: StreetFighter6) => ({
      CharacterName: record.CharacterName,
      numPadInput: record.numPadInput,
      SkillName: record.SkillName,
      commandImagePath: record.commandImagePath,
      HitParts: record.HitParts,
    }))

    await prisma.streetFighter6.createMany({
      data: formattedRecords,
      skipDuplicates: true,
    })

    return NextResponse.json({ message: "Data updated successfully" })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to update data" }, { status: 500 })
  }
}

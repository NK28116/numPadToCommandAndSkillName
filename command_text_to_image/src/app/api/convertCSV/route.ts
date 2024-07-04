import { NextResponse } from "next/server"
import { prisma } from "@/src/lib/prismaClient"
import { parseCSV } from "@/src/app/util/csvUtils"
import multer from "multer"
import { promisify } from "util"

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const uploadSingleFile = promisify(upload.single("file"))

export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(request: Request) {
  try {
    // `uploadSingleFile`をプロミス形式で使用する
    await uploadSingleFile(request as any, {} as any)
    const fileBuffer = (request as any).file.buffer

    const records = await parseCSV(fileBuffer)

    for (const record of records) {
      await prisma.yourModel.create({
        data: {
          field1: record.field1,
          field2: record.field2,
          // 他のフィールドも必要に応じて追加
        },
      })
    }

    return NextResponse.json({ success: true, message: "CSV file imported successfully" })
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message })
  }
}

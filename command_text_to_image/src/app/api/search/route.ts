import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { name } = req.query

    try {
      // Prismaを使用してデータベースから都市データを取得
      const cityData = await prisma.city.findUnique({
        where: {
          Name: String(name),
        },
      })

      if (cityData) {
        res.status(200).json(cityData)
      } else {
        res.status(404).json({ error: "City not found" })
      }

      // Tokyoの参照テスト
      const tokyoData = await prisma.city.findUnique({
        where: { Name: "Tokyo" },
      })
      console.log("Tokyo data:", tokyoData)
    } catch (error) {
      res.status(500).json({ error: "Internal server error" })
    } finally {
      await prisma.$disconnect()
    }
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

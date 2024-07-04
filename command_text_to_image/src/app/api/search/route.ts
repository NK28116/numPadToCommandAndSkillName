/**
 * 期待される結果：/api/search?name=Tokyo&model=city
 */

import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

//用いるmodel
const modelMap = {
  city: prisma.city,
  country: prisma.country,
  // 他のモデルもここに追加できます
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { name, model } = req.query

    if (!modelMap[model as string]) {
      return res.status(400).json({ error: "Invalid model name" })
    }
    //where の中身でfindUniqueする
    try {
      const searchData = await modelMap[model as string].findUnique({
        where: {
          Name: String(name),
        },
      })

      if (searchData) {
        res.status(200).json(searchData)
      } else {
        res.status(404).json({ error: "Data not found" })
      }
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

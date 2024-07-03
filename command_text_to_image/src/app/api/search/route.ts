import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { name } = req.query

    try {
      const searchData = await prisma.city.findUnique({
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

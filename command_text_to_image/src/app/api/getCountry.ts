import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { inputString } = req.body

    try {
      const country = await prisma.country.findUnique({
        where: {
          Code: inputString,
        },
      })

      if (country) {
        res.status(200).json({ outputString: country.Name })
      } else {
        res.status(404).json({ error: "Country not found" })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal Server Error" })
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" })
  }
}

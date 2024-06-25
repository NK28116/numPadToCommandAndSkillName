import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/src/lib/prismaClient"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { continent } = req.query

  try {
    const countries = await prisma.country.findMany({
      where: {
        Continent: continent as string,
      },
      select: {
        Population: true,
        HeadOfState: true,
        Code: true,
        Name: true,
        Continent: true,
      },
    })
    res.status(200).json(countries)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch countries" })
  }
}

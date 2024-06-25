import { NextApiRequest, NextApiResponse } from "next"
import { country_Continent } from "@prisma/client"
import { prisma } from "@/src/lib/prismaClient"

const isValidContinent = (value: any): value is country_Continent => {
  return Object.values(country_Continent).includes(value)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { continent } = req.query

  if (!isValidContinent(continent)) {
    return res.status(400).json({ error: "Invalid continent" })
  }

  try {
    const countries = await prisma.country.findMany({
      where: {
        Continent: continent as country_Continent,
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

import { prisma } from "@/src/lib/prismaClient"
export default async function staticData() {
  const Data = await prisma.city.findUnique({ where: { Name: "Tokyo" } })
  return (
    <>
      <p>{Data.Name}</p>
      <p>{Data.ID} </p>
      <p>{Data.Population}</p>
      <p>{Data.CountryCode}</p>
    </>
  )
}

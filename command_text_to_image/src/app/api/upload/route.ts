import { NextResponse } from "next/server"
import { prisma } from "@/src/lib/prismaClient"
import { parse } from "csv-parse/sync"

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

    const formattedRecords = records.map((record) => ({
      Code: record.Code,
      Name: record.Name,
      Continent: record.Continent,
      Region: record.Region,
      SurfaceArea: parseFloat(record.SurfaceArea),
      IndepYear: record.IndepYear ? parseInt(record.IndepYear) : null,
      Population: parseInt(record.Population),
      LifeExpectancy: record.LifeExpectancy ? parseFloat(record.LifeExpectancy) : null,
      GNP: record.GNP ? parseFloat(record.GNP) : null,
      GNPOld: record.GNPOld ? parseFloat(record.GNPOld) : null,
      LocalName: record.LocalName,
      GovernmentForm: record.GovernmentForm,
      HeadOfState: record.HeadOfState,
      Capital: record.Capital ? parseInt(record.Capital) : null,
      Code2: record.Code2,
    }))

    // Using createMany for bulk insert
    await prisma.country.createMany({
      data: formattedRecords,
      skipDuplicates: true,
    })

    // Alternatively, using upsert for each record
    // for (const record of formattedRecords) {
    //   await prisma.country.upsert({
    //     where: { Code: record.Code },
    //     update: record,
    //     create: record
    //   });
    // }

    return NextResponse.json({ message: "Data updated successfully" })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to update data" }, { status: 500 })
  }
}

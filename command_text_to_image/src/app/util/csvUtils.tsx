import csvParser from "csv-parser"
import { Readable } from "stream"

export const parseCSV = async (fileBuffer: Buffer) => {
  const results: any[] = []
  const stream = new Readable()
  stream.push(fileBuffer)
  stream.push(null)

  return new Promise((resolve, reject) => {
    stream
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error))
  })
}

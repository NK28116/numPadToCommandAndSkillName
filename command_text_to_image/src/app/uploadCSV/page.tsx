"use client"

import { useState } from "react"

export default function UploadCSV() {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch("/api/import-csv", {
      method: "POST",
      body: formData,
    })

    const result = await response.json()
    console.log(result)
  }

  return (
    <div>
      <h1>Upload CSV</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  )
}

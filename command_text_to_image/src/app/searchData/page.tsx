"use client"

import { useEffect, useState } from "react"
import { country } from "@prisma/client"
import Search from "@/src/app/util/search"

export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string
  }
}) {
  const query = searchParams?.query || ""

  const [countryNames, setCountryNames] = useState<country[]>([])
  useEffect(() => {
    const getCountryData = async () => {
      const res = await fetch(`../api/country/${query}`)
      const data = await res.json()
      //console.log(data)
      setCountryNames(data)
    }
    getCountryData()
  }, [])
  console.log("countryNames", countryNames)

  return (
    <>
      <Search placeholder="Search continent..." />
    </>
  )
}

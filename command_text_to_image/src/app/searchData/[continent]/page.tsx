"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { country } from "@prisma/client"

export default function ContinentPage() {
  const pathname = usePathname()
  const continent = pathname.split("/")[2]

  const [countryData, setCountryData] = useState<country[]>([])

  useEffect(() => {
    const getCountryData = async () => {
      const res = await fetch(`/api/country/${continent}`)
      const data = await res.json()
      setCountryData(data)
    }
    if (continent) {
      getCountryData()
    }
  }, [continent])

  return (
    <>
      <h1>Countries in {continent}</h1>
      <div>==============</div>
      <div>
        {countryData.map((country) => (
          <div key={country.Code}>
            <p>Name: {country.Name}</p>
            <p>Population: {country.Population}</p>
            <p>Head of State: {country.HeadOfState}</p>
            <p>Code: {country.Code}</p>
            <p>Continent: {country.Continent}</p>
            <p>-------</p>
          </div>
        ))}
      </div>
    </>
  )
}

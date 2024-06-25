"use client"

import { useEffect, useState } from "react"
import { country } from "@prisma/client"

export default function Home() {
  const [countryNames, setCountryNames] = useState<country[]>([])
  useEffect(() => {
    const getCountryData = async () => {
      const res = await fetch(`../api/country/Europe`)
      const data = await res.json()
      setCountryNames(data)
    }
    getCountryData()
  }, [])
  return (
    <>
      {countryNames.map((country) => (
        <div key={country.Name}>
          <p>{country.Name}</p>
          <p>{country.Population}</p>
          <p>{country.Region}</p>
        </div>
      ))}
    </>
  )
}

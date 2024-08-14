"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { StreetFighter6 } from "@prisma/client"

export default function ContinentPage() {
  const pathname = usePathname()
  const characterName = pathname?.split("/")[2]

  const [characterSkillData, setCharacterSkillData] = useState<StreetFighter6[]>([])

  useEffect(() => {
    const getCountryData = async () => {
      const res = await fetch(`/api/country/${characterName}`)
      const data = await res.json()
      setCharacterSkillData(data)
    }
    if (characterName) {
      getCountryData()
    }
  }, [characterName])

  return (
    <>
      <h1>CommandTable of {characterName}</h1>
      <div>==============</div>
      <div>
        {characterSkillData.map((country) => (
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

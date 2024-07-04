/**
 * searchData/[inputText]で表示されるページ
 */

"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { country } from "@prisma/client" //表示したいmodel

export default function ContinentPage() {
  const pathname = usePathname() //search/[inputText]
  const inputText = pathname?.split("/")[2] //[inputText]

  const [outputData, setOutputData] = useState<country[]>([])

  useEffect(() => {
    const getCountryData = async () => {
      const res = await fetch(`/api/country/${inputText}`) //app/api/[model]/[text]
      const data = await res.json()
      setOutputData(data)
    }
    if (inputText) {
      getCountryData()
    }
  }, [inputText])

  return (
    <>
      <h1>Results By Search {inputText}</h1>
      <div>==============</div>
      <div>
        {outputData.map((country) => (
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

"use client"

import { useState } from "react"
import axios from "axios"

type CityData = {
  ID: number
  Name: string
  CountryCode: string
  District: string
  Population: number
} | null

export default function Page() {
  const [name, setName] = useState<string>("")
  const [cityData, setCityData] = useState<CityData>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    try {
      const response = await axios.get(`../api/search/${name}`)
      console.log("response", response)
      if (response.status === 200) {
        const data = response.data
        setCityData(data)
        setError(null)
        console.log("data", data)
      } else {
        const errorData = response.data
        console.log("errorData", errorData)
        setError(errorData.error)
        setCityData(null)
      }
    } catch (err) {
      console.log("err", err)
      setError(`Failed to fetch city data: ${err.message}`)
      setCityData(null)
    }
    console.log("cityData", cityData)
  }

  return (
    <div>
      <h1>Search City</h1>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter city name" />
      <button onClick={handleSearch}>Search</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {cityData && (
        <div>
          <h2>City Details</h2>
          <p>ID: {cityData.ID}</p>
          <p>Name: {cityData.Name}</p>
          <p>CountryCode: {cityData.CountryCode}</p>
          <p>District: {cityData.District}</p>
          <p>Population: {cityData.Population}</p>
        </div>
      )}
    </div>
  )
}

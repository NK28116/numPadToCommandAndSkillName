"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { StreetFighter6 } from "@prisma/client"

export default function ContinentPage() {
  const pathname = usePathname()
  const characterName = pathname?.split("/")[2]

  const [characterSkillData, setCharacterSkillData] = useState<StreetFighter6[]>([])

  useEffect(() => {
    const getCharacterSkillData = async () => {
      const res = await fetch(`/api/${characterName}`)
      const data = await res.json()
      setCharacterSkillData(data)
    }
    if (characterName) {
      getCharacterSkillData()
    }
  }, [characterName])

  return (
    <>
      <h1>CommandTable of {characterName}</h1>
      <div>==============</div>
      <div>
        {characterSkillData.map((charcter) => (
          <div key={charcter.ID}>
            <p>Name: {charcter.CharacterName}</p>
            <p>numPadInput: {charcter.numPadInput}</p>
            <p>SkilName: {charcter.SkillName}</p>
            <p>Command: {charcter.commandImagePath}</p>
            <p>HitParts: {charcter.HitParts}</p>
            <p>-------</p>
          </div>
        ))}
      </div>
    </>
  )
}

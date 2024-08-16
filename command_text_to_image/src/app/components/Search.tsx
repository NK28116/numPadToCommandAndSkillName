"use client"

import { useEffect, useState } from "react"
import { StreetFighter6 } from "@prisma/client"
import { useRouter } from "next/navigation"

export default function ContinentPage() {
  const characterName = "All"
  const { replace } = useRouter()
  const [characterSkillData, setCharacterSkillData] = useState<StreetFighter6[]>([])
  const [selectedCharacter, setSelectedCharacter] = useState<string>("")

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

  function handleSearch() {
    if (selectedCharacter) {
      replace(`/streetfighter6/${selectedCharacter}`)
    }
  }

  return (
    <>
      <div className="relative flex flex-1 flex-shrink-0">
        <select
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          onChange={(e) => setSelectedCharacter(e.target.value)}
          value={selectedCharacter}
        >
          <option value="" disabled>
            Select a character
          </option>
          {characterSkillData.map((character) => (
            <option key={character.ID} value={character.CharacterName}>
              {character.CharacterName}
            </option>
          ))}
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>
    </>
  )
}

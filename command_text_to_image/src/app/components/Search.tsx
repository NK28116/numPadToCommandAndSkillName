"use client"

import { useEffect, useState } from "react"
import { StreetFighter6 } from "@prisma/client"

export default function ContinentPage() {
  const characterName = "All"
  const [characterSkillData, setCharacterSkillData] = useState<StreetFighter6[]>([])
  const [selectedCharacter, setSelectedCharacter] = useState<string>("")
  const [filteredData, setFilteredData] = useState<StreetFighter6[]>([])

  function handleSearch() {
    if (selectedCharacter) {
      const filtered = characterSkillData.filter((character) => character.CharacterName === selectedCharacter)
      setFilteredData(filtered)
    }
  }
  // 重複しないキャラクター名のリストを生成
  const uniqueCharacters = Array.from(new Set(characterSkillData.map((character) => character.CharacterName)))

  //セットされたキャラネーム
  const selectedCharacterName = filteredData.map((character) => character.CharacterName)[0]
  console.log(selectedCharacterName)

  useEffect(() => {
    const getCharacterSkillData = async () => {
      const res = await fetch(`/api/${selectedCharacterName}`)
      const data = await res.json()
      setCharacterSkillData(data)
    }

    if (characterName) {
      getCharacterSkillData()
    }
  }, [characterName])

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
          {uniqueCharacters.map((characterName, index) => (
            <option key={index} value={characterName}>
              {characterName}
            </option>
          ))}
        </select>
        <button onClick={handleSearch}>Set</button>
      </div>
      <div>-----</div>

      <div>
        {filteredData.length > 0 ? (
          filteredData.map((character) => (
            <div key={character.ID}>
              <p>Name: {character.CharacterName}</p>
              <p>numPadInput: {character.numPadInput}</p>
              <p>SkilName: {character.SkillName}</p>
              <p>Command: {character.commandImagePath}</p>
              <p>HitParts: {character.HitParts}</p>
              <p>-------</p>
            </div>
          ))
        ) : (
          <p>No character selected</p>
        )}
      </div>
    </>
  )
}

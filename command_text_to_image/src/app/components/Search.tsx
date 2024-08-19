"use client"
import { useEffect, useState } from "react"
import { StreetFighter6 } from "@prisma/client"

type SearchProps = {
  onCharacterSelect: (character: string) => void
}

export default function Search({ onCharacterSelect }: SearchProps) {
  const characterName = "All"
  const [characterSkillData, setCharacterSkillData] = useState<StreetFighter6[]>([])
  const [selectedCharacter, setSelectedCharacter] = useState<string>("")

  useEffect(() => {
    const getCharacterSkillData = async () => {
      const res = await fetch(`/api/${characterName}`)
      const data = await res.json()
      setCharacterSkillData(data)
    }

    getCharacterSkillData()
  }, [characterName])

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value
    setSelectedCharacter(selected)
    onCharacterSelect(selected) // 親コンポーネントに選択したキャラクターを通知
  }

  // 重複しないキャラクター名のリストを生成
  const uniqueCharacters = Array.from(new Set(characterSkillData.map((character) => character.CharacterName)))

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <select
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        onChange={handleSelectChange}
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
    </div>
  )
}

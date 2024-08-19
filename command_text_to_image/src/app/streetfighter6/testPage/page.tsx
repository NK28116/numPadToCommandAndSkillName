// ContinentPage.tsx

"use client"

import { useEffect, useState } from "react"
import { StreetFighter6 } from "@prisma/client"
import SkillName from "@/src/app/components/SkillNameList" // インポートを追加

export default function TestPage() {
  const [characterSkillData, setCharacterSkillData] = useState<StreetFighter6[]>([])
  const [selectedCharacter, setSelectedCharacter] = useState<string>("")
  const [inputNumPad, setInputNumPad] = useState<string>("")
  const [skillName, setSkillName] = useState<string>("")

  // キャラクターデータの取得
  useEffect(() => {
    const getCharacterSkillData = async () => {
      if (selectedCharacter) {
        const res = await fetch(`/api/${selectedCharacter}`)
        const data = await res.json()
        setCharacterSkillData(data)
      }
    }
    getCharacterSkillData()
  }, [selectedCharacter])

  // numPadInputに基づいてSkillNameを検索
  useEffect(() => {
    const matchedSkill = characterSkillData.find((character) => character.numPadInput === inputNumPad)
    if (matchedSkill) {
      setSkillName(matchedSkill.SkillName)
    } else {
      setSkillName("")
    }
  }, [inputNumPad, characterSkillData])

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
          {/* 重複しないキャラクター名のリスト */}
          {Array.from(new Set(characterSkillData.map((character) => character.CharacterName))).map(
            (characterName, index) => (
              <option key={index} value={characterName}>
                {characterName}
              </option>
            ),
          )}
        </select>
      </div>

      {/* numPadInputの入力フォーム */}
      <div>
        <input
          className="border"
          placeholder="Enter numPadInput"
          value={inputNumPad}
          onChange={(e) => setInputNumPad(e.target.value)}
        />
      </div>

      {/* SkillNameコンポーネントの使用 */}
      <SkillName skillNameList={skillName} />
    </>
  )
}

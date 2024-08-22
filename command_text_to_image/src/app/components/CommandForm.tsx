"use client"
import React, { useState } from "react"
import CommandInput from "@/src/app/components/CommandInput"
import ImageList from "@/src/app/components/ImageList"
import { generateImageList, ImageItem } from "@/src/app/util/imageUtl"
import Search from "@/src/app/components/Search"
import SkillNameList from "@/src/app/components/SkillNameList"

const CommandForm: React.FC = () => {
  const [imageItems, setImageItems] = useState<ImageItem[]>([])
  const [selectedCharacter, setSelectedCharacter] = useState<string>("")
  const [skillNames, setSkillNames] = useState<string[]>([])

  const handleConvert = async (combo: string) => {
    // 区切り文字 `--` が含まれているかチェック
    const commandArray = combo.includes("--") ? combo.split("--") : [combo]
    const images: ImageItem[] = []
    const fetchedSkillNames: string[] = []

    for (const command of commandArray) {
      // 画像生成処理
      images.push(...generateImageList(command))

      // APIリクエストでSkillNameを取得
      if (selectedCharacter) {
        try {
          const response = await fetch(`/api/${selectedCharacter}/${command}`)
          if (response.ok) {
            const data = await response.json()
            if (data && data.SkillName) {
              fetchedSkillNames.push(data.SkillName)
            }
          }
        } catch (error) {
          console.error("Error fetching skill name:", error)
        }
      }
    }

    // 正常に取得されたスキル名がある場合のみ表示する
    if (fetchedSkillNames.length > 0) {
      setSkillNames(fetchedSkillNames)
    }

    // 画像リストを状態に設定
    setImageItems(images)
    console.log("fetchedSkillNames:", fetchedSkillNames)
    console.log("skillNames:", skillNames)
  }

  const handleClear = () => {
    setImageItems([])
    setSkillNames([])
  }

  return (
    <div>
      <Search onCharacterSelect={setSelectedCharacter} />
      <CommandInput onConvert={handleConvert} onClear={handleClear} />
      <ImageList items={imageItems} />
      <SkillNameList skillNameList={skillNames} />
    </div>
  )
}

export default CommandForm

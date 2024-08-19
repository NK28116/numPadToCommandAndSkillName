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
    const commandArray = combo.split("--")
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
            const skillName = data.SkillName || "Skill not found"
            fetchedSkillNames.push(skillName)

            console.log("data", data[0].SkillName)
            console.log("skillname", skillName)
          } else {
            fetchedSkillNames.push("Skill not found!")
          }
        } catch (error) {
          fetchedSkillNames.push("Skill not found!!!")
        }
      }
    }

    // 全てのリクエストが完了した後に状態を更新
    //setSkillNames(fetchedSkillNames)
    //setImageItems(images)
    console.log("fetched", fetchedSkillNames)
    console.log("skillnames", skillNames)
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

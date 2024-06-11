// src/components/CommandForm.tsx
"use client"
import React, { useState } from "react"
import CommandInput from "./CommandInput"
import ImageList from "./ImageList"
import { generateImageList, ImageItem } from "../util/imageUtl"

const CommandForm: React.FC = () => {
  const [imageItems, setImageItems] = useState<ImageItem[]>([])

  const handleConvert = (combo: string) => {
    //combo=command1--command2
    //commandArray=[command1,command2]
    //
    const commandArray = combo.split("--")
    const images: ImageItem[] = []
    commandArray.forEach((command) => {
      images.push(...generateImageList(command))
    })
    setImageItems(images)
  }

  const handleClear = () => {
    setImageItems([])
  }

  return (
    <div>
      <CommandInput onConvert={handleConvert} onClear={handleClear} />
      <ImageList items={imageItems} />
    </div>
  )
}

export default CommandForm

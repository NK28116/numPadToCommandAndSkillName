// src/components/ImageList.tsx
"use client"
import React from "react"
import { ImageItem } from "../util/imageUtl"

type ImageListProps = {
  items: ImageItem[]
}

const ImageList: React.FC<ImageListProps> = ({ items }) => {
  return (
    <div className="flex outline">
      <h1>コマンド画像</h1>
      {items.map((item) => (
        <div key={item.key}>
          <img src={item.image} alt={`Image of ${item.value}`} />
          <p>{item.value}</p>
        </div>
      ))}
    </div>
  )
}

export default ImageList

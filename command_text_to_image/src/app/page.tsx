// src/app/page.tsx
/**
 * #TODO:いい感じのスタイルを探す
 */

"use client"
import React from "react"
import CommandForm from "./components/CommandForm"
import Image from "next/image"

const Home: React.FC = () => {
  return (
    <>
      <div className="border-2 border-red-400">
        <h1>技コマンド入力</h1>
        <CommandForm />
      </div>
    </>
  )
}

export default Home

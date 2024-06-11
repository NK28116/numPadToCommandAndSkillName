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

        <div className="flex justify-center items-center min-h-screen">
          <div className="flex space-x-4">
            <Image src="/a.png" alt="1vector" width={100} height={100} />
            <Image src="/a.png" alt="1vector" width={100} height={100} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home

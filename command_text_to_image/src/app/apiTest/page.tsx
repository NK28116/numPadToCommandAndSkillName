"use client"

import { useRouter } from "next/navigation"
import React from "react"
import handler from "@/src/app/api/getCountry"
const About = () => {
  const router = useRouter()

  const handleClick = () => {}

  return (
    <div>
      <input className="border-2 border-gray-800" />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-4"
        onClick={handleClick}
      >
        戻る
      </button>
      <output className="border-2 border-gray-800">output:</output>
    </div>
  )
}

export default About

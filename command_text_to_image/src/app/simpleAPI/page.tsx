"use client"

import axios, { AxiosError } from "axios"

export default function Home() {
  const getUserData = async () => {
    try {
      const response = await axios.get("../api/user/1")
      console.log("response", response)
      console.log("response.data", response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        console.error("APIリクエストでエラーが発生しました:", axiosError.response?.data || "エラー情報が取得できません")
      } else {
        console.error("その他エラーが発生しました:", error)
      }
    }
  }

  return (
    <div>
      <button onClick={getUserData}>名前を取得</button>
    </div>
  )
}

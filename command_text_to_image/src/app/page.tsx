// src/app/page.tsx
/**
 * #TODO:いい感じのスタイルを探す
 * #TODO: apiを用いてprismaからデータを持ってくる
 */

"use client"
import React from "react"
import CommandForm from "./components/CommandForm"

const Home: React.FC = () => {
  return (
    <>
      <div className="outline outline-offset-2 outline-blue-500">
        <h1 className={"flex justify-center"}>技コマンド入力TOP</h1>
        <h2 className={"flex justify-center p-8  underline underline-offset-2"}>
          <a href={"../streetfighter6"}>Street Fighter 6</a>
        </h2>
        <h2 className={"flex justify-center p-8  underline underline-offset-2"}>
          <a href={""}>TEKKEN 8(今後実装)</a>
        </h2>
        <h2 className={"flex justify-center p-8  underline underline-offset-2"}>
          <a href={""}>GGST(今後実装)</a>
        </h2>
        <h2 className={"flex justify-center p-8  underline underline-offset-2"}>
          <a href={"../uploadCSV"}>CSVアップロード</a>
        </h2>
      </div>
    </>
  )
}

export default Home

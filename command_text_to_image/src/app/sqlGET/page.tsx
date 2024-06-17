// データベースに接続するためのクライアントをインポート
import { prisma } from "../../lib/prismaClient"

export default async function Home() {
  // findUnique
  const findUnique = await prisma.country.findUnique({
    where: {
      Code: "CAN",
    },
  })
  // findUniqueOrThrow
  // findFirst
  // findMany
  // Userテーブルから全てデータを取得
  const country = prisma.country.findMany()
  // create
  // createMany
  //createManyAndReturn
  // update
  // updateMany
  // upsert
  // delete
  //deleteMany
  // count
  //aggregate
  //aggregateRaw
  //groupBy
  //findRaw
  //

  return (
    <>
      <h1 className="font-bold text-2xl">testAPI</h1>
      {/* Userテーブルの結果の一覧を画面に出力する */}
      {(await country).map((countryArray, index) => (
        <div key={countryArray.Population} className="border-2 border-red-400 bg-slate-400">
          <br />
          <p>Name: {countryArray.Name}</p>
          <p>Continent: {countryArray.Continent}</p>
          <br />
        </div>
      ))}
      <br />
      <div>findUnique:{findUnique.Name}</div>
      {/*not null を定義する必要がある*/}
    </>
  )
}

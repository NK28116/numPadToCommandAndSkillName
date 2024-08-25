# NOTE
メモとか新規に学習したメソッドとか見落としてたやつとか

## 2024/08/11
完全に忘れてしまっているしslackも消えてしまったんで日誌的に使用
- db 操作
  - cd Docker-Compose/docker-mysql/ で　sudo docker-compose exec  mysql bash　
  - mysql -uroot -p databasepassword
- ディレクトリ構造を作成
- 最終的なprisma scheme を作成

とりあえず1つのゲームで作ろう

## 2024/08/12
###  完全リセット
1. prisma.schemeを作成
2. `prisma migrate dev --name init` で空のDB作成→world .sqlを入れてないのでレコードはなし
### 整形処理をしたブランチを作る
1. mainにuploadCSVをマージしてreshapeに反映
2. デザイン以外（リンクやディレクトリ構造）の整形処理
3. マージ済み

## 2024/08/13
カジュアル面談がいくつか入っているから大まかな方針だけ
### TODO
- [x] mainの更新
- [x] prismaのコンテナ名やDBを変更しても問題ないかテスト

#### image名を変更
```bash
sudo docker-compose ps
WARN[0000] /Users/niwa_kazuhiro/Documents/MyApps_clone/command_text_to_image/Docker-Compose/docker-mysql/docker-compose.yml: `version` is obsolete
NAME       IMAGE                  COMMAND                  SERVICE   CREATED        STATUS        PORTS
world-db   original_mysql_world   "docker-entrypoint.s…"   mysql     21 hours ago   Up 21 hours   33060/tcp, 0.0.0.0:8080->3306/tcp
```

   4. `sudo docker tag original_mysql_world fighting_game_database`
   3. `sudo docker-compose stop`
   4. `sudo docker-compose up -d`

```bash
sudo docker-compose ps
   WARN[0000] /Users/niwa_kazuhiro/Documents/MyApps_clone/command_text_to_image/Docker-Compose/docker-mysql/docker-compose.yml: `version` is obsolete
   NAME       IMAGE                    COMMAND                  SERVICE   CREATED              STATUS         PORTS
   world-db   fighting_game_database   "docker-entrypoint.s…"   mysql     About a minute ago   Up 4 seconds   33060/tcp, 0.0.0.0:8080->3306/tcp
```

#### コンテナ名を変更

```bash
sudo docker-compose ps
WARN[0000] /Users/niwa_kazuhiro/Documents/MyApps_clone/command_text_to_image/Docker-Compose/docker-mysql/docker-compose.yml: `version` is obsolete
NAME       IMAGE                    COMMAND                  SERVICE   CREATED              STATUS         PORTS
world-db   fighting_game_database   "docker-entrypoint.s…"   mysql     About a minute ago   Up 4 seconds   33060/tcp, 0.0.0.0:8080->3306/tcp
```

1. `sudo docker rename world-db fighting-game-db`

```bash
sudo docker-compose ps
WARN[0000] /Users/niwa_kazuhiro/Documents/MyApps_clone/command_text_to_image/Docker-Compose/docker-mysql/docker-compose.yml: `version` is obsolete
NAME               IMAGE                    COMMAND                  SERVICE   CREATED         STATUS         PORTS
fighting-game-db   fighting_game_database   "docker-entrypoint.s…"   mysql     9 minutes ago   Up 8 minutes   33060/tcp, 0.0.0.0:8080->3306/tcp
```

#### `.env`ファイルの変更
```dotenv
- MYSQL_DATABASE=world
+ MYSQL_DATABASE=fighting_game_database_mysql
```
#### DBeaver での接続エラー
`SQL Error [08001]: Public Key Retrieval is not allowed`
-> 接続設定 の ドライバのプロパティ の allowPublicKeyRetrieval を true,useSSLをfalse

---

- [x] modelを更新してprismaでのDBを更新できるか確認
- [ ] 最低限の設計 inputからDBの技名を参照 (front -> DB)
- [ ] DBのキャラ名を選択できるようにする.   (DB -> front)

---
 ここから下は新規にプロジェクト作成に関係する
- [ ] 新規prismaプロジェクトの手順doc作成
- [ ] 技名の表示
- [ ] 始動技のフレーム表示
- [ ] 補正含めたダメージ計算

### DONE:上記以外で行ったこと
place holderの変更

## 2024/08/14

### Create
- scheme.prismaの変更

```bash
 prisma generate
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Error:
The "path" argument must be of type string. Received undefined
```

のエラーがずっと出ていた
→prisma CLIのインストールで解決した

```bash
npm install prisma --save-dev

npm warn deprecated npx@10.2.2: This package is now part of the npm CLI.

added 1 package, changed 6 packages, and audited 894 packages in 36s

135 packages are looking for funding
  run `npm fund` for details

56 vulnerabilities (1 low, 18 moderate, 31 high, 6 critical)

To address all issues, run:
  npm audit fix

Run `npm audit` for details.


npx prisma generate
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma

✔ Generated Prisma Client (v5.18.0) to ./node_modules/@prisma/client in 109ms

Start by importing your Prisma Client (See: http://pris.ly/d/importing-client)

Tip: Curious about the SQL queries Prisma ORM generates? Optimize helps you enhance your visibility: https://pris.ly/tip-2-optimize

```

-> model更新した際には `npm install prisma --save-dev`を行う

### UPLOAD
public内のテスト用のcsvファイルを編集
IDは自動で入ってくれるので定義を決めなくていい

### READ
- キャラ一体についてapiで動的にDBからjsonを取得できるようにした
  - search apiはいらないので削除
  - <Search/> でキャラの全データを表示可能に

### DELETE
基本的にデータそのものを操作することは考えにくいので後回し

## TODO
- 条件1:キャラ名,条件2:numPadInput で技単体の名前を表示できるようにする
  - 今後これを複数積み上げててコンボにしたい
  - メインブランチで複数キャラのCSV作っておく？
- 現在createmany でレコード作成しているのでupsert(複合条件一致でupdate)に交換予定(最後)
- 回す方向は決まってるけどしゃがみコパンとかも考える必要性あるから波動とか逆ヨガの画像作るのは一番最後でいいかも


## 2024/08/16

### キャラ：技（1：N）一覧の作成
- おっぽツールみたいな感じでまずはキャラ選択 ー＞ 技一覧みたいなのを目指す
- キャラ／コマンドでjson を一つ出力できるようにした
- json で取得すれば.name
- json で取得すれば.name見たいのができるはずだがが

## 2024/08/19
- なんかもうよくわからんからGPT君に効いてみた
- 
  "use client"
  
  import { useEffect, useState } from "react"
  import { StreetFighter6 } from "@prisma/client"
  
  export default function ContinentPage() {
    const characterName = "All"
    const [characterSkillData, setCharacterSkillData] = useState<StreetFighter6[]>([])
    const [selectedCharacter, setSelectedCharacter] = useState<string>("")
    const [filteredData, setFilteredData] = useState<StreetFighter6[]>([])
  
    useEffect(() => {
      const getCharacterSkillData = async () => {
        const res = await fetch(/api/${characterName})
        const data = await res.json()
        setCharacterSkillData(data)
      }
  
      if (characterName) {
        getCharacterSkillData()
      }
    }, [characterName])
  
    function handleSearch() {
      if (selectedCharacter) {
        const filtered = characterSkillData.filter((character) => character.CharacterName === selectedCharacter)
        setFilteredData(filtered)
      }
    }
    // 重複しないキャラクター名のリストを生成
    const uniqueCharacters = Array.from(new Set(characterSkillData.map((character) => character.CharacterName)))
  
    return (
      <>
        <div className="relative flex flex-1 flex-shrink-0">
          <select
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            onChange={(e) => setSelectedCharacter(e.target.value)}
            value={selectedCharacter}
          >
            <option value="" disabled>
              Select a character
            </option>
            {uniqueCharacters.map((characterName, index) => (
              <option key={index} value={characterName}>
                {characterName}
              </option>
            ))}
          </select>
          <button onClick={handleSearch}>Set</button>
        </div>
        <div>-----</div>
        <div>
          {filteredData.length > 0 ? (
            filteredData.map((character) => (
              <div key={character.ID}>
                <p>Name: {character.CharacterName}</p>
                <p>numPadInput: {character.numPadInput}</p>
                <p>SkilName: {character.SkillName}</p>
                <p>Command: {character.commandImagePath}</p>
                <p>HitParts: {character.HitParts}</p>
                <p>-------</p>
              </div>
            ))
          ) : (
            <p>No character selected</p>
          )}
        </div>
      </>
    )
  }
  でcharacter==Ryuを選択するとhttp://localhost:3000/api/Ryu/の
  [{"ID":2,"CharacterName":"Ryu","numPadInput":"623MP","SkillName":"中昇竜拳","commandImagePath":"/public/SF6Button/MP.png","HitParts":"Low"},{"ID":4,"CharacterName":"Ryu","numPadInput":"623HP","SkillName":"大昇竜拳","commandImagePath":"/public/SF6Button/Test.png","HitParts":"Low"}]が得られ，入力フォームにnumPadInputがinputされた時SkillNameを出力したい
  ChatGPT:
  ChatGPT
  
  この要件を実現するためには、選択されたキャラクターのデータを取得し、そのデータの中から入力された numPadInput に一致する SkillName を検索して表示する必要があります。以下のようにコードを修正します。
  修正版のコード
  
  typescript
  
  "use client"
  
  import { useEffect, useState } from "react"
  import { StreetFighter6 } from "@prisma/client"
  
  export default function ContinentPage() {
    const [characterSkillData, setCharacterSkillData] = useState<StreetFighter6[]>([])
    const [selectedCharacter, setSelectedCharacter] = useState<string>("")
    const [filteredData, setFilteredData] = useState<StreetFighter6[]>([])
    const [inputNumPad, setInputNumPad] = useState<string>("")
    const [skillName, setSkillName] = useState<string>("")
  
    // キャラクターデータの取得
    useEffect(() => {
      const getCharacterSkillData = async () => {
        if (selectedCharacter) {
          const res = await fetch(`/api/${selectedCharacter}`)
          const data = await res.json()
          setCharacterSkillData(data)
        }
      }
      getCharacterSkillData()
    }, [selectedCharacter])
  
    // numPadInputに基づいてSkillNameを検索
    useEffect(() => {
      const matchedSkill = characterSkillData.find((character) => character.numPadInput === inputNumPad)
      if (matchedSkill) {
        setSkillName(matchedSkill.SkillName)
      } else {
        setSkillName("")
      }
    }, [inputNumPad, characterSkillData])
  
    return (
      <>
        <div className="relative flex flex-1 flex-shrink-0">
          <select
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            onChange={(e) => setSelectedCharacter(e.target.value)}
            value={selectedCharacter}
          >
            <option value="" disabled>
              Select a character
            </option>
            {/* 重複しないキャラクター名のリスト */}
            {Array.from(new Set(characterSkillData.map((character) => character.CharacterName))).map(
              (characterName, index) => (
                <option key={index} value={characterName}>
                  {characterName}
                </option>
              )
            )}
          </select>
        </div>
  
        {/* numPadInputの入力フォーム */}
        <div>
          <input
            className="border"
            placeholder="Enter numPadInput"
            value={inputNumPad}
            onChange={(e) => setInputNumPad(e.target.value)}
          />
        </div>
  
        {/* SkillNameの表示 */}
        <div>
          <p>Skill Name: {skillName || "No skill found"}</p>
        </div>
      </>
    )
  }
  
  重要なポイント
  
      選択されたキャラクターに基づくデータ取得:
          キャラクターが選択されると、そのキャラクターに関連するスキルデータをAPIから取得します。
  
      numPadInput に基づく検索:
          numPadInput が入力されるたびに、その値と一致するスキル名 (SkillName) を検索し、見つかった場合は表示します。
  
      データの状態管理:
          selectedCharacter は選択されたキャラクターの名前を管理し、inputNumPad はユーザーが入力した numPadInput を管理します。また、skillName は見つかったスキル名を保持します。
  
  この修正で、ユーザーが numPadInput を入力すると、それに対応する SkillName が画面に表示されるようになります。
  あなた:
  skillNameのみcomponent/skillName.tsxとして独立させたいです
  3/3
  ChatGPT:
  ChatGPT
  
  SkillName の表示部分を独立したコンポーネントとして components/SkillName.tsx に分ける方法を説明します。これにより、再利用性が向上し、コードが整理されます。
  1. SkillName.tsx コンポーネントの作成
  
  まず、SkillName を表示するコンポーネントを作成します。
  
  typescript
  
  // components/SkillName.tsx
  
  import React from "react"
  
  type SkillNameProps = {
    skillName: string
  }
  
  const SkillName: React.FC<SkillNameProps> = ({ skillName }) => {
    return (
      <div>
        <p>Skill Name: {skillName || "No skill found"}</p>
      </div>
    )
  }
  
  export default SkillName
  
  2. SkillName コンポーネントの使用
  
  次に、ContinentPage コンポーネントで、この新しい SkillName コンポーネントを使用するように変更します。
  
  typescript
  
  // ContinentPage.tsx
  
  "use client"
  
  import { useEffect, useState } from "react"
  import { StreetFighter6 } from "@prisma/client"
  import SkillName from "@/src/app/components/SkillName" // インポートを追加
  
  export default function ContinentPage() {
    const [characterSkillData, setCharacterSkillData] = useState<StreetFighter6[]>([])
    const [selectedCharacter, setSelectedCharacter] = useState<string>("")
    const [inputNumPad, setInputNumPad] = useState<string>("")
    const [skillName, setSkillName] = useState<string>("")
  
    // キャラクターデータの取得
    useEffect(() => {
      const getCharacterSkillData = async () => {
        if (selectedCharacter) {
          const res = await fetch(`/api/${selectedCharacter}`)
          const data = await res.json()
          setCharacterSkillData(data)
        }
      }
      getCharacterSkillData()
    }, [selectedCharacter])
  
    // numPadInputに基づいてSkillNameを検索
    useEffect(() => {
      const matchedSkill = characterSkillData.find((character) => character.numPadInput === inputNumPad)
      if (matchedSkill) {
        setSkillName(matchedSkill.SkillName)
      } else {
        setSkillName("")
      }
    }, [inputNumPad, characterSkillData])
  
    return (
      <>
        <div className="relative flex flex-1 flex-shrink-0">
          <select
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            onChange={(e) => setSelectedCharacter(e.target.value)}
            value={selectedCharacter}
          >
            <option value="" disabled>
              Select a character
            </option>
            {/* 重複しないキャラクター名のリスト */}
            {Array.from(new Set(characterSkillData.map((character) => character.CharacterName))).map(
              (characterName, index) => (
                <option key={index} value={characterName}>
                  {characterName}
                </option>
              )
            )}
          </select>
        </div>
  
        {/* numPadInputの入力フォーム */}
        <div>
          <input
            className="border"
            placeholder="Enter numPadInput"
            value={inputNumPad}
            onChange={(e) => setInputNumPad(e.target.value)}
          />
        </div>
  
        {/* SkillNameコンポーネントの使用 */}
        <SkillName skillName={skillName} />
      </>
    )
  }
  
  説明
  
      SkillName.tsx: skillName の表示部分を担当する独立したコンポーネントです。skillName が空でない限り、その名前を表示します。空の場合は "No skill found" と表示されます。
  
      ContinentPage.tsx: SkillName コンポーネントをインポートし、skillName の状態を渡して表示するようにしています。
  
  このようにすることで、SkillName の表示部分が他のコンポーネントに依存しない形で独立し、管理しやすくなります。
  あなた:
  // src/components/CommandForm.tsx
  "use client"
  import React, { useState } from "react"
  import CommandInput from "@/src/app/components/CommandInput"
  import ImageList from "@/src/app/components/ImageList"
  import { generateImageList, ImageItem } from "@/src/app/util/imageUtl"
  import Search from "@/src/app/components/Search"
  import SkillNameList from "@/src/app/components/SkillNameList"
  
  const CommandForm: React.FC = () => {
    const [imageItems, setImageItems] = useState<ImageItem[]>([])
  
    const handleConvert = (combo: string) => {
      //combo=command1--command2
      //commandArray=[command1,command2]
      const commandArray = combo.split("--")
      console.log(commandArray)
      const images: ImageItem[] = []
      commandArray.forEach((command) => {
        images.push(...generateImageList(command))
      })
      images.pop()
      setImageItems(images)
    }
  
    const handleClear = () => {
      setImageItems([])
    }
  
    return (
      <div>
        <Search />
        <CommandInput onConvert={handleConvert} onClear={handleClear} />
        <ImageList items={imageItems} />
        <SkillNameList skillNameList={}/>
      </div>
    )
  }
  
  export default CommandForm
  に使えるようにSkillNameを変更してください
  ChatGPT:
  ChatGPT
  
  SkillNameListコンポーネントを作成し、CommandFormに組み込むための修正を行います。SkillNameListコンポーネントは、スキル名のリストを受け取り、それを表示します。
  SkillNameListコンポーネントの作成
  
  tsx
  
  // src/components/SkillNameList.tsx
  import React from "react"
  
  type SkillNameListProps = {
    skillNameList: string[]
  }
  
  const SkillNameList: React.FC<SkillNameListProps> = ({ skillNameList }) => {
    return (
      <div>
        {skillNameList.length > 0 ? (
          skillNameList.map((skillName, index) => (
            <div key={index}>
              <p>Skill Name: {skillName}</p>
            </div>
          ))
        ) : (
          <p>No skills found</p>
        )}
      </div>
    )
  }
  
  export default SkillNameList
  
  CommandFormコンポーネントでSkillNameListを使用
  
  tsx
  
  // src/components/CommandForm.tsx
  "use client"
  import React, { useState } from "react"
  import CommandInput from "@/src/app/components/CommandInput"
  import ImageList from "@/src/app/components/ImageList"
  import { generateImageList, ImageItem } from "@/src/app/util/imageUtl"
  import Search from "@/src/app/components/Search"
  import SkillNameList from "@/src/app/components/SkillNameList"
  
  const CommandForm: React.FC = () => {
    const [imageItems, setImageItems] = useState<ImageItem[]>([])
    const [skillNames, setSkillNames] = useState<string[]>([])
  
    const handleConvert = (combo: string) => {
      //combo=command1--command2
      //commandArray=[command1,command2]
      const commandArray = combo.split("--")
      console.log(commandArray)
      const images: ImageItem[] = []
      const fetchedSkillNames: string[] = []
  
      commandArray.forEach((command) => {
        images.push(...generateImageList(command))
  
        // Example: Fetching skill names based on command input
        // This would typically be replaced with actual API calls
        if (command === "exampleCommand") {
          fetchedSkillNames.push("Example Skill Name")
        }
      })
      images.pop()
      setImageItems(images)
      setSkillNames(fetchedSkillNames)
    }
  
    const handleClear = () => {
      setImageItems([])
      setSkillNames([])
    }
  
    return (
      <div>
        <Search />
        <CommandInput onConvert={handleConvert} onClear={handleClear} />
        <ImageList items={imageItems} />
        <SkillNameList skillNameList={skillNames} />
      </div>
    )
  }
  
  export default CommandForm
  
  説明
  
      SkillNameList.tsxは、スキル名のリストを受け取って表示する単純なコンポーネントです。
      CommandForm.tsxでは、SkillNameListコンポーネントにスキル名のリストを渡しています。handleConvert関数内で、コマンドに基づいてスキル名を取得し、それをSkillNameListに渡します。
  
  これで、CommandFormでコンボ入力に応じたスキル名を表示することができるようになります。
  あなた:
  skillName取得のapiは
  import { NextResponse } from "next/server"
  import { prisma } from "@/src/lib/prismaClient"
  
  type Params = {
    character: string
    numPadInput: string
  }
  
  export async function GET(request: Request, { params }: { params: Params }) {
    const { character, numPadInput } = params
  
    try {
      // キャラクター名と numPadInput に基づいてレコードを取得
      const numPadInputData = await prisma.streetFighter6.findMany({
        where: {
          CharacterName: character,
          numPadInput: numPadInput,
        },
      })
  
      // データが存在しない場合
      if (numPadInputData.length === 0) {
        return NextResponse.json({ message: "numPadInputData not found" }, { status: 404 })
      }
  
      // レスポンスを返す
      return NextResponse.json(numPadInputData)
    } catch (error) {
      return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
  }
  でhttp://localhost:3000/api/Ryu/623HPで
  [{"ID":2,"CharacterName":"Ryu","numPadInput":"623MP","SkillName":"中昇竜拳","commandImagePath":"/public/SF6Button/MP.png","HitParts":"Low"},{"ID":4,"CharacterName":"Ryu","numPadInput":"623HP","SkillName":"大昇竜拳","commandImagePath":"/public/SF6Button/Test.png","HitParts":"Low"}]の大昇竜拳を取得したいです
  ChatGPT:
  ChatGPT
  
  SkillNameを取得するためのAPIは正しいですが、numPadInputに基づいて特定のスキル名を取得するために、findManyメソッドをfindFirstに変更すると、最初に一致する1つのレコードのみを取得できます。
  
  次に、SkillNameを取得して表示するためのSkillNameListコンポーネントを適切に作成し、それをCommandFormコンポーネントに組み込む方法を示します。
  API修正
  
  APIはすでに正しいですが、findManyをfindFirstに変更することで、特定のnumPadInputに一致する最初のレコードを取得できます。
  
  typescript
  
  import { NextResponse } from "next/server"
  import { prisma } from "@/src/lib/prismaClient"
  
  type Params = {
    character: string
    numPadInput: string
  }
  
  export async function GET(request: Request, { params }: { params: Params }) {
    const { character, numPadInput } = params
  
    try {
      // キャラクター名と numPadInput に基づいてレコードを取得
      const numPadInputData = await prisma.streetFighter6.findFirst({
        where: {
          CharacterName: character,
          numPadInput: numPadInput,
        },
      })
  
      // データが存在しない場合
      if (!numPadInputData) {
        return NextResponse.json({ message: "numPadInputData not found" }, { status: 404 })
      }
  
      // レスポンスを返す
      return NextResponse.json(numPadInputData)
    } catch (error) {
      return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
  }
  
  SkillNameListコンポーネント
  
  次に、SkillNameListコンポーネントを作成します。これがSkillNameを表示するための基本的なコンポーネントです。
  
  typescript
  
  // src/app/components/SkillNameList.tsx
  "use client"
  
  import React from "react"
  
  type SkillNameListProps = {
    skillNames: string[]
  }
  
  const SkillNameList: React.FC<SkillNameListProps> = ({ skillNames }) => {
    return (
      <div>
        {skillNames.length > 0 ? (
          skillNames.map((skillName, index) => (
            <div key={index}>
              <p>{skillName}</p>
            </div>
          ))
        ) : (
          <p>No Skill Found</p>
        )}
      </div>
    )
  }
  
  export default SkillNameList
  
  CommandFormコンポーネントの修正
  
  CommandFormコンポーネントで、APIから取得したスキル名をSkillNameListに渡します。
  
  typescript
  
  // src/app/components/CommandForm.tsx
  "use client"
  import React, { useState } from "react"
  import CommandInput from "@/src/app/components/CommandInput"
  import ImageList from "@/src/app/components/ImageList"
  import { generateImageList, ImageItem } from "@/src/app/util/imageUtl"
  import Search from "@/src/app/components/Search"
  import SkillNameList from "@/src/app/components/SkillNameList"
  
  const CommandForm: React.FC = () => {
    const [imageItems, setImageItems] = useState<ImageItem[]>([])
    const [skillNames, setSkillNames] = useState<string[]>([])
  
    const handleConvert = async (combo: string) => {
      const commandArray = combo.split("--")
      const images: ImageItem[] = []
      const fetchedSkillNames: string[] = []
  
      for (const command of commandArray) {
        images.push(...generateImageList(command))
  
        // APIリクエストでスキル名を取得
        const res = await fetch(`/api/Ryu/${command}`)
        const data = await res.json()
        fetchedSkillNames.push(data.SkillName)
      }
  
      images.pop()
      setImageItems(images)
      setSkillNames(fetchedSkillNames)
    }
  
    const handleClear = () => {
      setImageItems([])
      setSkillNames([])
    }
  
    return (
      <div>
        <Search />
        <CommandInput onConvert={handleConvert} onClear={handleClear} />
        <ImageList items={imageItems} />
        <SkillNameList skillNames={skillNames} />
      </div>
    )
  }
  
  export default CommandForm
  
  これで、SkillNameListにスキル名が表示されるようになります。CommandFormでSearchコンポーネントとCommandInputを使ってコマンドを入力すると、そのコマンドに対応するスキル名が表示されます。
  あなた:
  /api/Ryu/${command}は/api/${character}/${command}として
  Search.tsx
  "use client"
  
  import { useEffect, useState } from "react"
  import { StreetFighter6 } from "@prisma/client"
  
  export default function ContinentPage() {
    const characterName = "All"
    const [characterSkillData, setCharacterSkillData] = useState<StreetFighter6[]>([])
    const [selectedCharacter, setSelectedCharacter] = useState<string>("")
    const [filteredData, setFilteredData] = useState<StreetFighter6[]>([])
  
    useEffect(() => {
      const getCharacterSkillData = async () => {
        const res = await fetch(/api/${characterName})
        const data = await res.json()
        setCharacterSkillData(data)
      }
  
      if (characterName) {
        getCharacterSkillData()
      }
    }, [characterName])
  
    function handleSearch() {
      if (selectedCharacter) {
        const filtered = characterSkillData.filter((character) => character.CharacterName === selectedCharacter)
        setFilteredData(filtered)
      }
    }
    // 重複しないキャラクター名のリストを生成
    const uniqueCharacters = Array.from(new Set(characterSkillData.map((character) => character.CharacterName)))
  
  
    return (
      <>
        <div className="relative flex flex-1 flex-shrink-0">
          <select
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            onChange={(e) => setSelectedCharacter(e.target.value)}
            value={selectedCharacter}
          >
            <option value="" disabled>
              Select a character
            </option>
            {uniqueCharacters.map((characterName, index) => (
              <option key={index} value={characterName}>
                {characterName}
              </option>
            ))}
          </select>
          <button onClick={handleSearch}>Set</button>
        </div>
      </>
    )
  }
  のselectedCharacterを使いたいです
  ChatGPT:
  ChatGPT
  
  Search.tsxで選択されたselectedCharacterを使って、コマンドの入力に基づいてSkillNameを取得する処理を組み込みたい場合、CommandForm.tsx内でSearchコンポーネントからselectedCharacterの状態を取得し、そのキャラクターとCommandInputで入力されたコマンドを使ってAPIリクエストを送るようにすれば良いです。以下にその実装例を示します。
  CommandForm.tsx
  
  tsx
  
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
  
      for (const command of commandArray) {
        // 画像生成処理
        images.push(...generateImageList(command))
  
        // APIリクエストでSkillNameを取得
        if (selectedCharacter) {
          const response = await fetch(`/api/${selectedCharacter}/${command}`)
          if (response.ok) {
            const data = await response.json()
            const skillName = data[0]?.SkillName || "Skill not found"
            setSkillNames((prev) => [...prev, skillName])
          }
        }
      }
  
      setImageItems(images)
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
        <SkillNameList skillNames={skillNames} />
      </div>
    )
  }
  
  export default CommandForm
  
  Search.tsx
  
  selectedCharacterを親コンポーネント（CommandForm）に渡せるように変更します。
  
  tsx
  
  "use client"
  import { useEffect, useState } from "react"
  import { StreetFighter6 } from "@prisma/client"
  
  type SearchProps = {
    onCharacterSelect: (character: string) => void
  }
  
  export default function Search({ onCharacterSelect }: SearchProps) {
    const characterName = "All"
    const [characterSkillData, setCharacterSkillData] = useState<StreetFighter6[]>([])
    const [selectedCharacter, setSelectedCharacter] = useState<string>("")
  
    useEffect(() => {
      const getCharacterSkillData = async () => {
        const res = await fetch(`/api/${characterName}`)
        const data = await res.json()
        setCharacterSkillData(data)
      }
  
      getCharacterSkillData()
    }, [characterName])
  
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selected = e.target.value
      setSelectedCharacter(selected)
      onCharacterSelect(selected) // 親コンポーネントに選択したキャラクターを通知
    }
  
    // 重複しないキャラクター名のリストを生成
    const uniqueCharacters = Array.from(new Set(characterSkillData.map((character) => character.CharacterName)))
  
    return (
      <div className="relative flex flex-1 flex-shrink-0">
        <select
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          onChange={handleSelectChange}
          value={selectedCharacter}
        >
          <option value="" disabled>
            Select a character
          </option>
          {uniqueCharacters.map((characterName, index) => (
            <option key={index} value={characterName}>
              {characterName}
            </option>
          ))}
        </select>
      </div>
    )
  }
  
  これで、CommandFormコンポーネント内で選択されたキャラクターを元にAPIリクエストを送り、対応するSkillNameを取得して表示できるようになります。
  あなた:
  <html>TS2322: Type '{ skillNames: string[]; }' is not assignable to type 'IntrinsicAttributes &amp; SkillNameListProps'.<br/>Property 'skillNames' does not exist on type 'IntrinsicAttributes &amp; SkillNameListProps'. Did you mean 'skillNameList'?
  ChatGPT:
  ChatGPT
  
  エラーメッセージが示している通り、SkillNameListコンポーネントのプロパティ名がskillNameListであるべきところ、誤ってskillNamesとして渡してしまっています。CommandForm.tsxでSkillNameListコンポーネントに渡すプロパティ名を修正する必要があります。
  
  以下のように修正してください。
  
  tsx
  
  import React, { useState } from "react"
  import CommandInput from "@/src/app/components/CommandInput"
  import ImageList from "@/src/app/components/ImageList"
  import { generateImageList, ImageItem } from "@/src/app/util/imageUtl"
  import Search from "@/src/app/components/Search"
  import SkillNameList from "@/src/app/components/SkillNameList"
  
  const CommandForm: React.FC = () => {
    const [imageItems, setImageItems] = useState<ImageItem[]>([])
    const [skillNames, setSkillNames] = useState<string[]>([])
  
    const handleConvert = async (combo: string) => {
      const commandArray = combo.split("--")
      const images: ImageItem[] = []
      const fetchedSkillNames: string[] = []
  
      for (const command of commandArray) {
        images.push(...generateImageList(command))
  
        // キャラクター名とコマンドを使用してAPIからスキル名を取得
        const res = await fetch(`/api/${selectedCharacter}/${command}`)
        const data = await res.json()
        if (res.ok && data.length > 0) {
          fetchedSkillNames.push(data[0].SkillName) // 最初の一致を取得
        }
      }
  
      setImageItems(images)
      setSkillNames(fetchedSkillNames)
    }
  
    const handleClear = () => {
      setImageItems([])
      setSkillNames([])
    }
  
    return (
      <div>
        <Search />
        <CommandInput onConvert={handleConvert} onClear={handleClear} />
        <ImageList items={imageItems} />
        <SkillNameList skillNameList={skillNames} />
      </div>
    )
  }
  
  export default CommandForm
  
  これで、SkillNameListコンポーネントに正しいskillNameListプロパティが渡されるようになります。
  あなた:
    const handleConvert = async (combo: string) => {
      const commandArray = combo.split("--")
      const images: ImageItem[] = []
  
      for (const command of commandArray) {
        // 画像生成処理
        images.push(...generateImageList(command))
  
        // APIリクエストでSkillNameを取得
        if (selectedCharacter) {
          const response = await fetch(/api/${selectedCharacter}/${command})
          if (response.ok) {
            const data = await response.json()
            const skillName = data[0]?.SkillName || "Skill not found"
            setSkillNames((prev) => [...prev, skillName])
            console.log(skillName)
            console.log(skillNames)
            console.log(data)
          }
        }
      }
  
      setImageItems(images)
    }
  で出力が
  Skill not found 
  Array [ "Skill not found" ]
  
  Object { ID: 2, CharacterName: "Ryu", numPadInput: "623MP", SkillName: "中昇竜拳", commandImagePath: "/public/SF6Button/MP.png", HitParts: "Low" }
  ​になっているのでskillNameの処理が正しく行われてないと思われます
  必要に応じて変数名の変更なども行い修正してください
  2/2
  ChatGPT:
  ChatGPT
  
  問題は、skillName の状態更新が非同期で行われているため、skillNames の更新が完了する前に console.log が実行されていることが考えられます。このため、skillName が見つかった場合でも、Skill not found が出力されることがあります。
  
  以下のコードで修正してみてください：
  
  typescript
  
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
            const skillName = data[0]?.SkillName || "Skill not found"
            fetchedSkillNames.push(skillName)
          } else {
            fetchedSkillNames.push("Skill not found")
          }
        } catch (error) {
          fetchedSkillNames.push("Skill not found")
        }
      }
    }
  
    // 全てのリクエストが完了した後に状態を更新
    setSkillNames(fetchedSkillNames)
    setImageItems(images)
    console.log(fetchedSkillNames)
  }
  
  このコードでは、fetchedSkillNames という配列にすべてのスキル名を一時的に保存し、最後に一度だけ状態を更新します。これにより、スキル名が正しく取得され、Skill not found というメッセージが出る問題が解消されるはずです。
  あなた:
  TS71007: Props must be serializable for components in the "use client" entry file, "onCharacterSelect" is invalid.
  ChatGPT:
  ChatGPT
  
  このエラーは、props が client component でシリアライズ可能でなければならないことに起因しています。use client コンポーネントは、クライアントサイドでのみ動作し、サーバーサイドではないため、props は JSON 形式でシリアライズできる必要があります。
  
  onCharacterSelect 関数がシリアライズ可能でないというエラーが発生している場合、その原因としては、関数や非シリアライズ可能なオブジェクトが props に渡されている可能性があります。
  
  ここでは、シリアライズ可能な props を使用する方法と、エラーを回避するための解決策を示します。
  1. onCharacterSelect 関数をシリアライズ可能にする
  
  関数を props として渡すことはできません。代わりに、props に必要なデータだけを渡し、関数のロジックは client component 内で管理する方法が一般的です。
  2. コードの修正
  
  以下に、onCharacterSelect を渡すのではなく、CharacterSelect コンポーネント内で状態を管理し、状態変更のためのコールバック関数を定義する方法を示します。
  
  typescript
  
  // src/components/CharacterSelect.tsx
  "use client"
  
  import { useState, useEffect } from "react"
  
  // CharacterSelectコンポーネントのProps
  type CharacterSelectProps = {
    characters: string[]
    onCharacterSelect: (character: string) => void
  }
  
  const CharacterSelect: React.FC<CharacterSelectProps> = ({ characters, onCharacterSelect }) => {
    const [selectedCharacter, setSelectedCharacter] = useState<string>("")
  
    useEffect(() => {
      if (selectedCharacter) {
        onCharacterSelect(selectedCharacter)
      }
    }, [selectedCharacter, onCharacterSelect])
  
    return (
      <div className="relative flex flex-1 flex-shrink-0">
        <select
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          onChange={(e) => setSelectedCharacter(e.target.value)}
          value={selectedCharacter}
        >
          <option value="" disabled>
            Select a character
          </option>
          {characters.map((characterName, index) => (
            <option key={index} value={characterName}>
              {characterName}
            </option>
          ))}
        </select>
      </div>
    )
  }
  
  export default CharacterSelect
  
  3. CommandForm コンポーネントの修正
  
  CharacterSelect コンポーネントを使用する CommandForm コンポーネントの修正も行います。
  
  typescript
  
  // src/components/CommandForm.tsx
  "use client"
  
  import React, { useState, useEffect } from "react"
  import CommandInput from "@/src/app/components/CommandInput"
  import ImageList from "@/src/app/components/ImageList"
  import { generateImageList, ImageItem } from "@/src/app/util/imageUtl"
  import CharacterSelect from "@/src/app/components/CharacterSelect"
  import SkillNameList from "@/src/app/components/SkillNameList"
  
  const CommandForm: React.FC = () => {
    const [imageItems, setImageItems] = useState<ImageItem[]>([])
    const [skillNames, setSkillNames] = useState<string[]>([])
    const [characters, setCharacters] = useState<string[]>([])
    const [selectedCharacter, setSelectedCharacter] = useState<string>("")
  
    useEffect(() => {
      // キャラクターのリストを取得する例
      const fetchCharacters = async () => {
        const res = await fetch(`/api/characters`)
        const data = await res.json()
        setCharacters(data)
      }
  
      fetchCharacters()
    }, [])
  
    const handleCharacterSelect = (character: string) => {
      setSelectedCharacter(character)
    }
  
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
              const skillName = data[0]?.SkillName || "Skill not found"
              fetchedSkillNames.push(skillName)
            } else {
              fetchedSkillNames.push("Skill not found")
            }
          } catch (error) {
            fetchedSkillNames.push("Skill not found")
          }
        }
      }
  
      // 全てのリクエストが完了した後に状態を更新
      setSkillNames(fetchedSkillNames)
      setImageItems(images)
    }
  
    const handleClear = () => {
      setImageItems([])
      setSkillNames([])
    }
  
    return (
      <div>
        <CharacterSelect characters={characters} onCharacterSelect={handleCharacterSelect} />
        <CommandInput onConvert={handleConvert} onClear={handleClear} />
        <ImageList items={imageItems} />
        <SkillNameList skillNameList={skillNames} />
      </div>
    )
  }
  
  export default CommandForm
  
  このように、関数はコンポーネント内で定義し、props にはシリアライズ可能なデータのみを渡すことで、TS71007 エラーを回避できます。

- skillNamesの数が合わない



## 2024/08/22
- skilNameの数を調整


## typeとinterfaceの違い
`type` と `interface` の両方は、TypeScript でオブジェクトの形状を定義するために使用されますが、いくつかの違いがあります。

### 1. **宣言の仕方**
   - **`type`**: 一般的に型エイリアスを作成します。基本的な型の別名や、複雑な型の合成にも使用できます。
     ```typescript
     type SkillNameListProps = {
       skillNameList: string[]
     }
     ```
   - **`interface`**: オブジェクトの構造を定義します。クラスやオブジェクトの契約（形状）を指定するために使用されます。
     ```typescript
     interface SkillNameListProps {
       skillNameList: string[]
     }
     ```

### 2. **拡張性**
   - **`type`**: 複数の型を組み合わせることができますが、`type` 同士を直接拡張することはできません。代わりにユニオン型や交差型を使用します。
     ```typescript
     type SkillNameListProps = {
       skillNameList: string[]
     } & SomeOtherProps
     ```
   - **`interface`**: `interface` は他の `interface` を拡張することができ、複数の `interface` を継承することも可能です。
     ```typescript
     interface ExtendedSkillNameListProps extends SkillNameListProps {
       additionalProp: string
     }
     ```

### 3. **合成**
   - **`type`**: ユニオン型や交差型を使用して、複雑な型を合成できます。例えば、`type` でリテラル型や他の `type` を合成することができます。
     ```typescript
     type StringOrNumber = string | number
     type DetailedProps = SkillNameListProps & SomeOtherProps
     ```
   - **`interface`**: 型の合成には `extends` キーワードを使用します。

### 4. **用途**
   - **`type`**: より柔軟で、プリミティブ型、タプル、ユニオン型など、さまざまな型に対して使用できます。
   - **`interface`**: 主にオブジェクトの形状やクラスの定義に使用されます。

### 5. **実装の違い**
   - **`interface`**: クラスやオブジェクトが `interface` を実装することができます。
   - **`type`**: `type` はクラスの実装には使えません。

### 結論
- **`interface`**: 主にオブジェクトの形状を定義したり、複数のインターフェースを拡張する際に使います。
- **`type`**: より柔軟に型を表現したい場合や、ユニオン型や交差型を利用する際に使用します。

どちらを使うかは、具体的な要件やコードベースのスタイルに依存します。

- もう骨子はできたのかな？
- キャラ選択→プルダウンでできている
- 技名 -> 複数の出力に対応
- ボタン画像 -> 出力可能
![サンプル](./スクリーンショット%202024-08-22%2019.08.28.png)

## 2024/08/25

### DB設計

example

メイン

| ID  | タイトル | キャラ名        | 入力   | 技名       | 画像  | 前隙 | ダメージ|ガード硬直|削り|後隙|始動補正|コンボ補正|
| --- | ---     | ---           | ---    | ---       | ---  | ---  | ---   |---      |---|---|---    |---     |
|    | SF6     | Ryu           |236LP   |小波動拳    |画像パス|16    |600    |-5       | 0 | 47  |100%   |20%|
|    | SF6     | Ryu           |623LP   |小昇竜拳    |画像パス| 5    |1100   | -23    | 0 |33   |30%    |100%|
|    |鉄拳8     | KAZUYA MISHIMA|6N23RP  |最速風神拳  |画像パス|11    |23     |+5       |  1 |25|100%     | 60%|
|    | 鉄拳8    | KING          |463214LP|ジャイアントスイング|         |       |       |         |    |  |    |  |
||GGST|Kai||||
||GGST|BedMan|||


## 補正
- 通常補正
  - 100 -> 90 -> 80 -> 70 -> 60 -> 50 -> 40 -> 30 -> 20 -> 10 ->10 

- 始動補正
- 即時補正
- 乗算補正

- prismaは配列を参照できないんか．これはORM全体に共通するのかそれともprismaだけなんか？

---
## prisma

### DB検索apiの作成
`pages/api/route.ts` のコードは、Next.jsのAPIルートとして動作し、Prismaを使ってデータベースから特定のユーザーを検索する機能を提供します。以下に、各ブロックの詳細を説明します。
```prisma
model User{
id int
email string
name string?
}

```

1. インポート文

```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma/client';
```

- `NextApiRequest`と`NextApiResponse`は、Next.jsのAPIルートハンドラーで使われる型です。
  - `NextApiRequest`: リクエストオブジェクトの型。
  - `NextApiResponse`: レスポンスオブジェクトの型。
- `prisma`は、Prismaクライアントのインスタンスをインポートしています。これは、`prisma/client.ts`で設定したPrismaクライアントです。

2. ハンドラ関数の定義

```typescript
export default async function handler(req: NextApiRequest, res: NextApiResponse) 
```

- この関数がAPIリクエストを処理するメインのエクスポートです。
- `req`: クライアントからのリクエストを表します。
- `res`: クライアントへのレスポンスを表します。

 3. HTTPメソッドのチェック

```typescript
  if (req.method === 'GET') 
```

- リクエストのHTTPメソッドが`GET`であるかどうかを確認します。ここでは、`GET`メソッドのリクエストのみを処理します。

 4. クエリパラメータの取得と検証

```typescript
    const { email } = req.query;

    if (typeof email !== 'string') {
      res.status(400).json({ error: 'Invalid email format' });
      return;
    }
```

- クエリパラメータから`email`を取得します。
- `email`が文字列であることを確認します。そうでない場合、400ステータスコード（Bad Request）とエラーメッセージを返します。

 5. データベース検索とレスポンス

```typescript
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  
```

- `prisma.user.findUnique`を使用して、`email`に一致するユーザーをデータベースから検索します。
- ユーザーが見つかった場合、200ステータスコードと共にユーザー情報をJSON形式で返します。
- ユーザーが見つからない場合、404ステータスコード（Not Found）とエラーメッセージを返します。
- エラーハンドリングとして、データベース検索中にエラーが発生した場合、500ステータスコード（Internal Server Error）とエラーメッセージを返します。

6. 非対応メソッドのハンドリング

```typescript
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }

```

- `GET`メソッド以外のリクエストが来た場合、405ステータスコード（Method Not Allowed）とエラーメッセージを返します。

7. まとめたコード

```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { ${email} } = req.query;

    if (typeof ${email} !== 'string') {
      res.status(400).json({ error: 'Invalid email format' });
      return;
    }

    try {
      const user = await prisma.user.findUnique({
        where: { ${email} },
      });

      if (user) {
        res.status(200).json(${user});
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
```

このAPIルートは、指定されたメールアドレスに基づいてユーザーを検索し、結果をクライアントに返します。HTTPメソッドの制御やエラーハンドリングも含まれています。

### 上記APIの使用

Next.jsのApp Routerで`app/page.tsx`からこのAPIを使用するには、`fetch`関数を使ってAPIエンドポイントにリクエストを送信し、その結果をページに表示します。以下にその手順を説明します。

#### ステップ1: APIルートを確認

前述のAPIルート`pages/api/route.ts`は、`/api/search`エンドポイントとして動作します。例えば、`http://localhost:3000/api/search?email=test@example.com`のようなリクエストが可能です。

#### ステップ2: `app/page.tsx`でAPIを呼び出す

`app/page.tsx`ファイルを作成し、クライアントサイドでAPIを呼び出すコードを追加します。

```tsx
// app/page.tsx
'use client';

import { useState } from 'react';

export default function Page() {
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/search?email=${email}`);
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
        setUserData(null);
      }
    } catch (err) {
      setError('Failed to fetch user data');
      setUserData(null);
    }
  };

  return (
    <div>
      <h1>Search User</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {userData && (
        <div>
          <h2>User Details</h2>
          <p>ID: {userData.id}</p>
          <p>Email: {userData.email}</p>
          <p>Name: {userData.name}</p>
        </div>
      )}
    </div>
  );
}
```

#### 各ブロックの説明

1. **React Hooksのインポートとステートの定義**

```tsx
import { useState } from 'react';

const [email, setEmail] = useState('');
const [userData, setUserData] = useState(null);
const [error, setError] = useState(null);
```

- `useState`フックを使って、入力されたメールアドレス、取得したユーザーデータ、エラーメッセージを管理します。

2. **検索ハンドラの定義**

```tsx
const handleSearch = async () => {
  try {
    const response = await fetch(`/api/search?email=${email}`);
    if (response.ok) {
      const data = await response.json();
      setUserData(data);
      setError(null);
    } else {
      const errorData = await response.json();
      setError(errorData.error);
      setUserData(null);
    }
  } catch (err) {
    setError('Failed to fetch user data');
    setUserData(null);
  }
};
```

- `handleSearch`関数は、`fetch`を使ってAPIエンドポイントにリクエストを送信します。
- レスポンスが成功した場合、ユーザーデータをステートに保存し、エラーをクリアします。
- エラーレスポンスの場合、エラーメッセージをステートに保存し、ユーザーデータをクリアします。
- 例外が発生した場合、エラーメッセージをステートに保存します。

3. **コンポーネントのレンダリング**

```tsx
return (
  <div>
    <h1>Search User</h1>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter email"
    />
    <button onClick={handleSearch}>Search</button>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    {userData && (
      <div>
        <h2>User Details</h2>
        <p>ID: {userData.id}</p>
        <p>Email: {userData.email}</p>
        <p>Name: {userData.name}</p>
      </div>
    )}
  </div>
);
```

- ユーザーインターフェイスを構築します。
  - メールアドレスを入力するためのテキストフィールド。
  - 検索ボタン。
  - エラーメッセージを表示するためのエリア。
  - ユーザーデータを表示するためのエリア。

これで、`app/page.tsx`からAPIを呼び出し、ユーザーを検索してその結果を表示することができます。

## tailwind


## next
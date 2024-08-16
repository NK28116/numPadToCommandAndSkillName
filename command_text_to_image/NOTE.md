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
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
```

- この関数がAPIリクエストを処理するメインのエクスポートです。
- `req`: クライアントからのリクエストを表します。
- `res`: クライアントへのレスポンスを表します。

 3. HTTPメソッドのチェック

```typescript
  if (req.method === 'GET') {
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
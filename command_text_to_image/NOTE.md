# NOTE
メモとか新規に学習したメソッドとか見落としてたやつとか
ｓｑｌ変更したら前使ってた．ｓｑｌは削除しないとダメ
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


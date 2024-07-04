```
src
├── README.md
├── app
│   ├── README_FOR_app.md
│   ├── api :データベースに関連するAPIエンドポイント
│   │   ├── country
│   │   │   ├── [continent].ts　特定の大陸のデータを取得するためのAPIエンドポイント。
│   │   │   ├── [slug] ：特定のスラッグ（動的ルート）に関連するデータを処理するためのエンドポイント
│   │   │   │   └── route.ts
│   │   │   └── route.ts：国に関連するデータを処理するための一般的なエンドポイント。
│   │   └── search:検索に関連するデータを処理するAPIエンドポイント
│   │       └── route.ts
│   ├── components
│   │   ├── CommandForm.tsx : コマンド入力フォームのコンポーネント。
│   │   ├── CommandInput.tsx: ：コマンド入力フィールドのコンポーネント。
│   │   ├── ImageList.tsx 画像リストのコンポーネント。
│   │   ├── README.md
│   │   └── Search.tsx 検索機能に関連するコンポーネント。
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── searchData
│   │   ├── [continent]
│   │   │   └── page.tsx：特定の大陸の検索結果ページ。
│   │   └── page.tsx ：一般的な検索結果ページ。
│   ├── template.tsx
│   └── util
│       ├── csvUtil.tsx 画像配列を処理するためのユーティリティ関数
│       └── imageUtl.tsx 画像処理に関連するユーティリティ関数。
└── lib
    └── prismaClient.ts
```









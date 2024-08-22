# components

## 概要

## 各ファイルの機序

### src/components/CommandForm.tsx

#### 概要
`CommandForm`コンポーネントは、ユーザーがコマンドを入力し、そのコマンドに対応する画像を表示するためのフォームを提供します。このコンポーネントは、`CommandInput`コンポーネントと`SkillName`コンポーネントを使用して構築されています。

#### 使用方法


### src/components/CommandInput.tsx

#### 概要
`CommandInput`コンポーネントは、ユーザーがコマンドを入力し、それを変換またはクリアするための入力フィールドとボタンを提供します。変換ボタンがクリックされると、入力されたコマンドが親コンポーネントに渡されます。

#### 使用方法
`CommandInput`は通常、`CommandForm`コンポーネント内で使用されます。


### src/components/SkillName.tsx

#### 概要
`SkillName`コンポーネントは、与えられた画像アイテムのリストを表示します。各画像アイテムには、画像のURLと説明が含まれます。

#### 使用方法
`SkillName`は通常、`CommandForm`コンポーネント内で使用されます。

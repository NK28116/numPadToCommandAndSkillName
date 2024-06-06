# util

## 概要
画像関連のutl
## 各ファイルの機序

### imageUtl.tsx

#### 関数
- `generateImageList(inputArray: string): ImageItem[]`:
  入力された文字列を解析し、それに対応する画像アイテムのリストを生成します。

- `spiltInputArray(inputText: string): ImageItem[]`:
  入力された文字列を区切り文字で分割し、それに対応する画像アイテムのリストを生成します。

 console.log(generateImageList("234MK"))
  

  [LOG]: [{
  "value": "2",
  "image": "/2.png",
  "key": 0
}, {
  "value": "3",
  "image": "/3.png",
  "key": 1
}, {
  "value": "4",
  "image": "/4.png",
  "key": 2
}, {
  "value": "MK",
  "image": "/MK.png",
  "key": 3
}] 

console.log(spiltInputArray("a--bc"))
[LOG]: [{
  "value": "a",
  "image": "/a.png",
  "key": 0
}, {
  "value": "bc",
  "image": "/bc.png",
  "key": 1
}] 
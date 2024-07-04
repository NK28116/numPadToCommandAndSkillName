# util

## 概要

## 各ファイルの機序

### imageUtl.tsx

#### 関数
- `generateImageList(inputArray: string): ImageItem[]`:
  入力された文字列を解析し、それに対応する画像アイテムのリストを生成します。

- `spiltInputArray(inputText: string): ImageItem[]`:
  入力された文字列を区切り文字で分割し、それに対応する画像アイテムのリストを生成します。

 ### csvUtl.tsx
 csvファイルのバイナリーデータを受け取りJavaScriptオブジェクトの配列に変換
 
#### parseCSV
- 引数 fileBuffer CSVファイルのバイナリデータ
- 返り値 解析されたデータを含むPromise オブジェクト

#### Readableストリーム
バッファからストリームを作成
ストリームをcsv-parserにパイプ
dataイベントで結果をresults配列にプッシュ
全てのデータが処理されるとendイベントが発火
バッファをプッシュして終了


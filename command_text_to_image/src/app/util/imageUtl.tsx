// src/utils/imageUtils.ts
/**
 * input=623MK
 * output=6.png,2.png,3.png,MK.png
 * image=(pubilc)/**.pngという表記
 */

export type ImageItem = {
  value: string
  image: string
  key: number
}

export const generateImageList = (inputArray: string): ImageItem[] => {
  const result: ImageItem[] = []
  let i = 0

  while (i < inputArray.length) {
    const char = inputArray[i]

    if (!isNaN(Number(char))) {
      // 数字の場合
      result.push({
        value: char,
        image: `/directionVector/${char}.png`,
        key: i,
      })
      i++
    } else {
      // 文字列の場合
      const str = inputArray.substring(i, i + 2)
      result.push({
        value: str,
        image: `/SF6Button/${str}.png`,
        key: i,
      })
      i += 2
    }
  }
  const arrow = "combine"
  result.push({
    value: arrow,
    image: `/directionVector/combineVectorbar.png`,
    key: i,
  })
  return result
}

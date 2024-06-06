// src/utils/imageUtils.ts
'use client'
export type ImageItem = {
    value: string;
    image: string;
    key: number;
  };
  
  export const generateImageList = (inputArray: string): ImageItem[] => {
    const result: ImageItem[] = [];
    let i = 0;
  
    while (i < inputArray.length) {
      const char = inputArray[i];
  
      if (!isNaN(Number(char))) { // 数字の場合
        result.push({
          value: char,
          image: `/${char}.png`,
          key: i
        });
        i++;
      } else { // 文字列の場合
        const str = inputArray.substring(i, i + 2);
        result.push({
          value: str,
          image: `/${str}.png`,
          key: i
        });
        i += 2;
      }
    }
  
    return result;
  };
  
  export const spiltInputArray = (inputText: string): ImageItem[] => {
    return inputText.split("--").map((item, index) => {
      const trimmedItem = item.trim();
      if (trimmedItem !== "") {
        return {
          value: trimmedItem,
          image: `/${trimmedItem}.png`,
          key: index, // 画像リスト内の各要素に一意のキーを追加する
        };
      }
      return null; // エラー処理など
    }).filter(item => item !== null) as ImageItem[];
  };
  
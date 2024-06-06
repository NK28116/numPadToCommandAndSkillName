/**
 * #GOAL: テンキー入力-> 入力画像、技名表示
 * ex:
 * input=236MK-623MP
 * output=中竜巻旋風脚 - 中波動拳
 * 
 * #WAY:
 * 1. 入力されたString配列(配列1)を区切り文字で分割
 * 2. 分割された文字列をさらに[number[]string(H or M or L)string(P or K)](配列2)としてstringに分割
 * 3. それぞれのstringに対応した画像を出力しその順番で並べる
 * 4. 配列2に対応した技名をDBから持ってきて並べる
 * 
 * 
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type FormData = {
  command: string;
};
type textImage = {
  value: string;
  image: string;
};

type stringImage = {
  value: string;
  image: string;
  key: number;
};

export default function Page() {
  const router = useRouter();
  const { handleSubmit, register } = useForm<FormData>();
  ///TODO 今後componentに分けていく関数
  /**
   * 引数inputText:stringをstring[]にする
   * TODO:特定の日本語からもできるようにしたい
   * @param input
   *
   * const inputText="a--bc--cde-fghi--jk--l"
   * console.log(spiltInputArray(inputText))
   *  [
   *  {"value": "a","image": "/a.png" },
   *  {"value": "bc","image": "/bc.png"},
   *  {"value": "cde-fghi", "image": "/cde-fghi.png" },
   *  {"value": "jk","image": "/jk.png" },
   *  {"value": "l","image": "/l.png"}
   *  ]
   */
  const spiltInputArray = (inputText: string) => {
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
    });
  };

  /**
   *配列の各要素に対応する/$value.pngに変換する
   * @param arrayText spiltInputArray(inputText)
   */
  const convertTextToImage = (arrayText: textImage[]) => {
    return (
      <>
        {arrayText.map((item, index) => {
          if (item !== null) {
            return <img key={index} src={item.image} alt={`Image ${index}`} />;
          } else {
            return null; // エラー処理など
          }
        })}
      </>
    );
  };


  /** 
   * number+stringの配列に対応する画像を出力する
  */
  const generateImageList = (inputArray: string): stringImage[] => {
    const result: stringImage[] = [];
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

const [command, setCommand] = useState("");
const [imageURL, setImageURL] = useState("");
 const handleConvertButtonClick = () => {
     // ファイル名から画像のURLを生成する
     const imageURL = `/${command}.png`; // ここでは仮に ".png" 拡張子を付けたとしています
     setImageURL(imageURL);
   };

  const handleClearButtonClick = () => {
    setImageURL("");
    setCommand("")
  };
  return (
    <>
      <div //表示したいページ
        className="outline"
      >
        <input
          value={command}
          onChange={(e) => setCommand(e.target.value)}
        />

        <button type="button" onClick={handleConvertButtonClick}>
          テキストを変換
        </button>
        <button type="button" onClick={handleClearButtonClick}>
          テキストをクリア
        </button>
{/* ファイル名が空でない場合にのみ画像を表示 */}
        {imageURL && (
          <img src={imageURL} alt="画像" />
        )}
      </div>
    </>
  );
}

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
   * 入力された文字列に特定の文字列があった場合その文字列の色を変換する
   * @param arrayText spiltInputArray(inputText)
   * 
   * 
   */
  const changeStringColor=()=>{}

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

'use client'

import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

type FormData = {
    command: string
}
type textImage={
    value:string
    image:string
}

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
    return inputText.split("--").map((item) => {
        if (item.trim() !== "") {
            return {
                value: item.trim(),
                image: `/${item.trim()}.png`
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
    return arrayText.map((item, index) => {
        if (item !== null) {
            return
                <img src={item.image}/>
        }
        return null; // エラー処理など
    });
};

export default function Page() {
    const router = useRouter()
    const { handleSubmit, register } = useForm<FormData>()

    return (
        <>
            <form >
                <div className="outline">
                    <input
                        {...register('command')}
                        placeholder="Command"
                    />
                    <button
                        className="text-3xl font-semibold underline"
                        type="submit"
                    >
                        Convert
                    </button>
                </div>
            </form>
            <div className="debug">
                <img src={`/a.png`}  />
                <div>
                    {/*input={`${convertImageArray[0]}`}*/}
                </div>
            </div>
        </>
    )
}

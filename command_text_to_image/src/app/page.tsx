'use client'

import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

type FormData = {
  command: string
}

/**
* 引数inputText:stringをstring[]にして
* 各要素に対応するPNGを出力
* @param input
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

const convertTextToImage = (inputText: string) => {
    const inputArray = spiltInputArray(inputText);
    return inputArray.map((item, index) => {
        if (item !== null) {
            return {
                value: item.value,
                image: item.image
            };
        }
        return null; // エラー処理など
    });
};

export default function Page() {
    const router = useRouter()
    const { handleSubmit, register } = useForm<FormData>()


    /**
    * 文字変換ロジック
    * 大文字から小文字へ
    * TODO:日本語も
    * @param data
    */

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

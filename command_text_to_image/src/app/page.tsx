'use client'

import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

type FormData = {
command: string
}

/**
* 引数inputText:stringをstring[]に
* @param input
*/
const convertInputString = (inputText: string) => {
    return inputText.split("--").map((item) => ({ value: item }));
}
export default function Page() {

    const router = useRouter()
    const { handleSubmit, register } = useForm<FormData>()
{/**
 * 文字変換ロジック
 * 大文字から小文字へ
 * TODO:日本語も
 * @param data
 */
}
const onSubmit: SubmitHandler<FormData> = (data) => {
    const inputArray = convertInputString(data.command); // フォームに入力された文字列を処理
    const convertImageArray = inputArray.map((item, index) => {
      if ('value' in item) {
        return {
          value: item.value,
          image: `../${item.value}.png`
        };
      }
      return null; // エラー処理など
    });
    console.log(convertImageArray); // フォームに入力された文字列に対応する画像の配列を表示
  };

return (
  <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="outline">
            <input
              {...register('command')}
              placeholder="Command"
            />
            <button
              className="text-3xl font-semibold underline"
              type="submit">
              Convert
            </button>
          </div>
        </form>
      </>
    )

}

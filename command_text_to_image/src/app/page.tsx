'use client'

import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

type FormData = {
command: string
}
/** Submit ボタンを押したときの処理 */
const onSubmit: SubmitHandler<FormData> = (data) => {
  // data には FormData 型の値が入っている
    alert(JSON.stringify(data, null, 2))
}
export default function Page() {

    const router = useRouter()
    const { handleSubmit, register } = useForm<FormData>()

return (
    <>{/*
        <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded-full"
        onClick={() => router.push('/day')}>
        dayへ
        </button>
        <button
        className="text-3xl font-bold underline"
        onClick={() => router.push('/about')}>
        aboutへ
        </button>
*/}
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="outline">
            <input
            className="underline "
                {...register('command')}
                placeholder="Comamnd"
            />
            <button
                className="text-3xl font-semibold underline"
                type="submit">
                convert
            </button>
            </div>

            <div>
            ImageArray
            </div>
        </form>
    </>
    )

}

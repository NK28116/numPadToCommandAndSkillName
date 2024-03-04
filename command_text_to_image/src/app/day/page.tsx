'use client'
import { useRouter } from 'next/navigation'

export default function Page() {
const router = useRouter()
  return (
    <>
        <button type="button" className="bg-red-500 hover:bg-red-700 text-white
        font-bold py-2 px-4 m-4 rounded-full"
        onClick={() => router.push('/')}>
        戻る
        </button>
    </>
  )
}
'use client'
 
import { useRouter } from 'next/navigation'
 
export default function Page() {
const router = useRouter()
  return (
    <>
        <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded-full" onClick={() => router.push('/day')}>
        dayへ
        </button>
        <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded-full" onClick={() => router.push('/about')}>
        aboutへ
        </button>   
    </>
  )
}

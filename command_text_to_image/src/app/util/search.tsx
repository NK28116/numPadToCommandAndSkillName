"use client"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useState } from "react"

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams()
  const pathname = usePathname() //http://localhost:3000/searchData
  const { replace } = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  //http://localhost:3000/api/country/Asia ,Europe....
  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams) //null可能性
    replace(`/api/country/${term}`)
  }

  return (
    <>
      <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder={placeholder}
          onChange={(e) => {
            setSearchTerm(e.target.value)
          }}
        />
        <button
          onClick={(e) => {
            handleSearch(searchTerm)
          }}
        >
          search
        </button>
      </div>
    </>
  )
}

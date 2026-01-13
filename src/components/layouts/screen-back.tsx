'use client'

import { useRouter } from 'next/navigation'
import { TbChevronLeft } from 'react-icons/tb'

export const ScreenBack = () => {
  const router = useRouter()

  return (
    <button className="-ml-4 p-4" onClick={router.back}>
      <TbChevronLeft size={24} />
    </button>
  )
}

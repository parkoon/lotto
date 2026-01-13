'use client'

import { useRouter } from 'next/navigation'

import { Screen } from '@/components/layouts/screen'
import { BottomFixedArea } from '@/components/ui/bottom-fixed-area'
import { Button } from '@/components/ui/button'

const NotFound = () => {
  const router = useRouter()
  return (
    <Screen withSidePadding>
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="leading-relaxed text-gray-600">
          요청하신 페이지가 존재하지 않거나 <br />
          주소가 변경되었을 수 있습니다.
        </p>
      </div>

      <BottomFixedArea>
        <Button onClick={() => router.replace('/')}>홈으로 돌아가기</Button>
      </BottomFixedArea>
    </Screen>
  )
}

export default NotFound

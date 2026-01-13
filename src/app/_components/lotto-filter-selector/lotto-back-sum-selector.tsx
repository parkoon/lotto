'use client'

import { Slider } from '@/components/ui/slider'
import { useFilterStore } from '@/store/filter-store'

/**
 * 로또 뒷수합 필터 컴포넌트
 * 뒤 3개 번호의 합을 독립적으로 설정
 */
export const LottoBackSumSelector = () => {
  // zustand store에서 직접 상태와 액션 가져오기
  const { backSum, setBackSum } = useFilterStore()

  const handleRangeChange = (value: number[]) => {
    const [min, max] = value
    setBackSum({ min, max })
  }

  const MIN_VALUE = 12 // 3+4+5 = 12
  const MAX_VALUE = 132 // 43+44+45 = 132

  const { min: minSum, max: maxSum } = backSum.value

  return (
    <div className="space-y-6">
      {/* 범위 슬라이더 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            뒷수합 범위
          </label>
          <div className="flex items-center gap-2 text-sm font-bold text-lime-600">
            <span>{minSum}</span>
            <span className="text-gray-400">~</span>
            <span>{maxSum}</span>
          </div>
        </div>

        <Slider
          value={[minSum, maxSum]}
          onValueChange={handleRangeChange}
          min={MIN_VALUE}
          max={MAX_VALUE}
          step={1}
          className="w-full"
        />

        <div className="flex justify-between text-xs text-gray-500">
          <span>최소 {MIN_VALUE}</span>
          <span>최대 {MAX_VALUE}</span>
        </div>
      </div>

      {/* 참고 정보 */}
      <div className="space-y-1 text-xs text-gray-500">
        <p>• 뒷수합은 뒤 3개 번호의 합입니다</p>
        <p>• 예시: 25, 33, 41일 때 뒷수합 = 99</p>
        <p>• 일반적으로 70~120 범위에서 자주 출현합니다</p>
      </div>
    </div>
  )
}

'use client'

import { Slider } from '@/components/ui/slider'
import { useFilterStore } from '@/store/filter-store'

/**
 * 로또 끝수합 필터 컴포넌트
 * 각 번호의 일의 자리 합을 독립적으로 설정
 */
export const LottoLastDigitSumSelector = () => {
  // zustand store에서 직접 상태와 액션 가져오기
  const { lastDigitSum, setLastDigitSum } = useFilterStore()

  const handleRangeChange = (value: number[]) => {
    const [min, max] = value
    setLastDigitSum({ min, max })
  }

  const MIN_VALUE = 15 // 10,21,32,43,54,65 → 0+1+2+3+4+5 = 15
  const MAX_VALUE = 52 // 9,19,29,39,8,18 → 9+9+9+9+8+8 = 52

  const { min: minSum, max: maxSum } = lastDigitSum.value

  return (
    <div className="space-y-6">
      {/* 범위 슬라이더 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            끝수합 범위
          </label>
          <div className="flex items-center gap-2 text-sm font-bold text-violet-600">
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
        <p>• 끝수합은 각 번호의 일의 자리 합입니다</p>
        <p>• 예시: 5, 12, 23, 31, 40, 45 → 5+2+3+1+0+5 = 16</p>
        <p>• 일반적으로 20~35 범위에서 자주 출현합니다</p>
      </div>
    </div>
  )
}

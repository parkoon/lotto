'use client'

import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { useFilterStore } from '@/store/filter-store'

/**
 * 로또 앞수합 필터 컴포넌트
 * 첫 3개 번호의 합을 독립적으로 설정
 */
export const LottoFrontSumSelector = () => {
  // zustand store에서 직접 상태와 액션 가져오기
  const { frontSum, setFrontSum } = useFilterStore()

  const handleRangeChange = (value: number[]) => {
    const [min, max] = value
    setFrontSum({ min, max })
  }

  const MIN_VALUE = 6 // 1+2+3 = 6
  const MAX_VALUE = 129 // 실제 최대값

  const { min: minSum, max: maxSum } = frontSum.value

  return (
    <div className={cn('space-y-6', !frontSum.enabled && 'opacity-50')}>
      <div className="space-y-4">
        {/* 범위 슬라이더 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              앞수합 범위
            </label>
            <div className="flex items-center gap-2 text-sm font-bold text-amber-600">
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
            disabled={!frontSum.enabled}
          />
        </div>

        <div className="flex justify-between text-xs text-gray-500">
          <span>최소 {MIN_VALUE}</span>
          <span>최대 {MAX_VALUE}</span>
        </div>
      </div>

      {/* 참고 정보 */}
      <div className="space-y-1 text-xs text-gray-500">
        <p>• 앞수합은 첫 3개 번호의 합입니다</p>
        <p>• 예시: 1, 5, 12일 때 앞수합 = 18</p>
        <p>• 일반적으로 30~80 범위에서 자주 출현합니다</p>
      </div>
    </div>
  )
}

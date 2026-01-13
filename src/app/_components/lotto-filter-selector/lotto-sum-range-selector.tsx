'use client'

import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { useFilterStore } from '@/store/filter-store'

/**
 * 로또 번호 총합 범위 선택 컴포넌트
 * 21(최소)부터 255(최대)까지 범위 설정 가능
 */
export const LottoSumRangeSelector = () => {
  // zustand store에서 직접 상태와 액션 가져오기
  const { sumRange, setSumRange } = useFilterStore()

  const MIN_POSSIBLE = 21 // 1+2+3+4+5+6
  const MAX_POSSIBLE = 255 // 40+41+42+43+44+45

  const handleRangeChange = (value: number[]) => {
    const [min, max] = value
    setSumRange({ min, max })
  }

  const { min: minSum, max: maxSum } = sumRange.value

  return (
    <div className={cn('space-y-6', !sumRange.enabled && 'opacity-50')}>
      <div className="space-y-4">
        <div className="space-y-4">
          {/* 범위 슬라이더 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                총합 범위
              </label>
              <div className="flex items-center gap-2 text-sm font-bold text-blue-600">
                <span>{minSum}</span>
                <span className="text-gray-400">~</span>
                <span>{maxSum}</span>
              </div>
            </div>

            <Slider
              value={[minSum, maxSum]}
              onValueChange={handleRangeChange}
              min={MIN_POSSIBLE}
              max={MAX_POSSIBLE}
              step={1}
              className="w-full"
              disabled={!sumRange.enabled}
            />

            <div className="flex justify-between text-xs text-gray-500">
              <span>{MIN_POSSIBLE}</span>
              <span>{MAX_POSSIBLE}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

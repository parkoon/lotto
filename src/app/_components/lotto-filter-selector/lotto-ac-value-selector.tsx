'use client'

import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { useFilterStore } from '@/store/filter-store'

/**
 * 로또 AC값(산술적 복잡성) 필터 컴포넌트
 * Arithmatic Complexity - 번호 조합의 패턴 복잡도를 나타냄
 */
export const LottoACValueSelector = () => {
  // zustand store에서 직접 상태와 액션 가져오기
  const { acRange, setACRange } = useFilterStore()

  const handleACRangeChange = (value: number[]) => {
    const [min, max] = value
    setACRange({ min, max })
  }

  const { min: minAC, max: maxAC } = acRange.value

  return (
    <div className={cn('space-y-6', !acRange.enabled && 'opacity-50')}>
      <div className="space-y-4">
        <div className="space-y-4">
          {/* AC값 범위 슬라이더 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                AC값 범위
              </label>
              <div className="flex items-center gap-2 text-sm font-bold text-purple-600">
                <span>{minAC}</span>
                <span className="text-gray-400">~</span>
                <span>{maxAC}</span>
              </div>
            </div>

            <Slider
              value={[minAC, maxAC]}
              onValueChange={handleACRangeChange}
              min={0}
              max={10}
              step={1}
              className="w-full"
              disabled={!acRange.enabled}
            />

            <div className="flex justify-between text-xs text-gray-500">
              <span>0</span>
              <span>10</span>
            </div>
          </div>
        </div>
      </div>

      {/* AC값 설명 */}
      <div className="space-y-1 text-xs text-gray-500">
        <p>• AC값이 높을수록 번호들이 고르게 분포되어 있음을 의미합니다</p>
        <p>• AC값이 낮을수록 연속된 번호나 패턴이 많음을 의미합니다</p>
        <p>• 일반적으로 AC값 7~9 범위에서 당첨번호가 자주 출현합니다</p>
      </div>
    </div>
  )
}

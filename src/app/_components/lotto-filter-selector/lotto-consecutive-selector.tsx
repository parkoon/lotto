'use client'

import { Slider } from '@/components/ui/slider'
import { useFilterStore } from '@/store/filter-store'

/**
 * 로또 연속수 필터 컴포넌트
 * 연속수 개수를 독립적으로 설정하고 토글로 활성화/비활성화
 */
export const LottoConsecutiveSelector = () => {
  // zustand store에서 직접 상태와 액션 가져오기
  const { consecutive, setConsecutiveRange } = useFilterStore()

  // 컴포넌트 내부 상태로 활성화 여부 관리

  // 안전한 값 접근 (방어 코드)
  const safeValue = {
    min:
      typeof consecutive.value === 'object' &&
      consecutive.value &&
      typeof consecutive.value.min === 'number'
        ? consecutive.value.min
        : 1,
    max:
      typeof consecutive.value === 'object' &&
      consecutive.value &&
      typeof consecutive.value.max === 'number'
        ? consecutive.value.max
        : 1,
  }

  const handleCountChange = (value: number[]) => {
    setConsecutiveRange({ min: value[0], max: value[1] })
  }

  return (
    <div className="space-y-6">
      {/* 연속수 개수 슬라이더 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            연속수 개수 범위
          </label>
          <span className="text-sm font-bold text-emerald-600">
            {safeValue.min === safeValue.max
              ? `${safeValue.min}개`
              : `${safeValue.min}-${safeValue.max}개`}
          </span>
        </div>

        <Slider
          value={[safeValue.min, safeValue.max]}
          onValueChange={handleCountChange}
          min={0}
          max={4}
          step={1}
          className="w-full"
        />

        <div className="flex justify-between text-xs text-gray-500">
          <span>0개</span>
          <span>4개</span>
        </div>
      </div>
    </div>
  )
}

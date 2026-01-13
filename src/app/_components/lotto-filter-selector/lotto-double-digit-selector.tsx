'use client'

import { Slider } from '@/components/ui/slider'
import { useFilterStore } from '@/store/filter-store'

/**
 * 로또 두 자리수 필터 컴포넌트
 * 두 자리수 개수를 독립적으로 설정하고 토글로 활성화/비활성화
 */
export const LottoDoubleDigitSelector = () => {
  // zustand store에서 직접 상태와 액션 가져오기
  const { doubleDigit, setDoubleDigitRange } = useFilterStore()

  // 안전한 값 접근 (방어 코드)
  const safeValue = {
    min:
      typeof doubleDigit.value === 'object' &&
      doubleDigit.value &&
      typeof doubleDigit.value.min === 'number'
        ? doubleDigit.value.min
        : 0,
    max:
      typeof doubleDigit.value === 'object' &&
      doubleDigit.value &&
      typeof doubleDigit.value.max === 'number'
        ? doubleDigit.value.max
        : 0,
  }

  // 두 자리수 목록 (36개: 10-45)
  const doubleDigitNumbers = Array.from({ length: 36 }, (_, i) => i + 10)

  const handleCountChange = (value: number[]) => {
    setDoubleDigitRange({ min: value[0], max: value[1] })
  }

  return (
    <div className="space-y-6">
      {/* 두 자리수 개수 슬라이더 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            두 자리수 개수 범위
          </label>
          <span className="text-sm font-bold text-purple-600">
            {safeValue.min === safeValue.max
              ? `${safeValue.min}개`
              : `${safeValue.min}-${safeValue.max}개`}
          </span>
        </div>

        <Slider
          value={[safeValue.min, safeValue.max]}
          onValueChange={handleCountChange}
          min={0}
          max={6}
          step={1}
          className="w-full"
        />

        <div className="flex justify-between text-xs text-gray-500">
          <span>0개</span>
          <span>6개</span>
        </div>
      </div>

      {/* 두 자리수 목록 표시 */}
      <div className="space-y-1">
        <div className="text-sm font-medium text-gray-700">
          두 자리수 목록 (36개)
        </div>
        <span className="text-sm text-gray-600">
          {doubleDigitNumbers.join(', ')}
        </span>
      </div>
    </div>
  )
}

'use client'

import { Slider } from '@/components/ui/slider'
import { useFilterStore } from '@/store/filter-store'

/**
 * 로또 소수 필터 컴포넌트
 * 소수 개수를 독립적으로 설정
 */
export const LottoPrimeSelector = () => {
  // zustand store에서 직접 상태와 액션 가져오기
  const { prime, setPrimeRange } = useFilterStore()

  // 안전한 값 접근 (방어 코드)
  const safeValue = {
    min:
      typeof prime.value === 'object' &&
      prime.value &&
      typeof prime.value.min === 'number'
        ? prime.value.min
        : 2,
    max:
      typeof prime.value === 'object' &&
      prime.value &&
      typeof prime.value.max === 'number'
        ? prime.value.max
        : 2,
  }

  // 소수 목록 (14개)
  const primeNumbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43]

  const handleCountChange = (value: number[]) => {
    setPrimeRange({ min: value[0], max: value[1] })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* 소수 개수 슬라이더 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              소수 개수 범위
            </label>
            <span className="text-sm font-bold text-red-600">
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
      </div>

      {/* 소수 목록 표시 */}
      <div className="space-y-1">
        <h4 className="text-sm font-medium text-gray-700">소수 목록 (14개)</h4>
        <span className="text-sm text-gray-600">{primeNumbers.join(', ')}</span>
      </div>
    </div>
  )
}

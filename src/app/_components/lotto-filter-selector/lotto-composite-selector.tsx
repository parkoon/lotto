'use client'

import { Slider } from '@/components/ui/slider'
import { useFilterStore } from '@/store/filter-store'
// 합성수 목록 (1-45 중 소수와 1 제외) (29개)
const compositeNumbers = [
  4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28, 30, 32,
  33, 34, 35, 36, 38, 39, 40, 42, 44, 45,
]
/**
 * 로또 합성수 필터 컴포넌트
 * 합성수 개수를 독립적으로 설정
 */
export const LottoCompositeSelector = () => {
  // zustand store에서 직접 상태와 액션 가져오기
  const { composite, setCompositeRange } = useFilterStore()

  // 안전한 값 접근 (방어 코드)
  const safeValue = {
    min:
      typeof composite.value === 'object' &&
      composite.value &&
      typeof composite.value.min === 'number'
        ? composite.value.min
        : 4,
    max:
      typeof composite.value === 'object' &&
      composite.value &&
      typeof composite.value.max === 'number'
        ? composite.value.max
        : 4,
  }

  const handleCountChange = (value: number[]) => {
    setCompositeRange({ min: value[0], max: value[1] })
  }

  return (
    <div className="space-y-6">
      {/* 합성수 개수 슬라이더 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            합성수 개수 범위
          </label>
          <span className="text-sm font-bold text-indigo-600">
            {safeValue.min === safeValue.max
              ? `${safeValue.min}개`
              : `${safeValue.min}-${safeValue.max}개`}
          </span>
        </div>

        <div className="px-3">
          <Slider
            value={[safeValue.min, safeValue.max]}
            onValueChange={handleCountChange}
            min={0}
            max={6}
            step={1}
            className="w-full"
          />
        </div>

        <div className="flex justify-between text-xs text-gray-500">
          <span>0개</span>
          <span>6개</span>
        </div>
      </div>

      {/* 합성수 목록 표시 */}
      <div className="space-y-1">
        <div className="text-sm text-gray-700">합성수 목록 (29개)</div>
        <div className="text-sm text-gray-600">
          {compositeNumbers.join(', ')}
        </div>
      </div>
    </div>
  )
}

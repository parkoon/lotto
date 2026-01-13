'use client'

import { Slider } from '@/components/ui/slider'
import { useFilterStore } from '@/store/filter-store'

/**
 * 로또 3의 배수 필터 컴포넌트
 * 3의 배수 개수를 독립적으로 설정
 */
export const LottoMultipleOf3Selector = () => {
  // zustand store에서 직접 상태와 액션 가져오기
  const { multipleOf3, setMultipleOf3Range } = useFilterStore()

  // 안전한 값 접근 (방어 코드)
  const safeValue = {
    min:
      typeof multipleOf3.value === 'object' &&
      multipleOf3.value &&
      typeof multipleOf3.value.min === 'number'
        ? multipleOf3.value.min
        : 2,
    max:
      typeof multipleOf3.value === 'object' &&
      multipleOf3.value &&
      typeof multipleOf3.value.max === 'number'
        ? multipleOf3.value.max
        : 2,
  }

  // 3의 배수 목록 (15개)
  const multipleOf3Numbers = [
    3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45,
  ]

  const handleCountChange = (value: number[]) => {
    setMultipleOf3Range({ min: value[0], max: value[1] })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* 3의 배수 개수 슬라이더 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              3의 배수 개수 범위
            </label>
            <span className="text-sm font-bold text-blue-600">
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

      {/* 3의 배수 목록 표시 */}
      <div className="space-y-1">
        <h4 className="text-sm font-medium text-gray-700">
          3의 배수 목록 (15개)
        </h4>
        <span className="text-sm text-gray-600">
          {multipleOf3Numbers.join(', ')}
        </span>
      </div>
    </div>
  )
}

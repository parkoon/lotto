'use client'

import { Slider } from '@/components/ui/slider'
import { useFilterStore } from '@/store/filter-store'

/**
 * 로또 5의 배수 필터 컴포넌트
 * 5의 배수 개수를 독립적으로 설정하고 토글로 활성화/비활성화
 */
export const LottoMultipleOf5Selector = () => {
  // zustand store에서 직접 상태와 액션 가져오기
  const { multipleOf5, setMultipleOf5Range } = useFilterStore()

  // 컴포넌트 내부 상태로 활성화 여부 관리

  // 안전한 값 접근 (방어 코드)
  const safeValue = {
    min:
      typeof multipleOf5.value === 'object' &&
      multipleOf5.value &&
      typeof multipleOf5.value.min === 'number'
        ? multipleOf5.value.min
        : 1,
    max:
      typeof multipleOf5.value === 'object' &&
      multipleOf5.value &&
      typeof multipleOf5.value.max === 'number'
        ? multipleOf5.value.max
        : 1,
  }

  // 5의 배수 목록 (9개)
  const multipleOf5Numbers = [5, 10, 15, 20, 25, 30, 35, 40, 45]

  const handleCountChange = (value: number[]) => {
    setMultipleOf5Range({ min: value[0], max: value[1] })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* 5의 배수 개수 슬라이더 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              5의 배수 개수 범위
            </label>
            <span className="text-sm font-bold text-orange-600">
              {safeValue.min === safeValue.max
                ? `${safeValue.min}개`
                : `${safeValue.min}-${safeValue.max}개`}
            </span>
          </div>

          <Slider
            value={[safeValue.min, safeValue.max]}
            onValueChange={handleCountChange}
            min={0}
            max={3}
            step={1}
            className="w-full"
          />

          <div className="flex justify-between text-xs text-gray-500">
            <span>0개</span>
            <span>3개</span>
          </div>
        </div>
      </div>

      {/* 5의 배수 목록 표시 */}
      <div className="space-y-1">
        <div className="text-sm text-gray-700">5의 배수 목록 (9개)</div>
        <span className="text-sm text-gray-600">
          {multipleOf5Numbers.join(', ')}
        </span>
      </div>
    </div>
  )
}

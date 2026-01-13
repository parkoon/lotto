'use client'

import { Slider } from '@/components/ui/slider'
import { useFilterStore } from '@/store/filter-store'

/**
 * 로또 완전제곱수 필터 컴포넌트
 * 완전제곱수 개수를 독립적으로 설정하고 토글로 활성화/비활성화
 */
export const LottoPerfectSquareSelector = () => {
  // zustand store에서 직접 상태와 액션 가져오기
  const { perfectSquare, setPerfectSquareRange } = useFilterStore()

  // 컴포넌트 내부 상태로 활성화 여부 관리

  // 안전한 값 접근 (방어 코드)
  const safeValue = {
    min:
      typeof perfectSquare.value === 'object' &&
      perfectSquare.value &&
      typeof perfectSquare.value.min === 'number'
        ? perfectSquare.value.min
        : 0,
    max:
      typeof perfectSquare.value === 'object' &&
      perfectSquare.value &&
      typeof perfectSquare.value.max === 'number'
        ? perfectSquare.value.max
        : 0,
  }

  // 완전제곱수 목록 (6개)
  const perfectSquareNumbers = [1, 4, 9, 16, 25, 36]

  const handleCountChange = (value: number[]) => {
    setPerfectSquareRange({ min: value[0], max: value[1] })
  }

  return (
    <div className="space-y-6">
      {/* 완전제곱수 개수 슬라이더 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            완전제곱수 개수 범위
          </label>
          <span className="text-sm font-bold text-cyan-600">
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

      <div className="space-y-1">
        <span className="text-sm text-gray-700">완전제곱수 목록 (6개)</span>
        <span className="text-sm text-gray-600">
          {perfectSquareNumbers.join(', ')}
        </span>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { useFilterStore } from '@/store/filter-store'

/**
 * 로또 번호 고/저 비율 선택 컴포넌트
 * 6개 번호 중 저구간(1~22)과 고구간(23~45)의 비율을 설정
 */
export const LottoHighLowRatioSelector = () => {
  // zustand store에서 직접 상태와 액션 가져오기
  const { highLowRatio, setHighLowRatio } = useFilterStore()

  // 로컬 상태로 여러 비율 선택 관리
  const [selectedRatios, setSelectedRatios] = useState<
    { low: number; high: number }[]
  >(highLowRatio.value)

  // 모든 가능한 비율 옵션들
  const allRatioOptions = [
    { low: 0, high: 6, frequency: '매우 드물음' },
    { low: 1, high: 5, frequency: '드물음' },
    { low: 2, high: 4, frequency: '자주' },
    { low: 3, high: 3, frequency: '가장 많음' },
    { low: 4, high: 2, frequency: '자주' },
    { low: 5, high: 1, frequency: '드물음' },
    { low: 6, high: 0, frequency: '매우 드물음' },
  ]
  // 개별 비율 토글
  const toggleRatio = (ratio: { low: number; high: number }) => {
    const isSelected = selectedRatios.some(
      (r) => r.low === ratio.low && r.high === ratio.high
    )

    let newSelectedRatios: { low: number; high: number }[]

    if (isSelected) {
      // 선택 해제 (최소 1개는 유지)
      if (selectedRatios.length > 1) {
        newSelectedRatios = selectedRatios.filter(
          (r) => !(r.low === ratio.low && r.high === ratio.high)
        )
      } else {
        return // 마지막 하나는 제거하지 않음
      }
    } else {
      // 선택 추가
      newSelectedRatios = [...selectedRatios, ratio]
    }

    setSelectedRatios(newSelectedRatios)
    // zustand에는 모든 비율을 저장
    setHighLowRatio(newSelectedRatios)
  }

  return (
    <div className={cn('space-y-6', !highLowRatio.enabled && 'opacity-50')}>
      {/* 개별 비율 선택 버튼들 */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">
          비율 선택 (중복 선택 가능)
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {allRatioOptions.map((option) => {
            const isSelected = selectedRatios.some(
              (r) => r.low === option.low && r.high === option.high
            )

            return (
              <button
                key={`${option.low}-${option.high}`}
                onClick={() => toggleRatio(option)}
                disabled={!highLowRatio.enabled}
                className={cn(
                  'rounded-lg border p-3 text-center transition-all',
                  isSelected
                    ? 'border-teal-300 bg-teal-100 text-teal-800'
                    : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100',
                  !highLowRatio.enabled && 'cursor-not-allowed opacity-50'
                )}
              >
                <div className="text-sm font-bold">
                  {option.low}:{option.high}
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  {option.frequency}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* 참고 정보 */}
      <div className="space-y-1 text-xs text-gray-500">
        <p>
          • <span className="text-blue-600">저구간 (1~22)</span>: 1부터 22까지의
          번호 (22개)
        </p>
        <p>
          • <span className="text-orange-600">고구간 (23~45)</span>: 23부터
          45까지의 번호 (23개)
        </p>
        <p>• 여러 비율을 동시 선택하면 해당 비율들 중 랜덤으로 적용됩니다</p>
      </div>
    </div>
  )
}

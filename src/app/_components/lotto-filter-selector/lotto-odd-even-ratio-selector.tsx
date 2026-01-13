'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { useFilterStore } from '@/store/filter-store'

/**
 * 로또 번호 홀짝 비율 선택 컴포넌트
 * 6개 번호 중 홀수와 짝수의 비율을 설정
 */
export const LottoOddEvenRatioSelector = () => {
  // zustand store에서 직접 상태와 액션 가져오기
  const { oddEvenRatio, setOddEvenRatio } = useFilterStore()

  // 로컬 상태로 여러 비율 선택 관리
  const [selectedRatios, setSelectedRatios] = useState<
    { odd: number; even: number }[]
  >(oddEvenRatio.value)

  // 모든 가능한 비율 옵션들
  const allRatioOptions = [
    { odd: 0, even: 6, frequency: '매우 드물음' },
    { odd: 1, even: 5, frequency: '드물음' },
    { odd: 2, even: 4, frequency: '자주' },
    { odd: 3, even: 3, frequency: '가장 많음' },
    { odd: 4, even: 2, frequency: '자주' },
    { odd: 5, even: 1, frequency: '드물음' },
    { odd: 6, even: 0, frequency: '매우 드물음' },
  ]
  // 개별 비율 토글
  const toggleRatio = (ratio: { odd: number; even: number }) => {
    const isSelected = selectedRatios.some(
      (r) => r.odd === ratio.odd && r.even === ratio.even
    )

    let newSelectedRatios: { odd: number; even: number }[]

    if (isSelected) {
      // 선택 해제 (최소 1개는 유지)
      if (selectedRatios.length > 1) {
        newSelectedRatios = selectedRatios.filter(
          (r) => !(r.odd === ratio.odd && r.even === ratio.even)
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
    setOddEvenRatio(newSelectedRatios)
  }

  return (
    <div className={cn('space-y-6', !oddEvenRatio.enabled && 'opacity-50')}>
      {/* 개별 비율 선택 버튼들 */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">
          비율 선택 (중복 선택 가능)
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {allRatioOptions.map((option) => {
            const isSelected = selectedRatios.some(
              (r) => r.odd === option.odd && r.even === option.even
            )

            return (
              <button
                key={`${option.odd}-${option.even}`}
                onClick={() => toggleRatio(option)}
                disabled={!oddEvenRatio.enabled}
                className={cn(
                  'rounded-lg border p-3 text-center transition-all',
                  isSelected
                    ? 'border-purple-300 bg-purple-100 text-purple-800'
                    : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100',
                  !oddEvenRatio.enabled && 'cursor-not-allowed opacity-50'
                )}
              >
                <div className="text-sm font-bold">
                  {option.odd}:{option.even}
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
        <p>• 여러 비율을 동시 선택하면 해당 비율들 중 랜덤으로 적용됩니다</p>
      </div>
    </div>
  )
}

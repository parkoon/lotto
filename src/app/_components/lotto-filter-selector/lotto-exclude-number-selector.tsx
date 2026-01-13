'use client'

import { cn } from '@/lib/utils'
import { useFilterStore } from '@/store/filter-store'

import { LottoBall } from '../lotto-ball'

/**
 * 로또 제외수 선택 컴포넌트
 * 로또 번호 생성 시 제외될 번호를 선택
 */
export const LottoExcludeNumberSelector = () => {
  // zustand store에서 제외수 상태와 액션 가져오기
  const { excludeNumbers, setExcludeNumbers } = useFilterStore()

  const handleNumberToggle = (number: number) => {
    if (!excludeNumbers.enabled) return

    const newSelected = excludeNumbers.value.includes(number)
      ? excludeNumbers.value.filter((n) => n !== number)
      : excludeNumbers.value.length < 20
        ? [...excludeNumbers.value, number].sort((a, b) => a - b)
        : excludeNumbers.value

    setExcludeNumbers(newSelected)
  }

  const clearAll = () => {
    if (!excludeNumbers.enabled) return
    setExcludeNumbers([])
  }

  return (
    <div className={cn('space-y-6', !excludeNumbers.enabled && 'opacity-50')}>
      <div className="space-y-4">
        {/* 선택된 제외수 표시 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-700">
              선택된 제외수 ({excludeNumbers.value.length}/20)
            </div>
            {excludeNumbers.value.length > 0 && (
              <button
                onClick={clearAll}
                disabled={!excludeNumbers.enabled}
                className={cn(
                  'text-xs text-red-600 hover:text-red-800',
                  !excludeNumbers.enabled && 'cursor-not-allowed opacity-50'
                )}
              >
                전체 삭제
              </button>
            )}
          </div>

          <div className="flex min-h-[50px] flex-wrap gap-2 rounded-lg border border-dashed border-gray-300 p-2">
            {excludeNumbers.value.map((number) => (
              <LottoBall
                key={number}
                size="sm"
                num={number}
                onClick={() => handleNumberToggle(number)}
                disabled={!excludeNumbers.enabled}
              />
            ))}
          </div>
        </div>

        {/* 번호 선택 그리드 */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-gray-700">번호 선택</div>
          <div className="grid grid-cols-9 gap-2">
            {Array.from({ length: 45 }, (_, i) => i + 1).map((number) => {
              const isSelected = excludeNumbers.value.includes(number)
              const canSelect = excludeNumbers.value.length < 20 || isSelected

              return (
                <button
                  key={number}
                  onClick={() => handleNumberToggle(number)}
                  disabled={!excludeNumbers.enabled || !canSelect}
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all',
                    isSelected
                      ? [
                          'bg-red-500 text-white',
                          'scale-110 ring-2 ring-red-400',
                        ]
                      : [
                          'bg-gray-100 text-gray-600 hover:bg-gray-200',
                          canSelect &&
                            excludeNumbers.enabled &&
                            'hover:scale-105',
                        ],
                    (!canSelect || !excludeNumbers.enabled) &&
                      'cursor-not-allowed opacity-50'
                  )}
                >
                  {number}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* 참고 정보 */}
      <div className="space-y-1 text-xs text-gray-500">
        <p>• 제외수는 로또 번호 생성 시 절대 포함되지 않습니다.</p>
        <p>• 최대 20개까지 선택할 수 있습니다.</p>
        <p>• 제외수가 많을수록 선택 가능한 번호가 줄어듭니다.</p>
        <p>• 고정수와 제외수가 겹치면 고정수가 우선됩니다.</p>
      </div>
    </div>
  )
}

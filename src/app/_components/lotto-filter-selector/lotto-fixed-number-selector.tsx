'use client'

import { cn } from '@/lib/utils'
import { useFilterStore } from '@/store/filter-store'

import { LottoBall } from '../lotto-ball'

/**
 * 로또 고정수 선택 컴포넌트
 * 로또 번호 생성 시 항상 포함될 번호를 선택
 */
export const LottoFixedNumberSelector = () => {
  // zustand store에서 고정수 상태와 액션 가져오기
  const { fixedNumbers, setFixedNumbers } = useFilterStore()

  const handleNumberToggle = (number: number) => {
    if (!fixedNumbers.enabled) return

    const newSelected = fixedNumbers.value.includes(number)
      ? fixedNumbers.value.filter((n) => n !== number)
      : fixedNumbers.value.length < 5
        ? [...fixedNumbers.value, number].sort((a, b) => a - b)
        : fixedNumbers.value

    setFixedNumbers(newSelected)
  }

  const clearAll = () => {
    if (!fixedNumbers.enabled) return
    setFixedNumbers([])
  }

  // 로또 번호 색상 결정
  const getLottoColor = (number: number) => {
    if (number <= 10) return 'bg-yellow-400 text-black'
    if (number <= 20) return 'bg-blue-500 text-white'
    if (number <= 30) return 'bg-red-500 text-white'
    if (number <= 40) return 'bg-gray-500 text-white'
    return 'bg-green-500 text-white'
  }

  return (
    <div className={cn('space-y-6', !fixedNumbers.enabled && 'opacity-50')}>
      <div className="space-y-4">
        {/* 선택된 고정수 표시 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-700">
              선택된 고정수 ({fixedNumbers.value.length}/5)
            </div>
            {fixedNumbers.value.length > 0 && (
              <button
                onClick={clearAll}
                disabled={!fixedNumbers.enabled}
                className={cn(
                  'text-xs text-red-600 hover:text-red-800',
                  !fixedNumbers.enabled && 'cursor-not-allowed opacity-50'
                )}
              >
                전체 삭제
              </button>
            )}
          </div>

          <div className="flex min-h-[50px] flex-wrap gap-2 rounded-lg border border-dashed border-gray-300 p-2">
            {fixedNumbers.value.map((number) => (
              <LottoBall
                size="sm"
                num={number}
                key={number}
                onClick={() => handleNumberToggle(number)}
                disabled={!fixedNumbers.enabled}
              />
            ))}
          </div>
        </div>

        {/* 번호 선택 그리드 */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-gray-700">번호 선택</div>
          <div className="grid grid-cols-9 gap-2">
            {Array.from({ length: 45 }, (_, i) => i + 1).map((number) => {
              const isSelected = fixedNumbers.value.includes(number)
              const canSelect = fixedNumbers.value.length < 5 || isSelected

              return (
                <button
                  key={number}
                  onClick={() => handleNumberToggle(number)}
                  disabled={!fixedNumbers.enabled || !canSelect}
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all',
                    isSelected
                      ? [
                          getLottoColor(number),
                          'scale-110 ring-2 ring-blue-400',
                        ]
                      : [
                          'bg-gray-100 text-gray-600 hover:bg-gray-200',
                          canSelect &&
                            fixedNumbers.enabled &&
                            'hover:scale-105',
                        ],
                    (!canSelect || !fixedNumbers.enabled) &&
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
        <p>• 고정수는 로또 번호 생성 시 항상 포함됩니다.</p>
        <p>• 최대 5개까지 선택할 수 있습니다.</p>
        <p>• 고정수가 많을수록 다양성이 줄어들 수 있습니다.</p>
      </div>
    </div>
  )
}

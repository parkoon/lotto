import React, { useEffect, useRef } from 'react'

import { cn } from '@/lib/utils'

export type SegmentedOption = {
  value: string
  label: string
}

export type SegmentedProps = {
  options: (string | SegmentedOption)[]
  value: string
  onChange: (value: string) => void
  className?: string
}

// 헬퍼 함수들
const getOptionValue = (option: string | SegmentedOption): string => {
  return typeof option === 'string' ? option : option.value
}

const getOptionLabel = (option: string | SegmentedOption): string => {
  return typeof option === 'string' ? option : option.label
}

/**
 * Segmented(세그먼티드) 탭 컴포넌트
 * - options: 탭 목록 (string[] 또는 {value, label}[])
 * - value: 현재 선택된 탭 값
 * - onChange: 탭 변경 시 호출
 * - className: 추가 스타일
 */
export const Segmented: React.FC<SegmentedProps> = ({
  options,
  value,
  onChange,
  className,
}) => {
  // 각 탭 버튼에 ref를 할당하기 위한 배열
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  // value(선택된 탭)가 바뀔 때마다 해당 버튼이 보이도록 스크롤
  useEffect(() => {
    const idx = options.findIndex((option) => getOptionValue(option) === value)
    if (idx !== -1 && tabRefs.current[idx]) {
      tabRefs.current[idx]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }
  }, [value, options])

  return (
    <div
      className={cn(
        'no-scrollbar inline-flex w-full gap-1 overflow-x-auto py-1.5 whitespace-nowrap',
        className
      )}
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {options.map((option, idx) => {
        const optionValue = getOptionValue(option)
        const optionLabel = getOptionLabel(option)
        const isSelected = value === optionValue
        return (
          <button
            key={optionValue}
            ref={(el) => {
              tabRefs.current[idx] = el
            }}
            type="button"
            className={cn(
              'rounded px-2 py-1 text-sm font-medium',
              isSelected
                ? 'nb-shadow bg-white text-black shadow'
                : 'bg-transparent text-neutral-600'
            )}
            aria-pressed={isSelected}
            tabIndex={0}
            onClick={() => onChange(optionValue)}
          >
            {optionLabel}
          </button>
        )
      })}
    </div>
  )
}

export default Segmented

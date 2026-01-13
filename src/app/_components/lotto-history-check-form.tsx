'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { IconButton } from '@/components/ui/icon-button'
import { cn } from '@/lib/utils'

type LottoHistoryCheckFormProps = {
  initialValue?: string[]
  onConfirm: (numbers: number[]) => void
  onReset?: () => void
}

export const LottoHistoryCheckForm = ({
  initialValue,
  onConfirm,
  onReset,
}: LottoHistoryCheckFormProps) => {
  const [inputs, setInputs] = useState<string[]>(
    initialValue ?? Array(6).fill('')
  )

  const handleChange = (idx: number, value: string) => {
    // 숫자만, 1~45만 허용
    let v = value.replace(/\D/g, '')
    if (v.length > 2) v = v.slice(0, 2)
    let num = Number(v)
    if (num > 45) num = 45
    if (num < 1 && v !== '') num = 1
    const next = [...inputs]
    next[idx] = v === '' ? '' : String(num)
    setInputs(next)

    // 자동 포커스 이동
    if (v.length === 2 && idx < 5) {
      const nextInput = document.getElementById(
        `lotto-input-${idx + 1}`
      ) as HTMLInputElement
      nextInput?.focus()
    }
  }

  const isDuplicate = (idx: number) => {
    const val = inputs[idx]
    if (!val) return false
    return (
      inputs.filter((v, i) => v === val && v !== '' && i !== idx).length > 0
    )
  }

  // 자동 선택
  const handleAutoSelect = () => {
    const nums = Array.from({ length: 45 }, (_, i) => i + 1)
    const shuffled = nums.sort(() => Math.random() - 0.5)
    const pick = shuffled.slice(0, 6)
    setInputs(pick.map(String))
  }

  // 전체 초기화
  const handleReset = () => {
    setInputs(Array(6).fill(''))
    onReset?.()
  }

  // 검증 로직
  const getValidNumbers = (): number[] => {
    const selected = Array.from(
      new Set(inputs.map(Number).filter((n) => n >= 1 && n <= 45))
    )
    return selected
  }

  const isValid = (): boolean => {
    const selected = getValidNumbers()
    return selected.length === 6 && new Set(selected).size === 6
  }

  const handleConfirm = () => {
    if (!isValid()) {
      alert('숫자 6개를 중복 없이 선택해주세요')
      return
    }

    const validNumbers = getValidNumbers().sort((a, b) => a - b)
    onConfirm(validNumbers)
  }

  return (
    <section>
      <div className="mb-6 flex justify-end gap-2">
        <IconButton
          className="h-8 w-fit shrink-0 bg-white px-2 text-sm font-semibold"
          onClick={handleReset}
        >
          초기화
        </IconButton>
        <IconButton
          className="bg-secondary h-8 w-fit shrink-0 px-2 text-sm font-semibold text-white"
          onClick={handleAutoSelect}
        >
          자동생성
        </IconButton>
      </div>
      <div className="mb-2 flex flex-wrap items-center gap-2">
        {Array.from({ length: 6 }).map((_, idx) => (
          <input
            key={idx}
            id={`lotto-input-${idx}`}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={2}
            value={inputs[idx]}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Backspace' && inputs[idx] === '' && idx > 0) {
                const prevInput = document.getElementById(
                  `lotto-input-${idx - 1}`
                ) as HTMLInputElement
                prevInput?.focus()
              }
            }}
            className={cn(
              'nb-shadow h-10 w-10 rounded border-1 px-0 py-0 text-center text-lg font-bold transition-all outline-none',
              isDuplicate(idx)
                ? 'border-red-500 bg-red-100'
                : 'border-black bg-white',
              inputs[idx] &&
                (Number(inputs[idx]) < 1 || Number(inputs[idx]) > 45)
                ? 'border-red-500 bg-red-100'
                : ''
            )}
            placeholder="--"
            autoComplete="off"
          />
        ))}
      </div>
      <p className="mb-6 text-sm text-neutral-800">
        1부터 45까지의 숫자를, 중복 없이 입력해 주세요.
      </p>

      <Button size="sm" onClick={handleConfirm}>
        당첨확인
      </Button>
    </section>
  )
}

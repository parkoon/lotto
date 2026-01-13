'use client'

import { useState } from 'react'
import { TbExclamationCircle, TbFilterCog } from 'react-icons/tb'
import { ClipLoader } from 'react-spinners'
import { toast } from 'sonner'

import { LottoFilterDisplay } from '@/app/_components/lotto-filter-display'
import { Screen } from '@/components/layouts/screen'
import { LottoNumberAnalysis } from '@/components/lotto-number-analysis'
import { BottomFixedArea } from '@/components/ui/bottom-fixed-area'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Divider } from '@/components/ui/divider'
import { generateFilteredLottoNumbers } from '@/lib/lotto-generator'
import { useFilterStore } from '@/store/filter-store'

import { LottoBall } from '../../_components/lotto-ball'
import { LottoFilterBottomSheet } from '../../_components/lotto-filter-bottom-sheet'
import { LottoMenu } from '../../_components/lotto-menu'

interface NumberSlot {
  id: string
  numbers: number[] | null
  isGenerating?: boolean
}

export default function GeneratorPage() {
  const [numberSlots, setNumberSlots] = useState<NumberSlot[]>([
    { id: '1', numbers: null },
    { id: '2', numbers: null },
    { id: '3', numbers: null },
    { id: '4', numbers: null },
    { id: '5', numbers: null },
  ])
  const [generatingSlotId, setGeneratingSlotId] = useState<string | null>(null)
  const [, setAttempts] = useState(0)
  const [openFilterBottomSheet, setOpenFilterBottomSheet] = useState(false)

  // 필터 상태 가져오기
  const filters = useFilterStore()

  const handleGenerate = async () => {
    // 모든 슬롯을 생성 중 상태로 설정
    setGeneratingSlotId('all')

    try {
      // 최소 3초 로딩 시간 보장
      const startTime = Date.now()
      const minLoadingTime = 3000 // 3초

      // 5개의 번호 세트 생성
      const result = await generateFilteredLottoNumbers(
        filters,
        5,
        (progressValue, attemptCount) => {
          setAttempts(attemptCount)
        }
      )

      // 실제 생성 시간이 3초보다 짧으면 나머지 시간만큼 대기
      const elapsedTime = Date.now() - startTime
      const remainingTime = minLoadingTime - elapsedTime

      if (remainingTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingTime))
      }

      if (result.success && result.numbers.length > 0) {
        // 생성된 번호들을 각 슬롯에 할당
        setNumberSlots((prev) =>
          prev.map((slot, index) => ({
            ...slot,
            numbers: result.numbers[index] || null,
          }))
        )
        toast.success('번호가 생성되었습니다.')
      } else {
        toast.error(result.message || '번호 생성에 실패했습니다.')
      }
    } catch (error) {
      console.error('Generation error:', error)
      toast.error('번호 생성 중 오류가 발생했습니다.')
    } finally {
      setGeneratingSlotId(null)
      setAttempts(0)
    }
  }

  // 활성화된 필터 개수 계산
  const getActiveFiltersCount = () => {
    const filterKeys = [
      'fixedNumbers',
      'excludeNumbers',
      'sumRange',
      'oddEvenRatio',
      'highLowRatio',
      'frontSum',
      'backSum',
      'firstDigitSum',
      'lastDigitSum',
      'acRange',
      'prime',
      'multipleOf3',
      'composite',
      'multipleOf5',
      'perfectSquare',
      'doubleDigit',
      'consecutive',
    ] as const

    return filterKeys.filter((key) => filters[key]?.enabled).length
  }

  const activeFiltersCount = getActiveFiltersCount()

  return (
    <Screen
      withSidePadding
      withBottomFixedButton
      header={{ action: <LottoMenu />, title: '자동 번호 생성' }}
    >
      {/* 경고 메시지 */}
      <article className="nb-shadow flex gap-2 rounded bg-sky-100 px-4 py-3">
        <TbExclamationCircle size={20} />
        <p className="text-sm">
          조건을 만족하는 번호가 없으면 필터 조건 완화를 권장합니다
        </p>
      </article>

      {/* 필터 상태 표시 */}
      <section className="mt-6 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm text-neutral-500">
            {activeFiltersCount}개 필터 적용
          </h3>
          <Button
            inline
            size="sm"
            className="bg-secondary h-fit gap-1 px-2 py-1 text-sm text-white"
            onClick={() => setOpenFilterBottomSheet(true)}
          >
            <TbFilterCog size={20} />
            필터
          </Button>
        </div>
        <LottoFilterDisplay />
      </section>

      <Divider />

      {/* 번호 슬롯 */}
      <div className="space-y-2">
        {numberSlots.map((slot) => (
          <Card key={slot.id}>
            {slot.numbers ? (
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex gap-1">
                  {slot.numbers.map((number, numIndex) => (
                    <LottoBall key={numIndex} num={number} size="sm" />
                  ))}
                </div>
                <LottoNumberAnalysis numbers={slot.numbers} compact />
              </div>
            ) : (
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                  <LottoBall key={index} empty size="sm" emptyText="?" />
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>

      <LottoFilterBottomSheet
        open={openFilterBottomSheet}
        onClose={() => {
          toast.success('필터 설정이 적용되었습니다')
          setOpenFilterBottomSheet(false)
        }}
      />
      <BottomFixedArea className="bg-background">
        <Button onClick={handleGenerate} disabled={generatingSlotId !== null}>
          {generatingSlotId !== null ? (
            <div className="flex items-center gap-2">
              <ClipLoader size={16} className="-ml-2" />
              생성중...
            </div>
          ) : (
            '생성하기'
          )}
        </Button>
      </BottomFixedArea>
    </Screen>
  )
}

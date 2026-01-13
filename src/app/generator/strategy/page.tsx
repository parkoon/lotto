'use client'

import { useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { toast } from 'sonner'

import { Screen } from '@/components/layouts/screen'
import { LottoNumberAnalysis } from '@/components/lotto-number-analysis'
import { BottomFixedArea } from '@/components/ui/bottom-fixed-area'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Divider } from '@/components/ui/divider'
import Segmented from '@/components/ui/segmented'
// 필터 데이터 import
import acValueFilter from '@/data/lotto/filter/ac-value-filter.json'
import backSumFilter from '@/data/lotto/filter/back-sum-filter.json'
import compositeFilter from '@/data/lotto/filter/composite-filter.json'
import consecutiveFilter from '@/data/lotto/filter/consecutive-filter.json'
import doubleDigitFilter from '@/data/lotto/filter/double-digit-filter.json'
import firstDigitSumFilter from '@/data/lotto/filter/first-digit-sum-filter.json'
import frontSumFilter from '@/data/lotto/filter/front-sum-filter.json'
import highLowRatioFilter from '@/data/lotto/filter/high-low-ratio-filter.json'
import lastDigitSumFilter from '@/data/lotto/filter/last-digit-sum-filter.json'
import multipleOf3Filter from '@/data/lotto/filter/multiple-of-3-filter.json'
import multipleOf5Filter from '@/data/lotto/filter/multiple-of-5-filter.json'
import oddEvenRatioFilter from '@/data/lotto/filter/odd-even-ratio-filter.json'
import perfectSquareFilter from '@/data/lotto/filter/perfect-square-filter.json'
import primeFilter from '@/data/lotto/filter/prime-filter.json'
import sumRangeFilter from '@/data/lotto/filter/sum-range-filter.json'
import { generateFilteredLottoNumbers } from '@/lib/lotto-generator'
import { FilterState, useFilterStore } from '@/store/filter-store'

import { LottoBall } from '../../_components/lotto-ball'
import { LottoMenu } from '../../_components/lotto-menu'

type Strategy = 'balanced' | 'conservative' | 'aggressive' | 'ai'

interface NumberSlot {
  id: string
  numbers: number[] | null
  strategy?: Strategy
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
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy>('balanced')
  const [generatingSlotId, setGeneratingSlotId] = useState<string | null>(null)
  const [attempts, setAttempts] = useState(0)
  console.log('🚀 ~ GeneratorPage ~ attempts:', attempts)

  // 필터 상태 가져오기 (원본 상태는 변경하지 않음)
  const filterStore = useFilterStore()

  const getStrategyDescription = (strategy: Strategy) => {
    const descriptions = {
      balanced: {
        title: '균형적 전략',
        description:
          '안정적이고 균형잡힌 번호 조합으로 생성합니다. 홀짝, 고저, 구간별 분포를 고르게 맞춰 일반적으로 가장 무난한 선택입니다.',
        features: ['균등한 홀짝 비율', '고른 구간 분포', '안정적인 총합 범위'],
      },
      conservative: {
        title: '보수적 전략',
        description:
          '안전한 범위의 번호들로 구성하여 리스크를 최소화합니다. 과거 당첨 패턴을 기반으로 검증된 조합을 선호합니다.',
        features: ['검증된 번호 범위', '안전한 총합대', '낮은 변동성'],
      },
      aggressive: {
        title: '공격적 전략',
        description:
          '도전적이고 과감한 번호 조합으로 높은 리턴 가능성을 추구합니다. 일반적이지 않은 패턴으로 차별화를 시도합니다.',
        features: ['독특한 번호 조합', '높은 변동성', '차별화된 패턴'],
      },
      ai: {
        description:
          '과거 당첨 데이터와 통계 분석을 기반으로 최적화된 패턴을 생성합니다. 머신러닝 알고리즘이 찾아낸 숨겨진 패턴을 활용합니다.',
        features: ['데이터 기반 분석', '패턴 최적화', '통계적 접근'],
      },
    }
    return descriptions[strategy]
  }

  // 전략에 따른 필터 상태 생성 (상태 변경 없이 순수 함수)
  const createStrategyFilterState = (strategy: Strategy): FilterState => {
    return {
      // 고정수/제외수는 현재 상태 유지
      fixedNumbers: filterStore.fixedNumbers,
      excludeNumbers: filterStore.excludeNumbers,

      // 각 전략별 필터 설정 적용
      sumRange: {
        value: sumRangeFilter[strategy],
        enabled: true,
      },
      oddEvenRatio: {
        value: oddEvenRatioFilter[strategy].ratios,
        enabled: true,
      },
      highLowRatio: {
        value: highLowRatioFilter[strategy].ratios,
        enabled: true,
      },
      frontSum: {
        value: frontSumFilter[strategy],
        enabled: true,
      },
      backSum: {
        value: backSumFilter[strategy],
        enabled: true,
      },
      firstDigitSum: {
        value: firstDigitSumFilter[strategy],
        enabled: true,
      },
      lastDigitSum: {
        value: lastDigitSumFilter[strategy],
        enabled: true,
      },
      acRange: {
        value: acValueFilter[strategy],
        enabled: true,
      },
      prime: {
        value: primeFilter[strategy],
        enabled: true,
      },
      multipleOf3: {
        value: multipleOf3Filter[strategy],
        enabled: true,
      },
      composite: {
        value: compositeFilter[strategy],
        enabled: true,
      },
      multipleOf5: {
        value: multipleOf5Filter[strategy],
        enabled: true,
      },
      perfectSquare: {
        value: perfectSquareFilter[strategy],
        enabled: true,
      },
      doubleDigit: {
        value: doubleDigitFilter[strategy],
        enabled: true,
      },
      consecutive: {
        value: consecutiveFilter[strategy],
        enabled: true,
      },
    }
  }

  const handleGenerate = async () => {
    const strategy = selectedStrategy

    // 모든 슬롯을 생성 중 상태로 설정
    setGeneratingSlotId('all')

    const tempFilters = createStrategyFilterState(strategy)

    try {
      // 최소 5초 로딩 시간 보장
      const startTime = Date.now()
      const minLoadingTime = 5000 // 5초

      // 5개의 번호 세트 생성
      const result = await generateFilteredLottoNumbers(
        tempFilters,
        5,
        (progressValue, attemptCount) => {
          setAttempts(attemptCount)
        }
      )

      // 실제 생성 시간이 5초보다 짧으면 나머지 시간만큼 대기
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
            strategy: result.numbers[index] ? strategy : undefined,
          }))
        )
        toast.success('번호가 생성되었습니다.')
      }
    } catch (error) {
      console.error(`${strategy} generation error:`, error)
    } finally {
      setGeneratingSlotId(null)
      setAttempts(0)
    }
  }

  return (
    <Screen
      withSidePadding
      withBottomFixedButton
      header={{ action: <LottoMenu />, title: '자동 번호 생성' }}
    >
      <Segmented
        options={[
          { label: '균형적', value: 'balanced' },
          { label: '보수적', value: 'conservative' },
          { label: '공격적', value: 'aggressive' },
          // { label: 'AI', value: 'ai' },
        ]}
        value={selectedStrategy}
        onChange={(value) => {
          setSelectedStrategy(value as Strategy)
          // 전략 변경 시 기존 번호들 리셋
          setNumberSlots([
            { id: '1', numbers: null },
            { id: '2', numbers: null },
            { id: '3', numbers: null },
            { id: '4', numbers: null },
            { id: '5', numbers: null },
          ])
        }}
      />
      <p className="text-sm leading-relaxed">
        {getStrategyDescription(selectedStrategy).description}
      </p>
      <Divider />
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

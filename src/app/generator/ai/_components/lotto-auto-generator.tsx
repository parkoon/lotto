'use client'

import { BeatLoader } from 'react-spinners'

import { Button } from '@/components/ui/button'

type ConditionData = {
  id: string
  name: string
  description: string
  weight: number
  data: number[] | number[][] | { odd: number; even: number } | number[]
  lastUpdated: string
}

type AutoGeneratorProps = {
  conditions: ConditionData[]
  onGenerate: (numbers: number[]) => void
  isGenerating: boolean
}

export const LottoAutoGenerator = ({
  conditions,
  onGenerate,
  isGenerating,
}: AutoGeneratorProps) => {
  const handleQuickGenerate = () => {
    if (isGenerating) return

    const numbers = generateAutoLottoNumbers(conditions)
    onGenerate(numbers)
  }

  return (
    <Button
      onClick={handleQuickGenerate}
      disabled={isGenerating || conditions.length === 0}
    >
      {isGenerating ? <BeatLoader /> : '번호 생성'}
    </Button>
  )
}

/**
 * 조건에서 번호 배열을 추출하는 함수
 */
const extractNumbersFromCondition = (condition: ConditionData): number[] => {
  if (condition.id === 'popular-numbers' || condition.id === 'recent-hot') {
    return condition.data as number[]
  }

  if (condition.id === 'pair-combinations') {
    const pairs = condition.data as number[][]
    return pairs.flat()
  }

  return []
}

/**
 * 상위 조건들을 선택하는 함수
 */
const selectTopConditions = (
  conditions: ConditionData[],
  count: number = 4
): ConditionData[] => {
  return conditions.sort((a, b) => b.weight - a.weight).slice(0, count)
}

/**
 * 가중치 기반 번호 풀을 생성하는 함수
 */
const createWeightedPool = (conditions: ConditionData[]): number[] => {
  return conditions.reduce<number[]>((pool, condition) => {
    const repeatCount = Math.floor(condition.weight * 100)
    const conditionNumbers = extractNumbersFromCondition(condition)

    for (let i = 0; i < repeatCount; i++) {
      pool.push(...conditionNumbers)
    }

    return pool
  }, [])
}

/**
 * 홀짝 밸런스 조건을 확인하는 함수
 */
const hasOddEvenBalance = (conditions: ConditionData[]): boolean => {
  return conditions.some((c) => c.id === 'odd-even-balance')
}

/**
 * 홀짝 밸런스 검사하는 함수
 */
const isOddEvenBalanceValid = (
  selectedNumbers: Set<number>,
  candidateNumber: number
): boolean => {
  const currentNumbers = Array.from(selectedNumbers)
  const currentOddCount = currentNumbers.filter((n) => n % 2 === 1).length
  const currentEvenCount = currentNumbers.length - currentOddCount
  const isTargetOdd = candidateNumber % 2 === 1

  // 이미 홀수나 짝수가 3개에 도달했는데 같은 종류를 추가하려는 경우 false
  if (currentOddCount >= 3 && isTargetOdd) return false
  if (currentEvenCount >= 3 && !isTargetOdd) return false

  return true
}

/**
 * 후보 번호를 선택하는 함수
 */
const selectCandidateNumber = (weightedPool: number[]): number => {
  // 85% 확률로 weight 기반 풀에서 선택, 15% 확률로 완전 랜덤
  if (weightedPool.length > 0 && Math.random() > 0.15) {
    const randomIndex = Math.floor(Math.random() * weightedPool.length)
    return weightedPool[randomIndex]
  }

  return Math.floor(Math.random() * 45) + 1
}

/**
 * 5개 번호를 조건 기반으로 생성하는 함수
 */
const generateFiveNumbers = (
  weightedPool: number[],
  hasOddEvenCondition: boolean
): Set<number> => {
  const selectedNumbers = new Set<number>()
  const maxAttempts = 1000
  let attempts = 0

  while (selectedNumbers.size < 5 && attempts < maxAttempts) {
    attempts++

    const candidateNumber = selectCandidateNumber(weightedPool)

    // 이미 선택된 번호인 경우 스킵
    if (selectedNumbers.has(candidateNumber)) continue

    // 홀짝 밸런스 조건 검사
    if (
      hasOddEvenCondition &&
      !isOddEvenBalanceValid(selectedNumbers, candidateNumber)
    ) {
      continue
    }

    selectedNumbers.add(candidateNumber)
  }

  return selectedNumbers
}

/**
 * 나머지 1개 번호를 완전 무작위로 채우는 함수
 */
const fillRemainingNumbers = (selectedNumbers: Set<number>): Set<number> => {
  while (selectedNumbers.size < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1

    // 이미 선택된 번호와 중복되지 않는 경우만 추가
    if (!selectedNumbers.has(randomNumber)) {
      selectedNumbers.add(randomNumber)
    }
  }

  return selectedNumbers
}

/**
 * 자동 weight 기반 로또 번호 생성 함수
 */
const generateAutoLottoNumbers = (conditions: ConditionData[]): number[] => {
  if (conditions.length === 0) return []

  const topConditions = selectTopConditions(conditions)
  const weightedPool = createWeightedPool(topConditions)
  const hasOddEvenCondition = hasOddEvenBalance(topConditions)

  const selectedNumbers = generateFiveNumbers(weightedPool, hasOddEvenCondition)
  const finalNumbers = fillRemainingNumbers(selectedNumbers)

  return Array.from(finalNumbers).sort((a, b) => a - b)
}

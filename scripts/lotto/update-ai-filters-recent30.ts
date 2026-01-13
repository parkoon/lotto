#!/usr/bin/env tsx

import {
  calculateRatioStatsRecent30,
  calculateStatsRecent30,
  lotto,
  saveFilter,
} from './filter/base.js'

/**
 * 최근 30회 패턴 기반으로 모든 AI 필터 업데이트
 * 기존 보수적/균형적/공격적은 유지하고 AI만 최근 30회 기반으로 변경
 */

// 기존 필터 JSON 파일들을 읽어와서 AI 부분만 업데이트하는 함수
async function updateFilterWithRecentAI(
  filterName: string,
  newAIData: { min: number; max: number; description: string }
): Promise<void> {
  try {
    // 기존 필터 데이터 읽기
    const filterPath = `../../src/data/lotto/filter/${filterName}.json`
    const { default: existingFilter } = await import(filterPath)

    // AI 부분만 업데이트
    const updatedFilter = {
      ...existingFilter,
      ai: newAIData,
    }

    await saveFilter(
      filterName.replace('-filter', ''),
      updatedFilter,
      existingFilter.description
    )
    console.log(`✓ ${filterName} AI 필터 업데이트 완료`)
  } catch (error) {
    console.error(`✗ ${filterName} 업데이트 실패:`, error)
  }
}

// 비율 필터 AI 부분 업데이트
async function updateRatioFilterWithRecentAI(
  filterName: string,
  newAIData: {
    ratios: Array<{
      odd?: number
      even?: number
      low?: number
      high?: number
      count: number
      percentage: string
    }>
    description: string
  }
): Promise<void> {
  try {
    // 기존 필터 데이터 읽기
    const filterPath = `../../src/data/lotto/filter/${filterName}.json`
    const { default: existingFilter } = await import(filterPath)

    // AI 부분만 업데이트
    const updatedFilter = {
      ...existingFilter,
      ai: newAIData,
    }

    await saveFilter(
      filterName.replace('-filter', ''),
      updatedFilter,
      existingFilter.description
    )
    console.log(`✓ ${filterName} AI 필터 업데이트 완료`)
  } catch (error) {
    console.error(`✗ ${filterName} 업데이트 실패:`, error)
  }
}

async function updateAllAIFilters(): Promise<void> {
  console.log('🤖 최근 30회 패턴 기반 AI 필터 업데이트 시작...')

  // 1. 숫자 합계 (sum-range)
  const sums = lotto.map((game) => game.numbers.reduce((a, b) => a + b, 0))
  const sumStats = calculateStatsRecent30(sums)
  await updateFilterWithRecentAI('sum-range-filter', sumStats.ai)

  // 2. AC값
  const acValues = lotto.map((game) => {
    const sortedNumbers = [...game.numbers].sort((a, b) => a - b)
    const differences = []
    for (let i = 1; i < sortedNumbers.length; i++) {
      differences.push(sortedNumbers[i] - sortedNumbers[i - 1])
    }
    return new Set(differences).size
  })
  const acStats = calculateStatsRecent30(acValues)
  await updateFilterWithRecentAI('ac-value-filter', acStats.ai)

  // 3. 앞 3자리 합
  const frontSums = lotto.map((game) => {
    const sorted = [...game.numbers].sort((a, b) => a - b)
    return sorted.slice(0, 3).reduce((a, b) => a + b, 0)
  })
  const frontSumStats = calculateStatsRecent30(frontSums)
  await updateFilterWithRecentAI('front-sum-filter', frontSumStats.ai)

  // 4. 뒤 3자리 합
  const backSums = lotto.map((game) => {
    const sorted = [...game.numbers].sort((a, b) => a - b)
    return sorted.slice(-3).reduce((a, b) => a + b, 0)
  })
  const backSumStats = calculateStatsRecent30(backSums)
  await updateFilterWithRecentAI('back-sum-filter', backSumStats.ai)

  // 5. 첫 자리 수 합
  const firstDigitSums = lotto.map((game) => {
    return game.numbers.reduce((sum, num) => sum + Math.floor(num / 10), 0)
  })
  const firstDigitSumStats = calculateStatsRecent30(firstDigitSums)
  await updateFilterWithRecentAI(
    'first-digit-sum-filter',
    firstDigitSumStats.ai
  )

  // 6. 끝 자리 수 합
  const lastDigitSums = lotto.map((game) => {
    return game.numbers.reduce((sum, num) => sum + (num % 10), 0)
  })
  const lastDigitSumStats = calculateStatsRecent30(lastDigitSums)
  await updateFilterWithRecentAI('last-digit-sum-filter', lastDigitSumStats.ai)

  // 7. 소수 개수
  const primeNumbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43]
  const primeCounts = lotto.map((game) => {
    return game.numbers.filter((num) => primeNumbers.includes(num)).length
  })
  const primeStats = calculateStatsRecent30(primeCounts)
  await updateFilterWithRecentAI('prime-filter', primeStats.ai)

  // 8. 3의 배수 개수
  const multipleOf3Counts = lotto.map((game) => {
    return game.numbers.filter((num) => num % 3 === 0).length
  })
  const multipleOf3Stats = calculateStatsRecent30(multipleOf3Counts)
  await updateFilterWithRecentAI('multiple-of-3-filter', multipleOf3Stats.ai)

  // 9. 합성수 개수
  const isComposite = (num: number): boolean => {
    if (num < 4) return false
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return true
    }
    return false
  }
  const compositeCounts = lotto.map((game) => {
    return game.numbers.filter((num) => isComposite(num)).length
  })
  const compositeStats = calculateStatsRecent30(compositeCounts)
  await updateFilterWithRecentAI('composite-filter', compositeStats.ai)

  // 10. 5의 배수 개수
  const multipleOf5Counts = lotto.map((game) => {
    return game.numbers.filter((num) => num % 5 === 0).length
  })
  const multipleOf5Stats = calculateStatsRecent30(multipleOf5Counts)
  await updateFilterWithRecentAI('multiple-of-5-filter', multipleOf5Stats.ai)

  // 11. 완전제곱수 개수
  const perfectSquares = [1, 4, 9, 16, 25, 36]
  const perfectSquareCounts = lotto.map((game) => {
    return game.numbers.filter((num) => perfectSquares.includes(num)).length
  })
  const perfectSquareStats = calculateStatsRecent30(perfectSquareCounts)
  await updateFilterWithRecentAI('perfect-square-filter', perfectSquareStats.ai)

  // 12. 두 자리 같은 수 개수
  const doubleDigitCounts = lotto.map((game) => {
    return game.numbers.filter((num) => {
      const str = num.toString()
      return str.length === 2 && str[0] === str[1]
    }).length
  })
  const doubleDigitStats = calculateStatsRecent30(doubleDigitCounts)
  await updateFilterWithRecentAI('double-digit-filter', doubleDigitStats.ai)

  // 13. 연속번호 개수
  const consecutiveCounts = lotto.map((game) => {
    const sorted = [...game.numbers].sort((a, b) => a - b)
    let consecutiveCount = 0
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i] === sorted[i - 1] + 1) {
        consecutiveCount++
      }
    }
    return consecutiveCount
  })
  const consecutiveStats = calculateStatsRecent30(consecutiveCounts)
  await updateFilterWithRecentAI('consecutive-filter', consecutiveStats.ai)

  // 14. 홀짝 비율
  const oddEvenRatios = lotto.map((game) => {
    const oddCount = game.numbers.filter((num) => num % 2 === 1).length
    const evenCount = 6 - oddCount
    return { odd: oddCount, even: evenCount }
  })
  const oddEvenRatioStats = calculateRatioStatsRecent30(oddEvenRatios)
  await updateRatioFilterWithRecentAI('odd-even-ratio-filter', {
    ratios: oddEvenRatioStats.topRatios.slice(0, 3), // 상위 3개 비율 사용
    description: `최근 30회 패턴 기반 (${oddEvenRatioStats.topRatios
      .slice(0, 3)
      .map((r) => `${r.odd}:${r.even}`)
      .join(', ')}, 최근 트렌드 반영)`,
  })

  // 15. 고저 비율
  const highLowRatios = lotto.map((game) => {
    const lowCount = game.numbers.filter((num) => num <= 22).length
    const highCount = 6 - lowCount
    return { low: lowCount, high: highCount }
  })
  const highLowRatioStats = calculateRatioStatsRecent30(highLowRatios)
  await updateRatioFilterWithRecentAI('high-low-ratio-filter', {
    ratios: highLowRatioStats.topRatios.slice(0, 3), // 상위 3개 비율 사용
    description: `최근 30회 패턴 기반 (${highLowRatioStats.topRatios
      .slice(0, 3)
      .map((r) => `${r.low}:${r.high}`)
      .join(', ')}, 최근 트렌드 반영)`,
  })

  console.log('🎉 모든 AI 필터 업데이트 완료!')
}

// 직접 실행 시
if (require.main === module) {
  updateAllAIFilters().catch(console.error)
}

export { updateAllAIFilters }

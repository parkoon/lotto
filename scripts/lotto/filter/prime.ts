#!/usr/bin/env tsx

import {
  calculateStats,
  calculateStatsRecent30,
  lotto,
  saveFilter,
} from './base.js'

/**
 * 소수 필터 생성
 * 로또 번호 중 소수의 개수를 분석
 */
export async function generatePrimeFilter(): Promise<void> {
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43]

  const counts = lotto.map(
    (game) => game.numbers.filter((num) => primes.includes(num)).length
  )

  const result = calculateStats(counts)
  const recent30Result = calculateStatsRecent30(counts)

  // AI 전략만 최근 30회 데이터로 교체
  result.ai = recent30Result.ai

  await saveFilter(
    'prime-filter',
    result,
    '로또 번호 중 소수의 개수를 제한하는 필터입니다. 소수는 1과 자기 자신으로만 나누어지는 수입니다.'
  )
}

// 직접 실행 시
if (require.main === module) {
  generatePrimeFilter().catch(console.error)
}

#!/usr/bin/env tsx

import {
  calculateStats,
  calculateStatsRecent30,
  lotto,
  saveFilter,
} from './base.js'

/**
 * 끝수합 필터 생성
 * 로또 번호들의 일의 자리 합을 분석
 */
export async function generateLastDigitSumFilter(): Promise<void> {
  const lastDigitSums = lotto.map((game) =>
    game.numbers.reduce((sum, num) => sum + (num % 10), 0)
  )

  const result = calculateStats(lastDigitSums)
  const recent30Result = calculateStatsRecent30(lastDigitSums)

  // AI 전략만 최근 30회 데이터로 교체
  result.ai = recent30Result.ai

  await saveFilter(
    'last-digit-sum-filter',
    result,
    '로또 번호들의 일의 자리 숫자의 합을 제한하는 필터입니다. 번호의 일의 자리 분포를 조절합니다.'
  )
}

// 직접 실행 시
if (require.main === module) {
  generateLastDigitSumFilter().catch(console.error)
}

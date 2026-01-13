#!/usr/bin/env tsx

import {
  calculateStats,
  calculateStatsRecent30,
  lotto,
  saveFilter,
} from './base.js'

/**
 * 로또 번호 총합 범위 필터 생성
 * 6개 번호의 총합을 분석하여 범위를 설정
 */
export async function generateSumRangeFilter(): Promise<void> {
  const sums = lotto.map((game) =>
    game.numbers.reduce((sum, num) => sum + num, 0)
  )

  const result = calculateStats(sums)
  const recent30Result = calculateStatsRecent30(sums)

  // AI 전략만 최근 30회 데이터로 교체
  result.ai = recent30Result.ai

  await saveFilter(
    'sum-range-filter',
    result,
    '로또 번호 6개의 총합을 제한하는 필터입니다. 극단적인 합계보다는 중간 범위의 합계가 더 자주 나타납니다.'
  )
}

// 직접 실행 시
if (require.main === module) {
  generateSumRangeFilter().catch(console.error)
}

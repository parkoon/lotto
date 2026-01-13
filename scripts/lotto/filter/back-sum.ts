#!/usr/bin/env tsx

import {
  calculateStats,
  calculateStatsRecent30,
  lotto,
  saveFilter,
} from './base.js'

/**
 * 뒷수합 필터 생성
 * 로또 번호 중 가장 큰 3개 번호의 합을 분석
 */
export async function generateBackSumFilter(): Promise<void> {
  const backSums = lotto.map((game) => {
    const sortedNumbers = [...game.numbers].sort((a, b) => a - b)
    return sortedNumbers.slice(-3).reduce((sum, num) => sum + num, 0)
  })

  const result = calculateStats(backSums)
  const recent30Result = calculateStatsRecent30(backSums)

  // AI 전략만 최근 30회 데이터로 교체
  result.ai = recent30Result.ai

  await saveFilter(
    'back-sum-filter',
    result,
    '로또 번호 중 가장 큰 3개 번호의 합을 제한하는 필터입니다. 큰 번호들의 분포를 조절합니다.'
  )
}

// 직접 실행 시
if (require.main === module) {
  generateBackSumFilter().catch(console.error)
}

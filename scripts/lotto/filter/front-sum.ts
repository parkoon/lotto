#!/usr/bin/env tsx

import {
  calculateStats,
  calculateStatsRecent30,
  lotto,
  saveFilter,
} from './base.js'

/**
 * 앞수합 필터 생성
 * 로또 번호 중 가장 작은 3개 번호의 합을 분석
 */
export async function generateFrontSumFilter(): Promise<void> {
  const frontSums = lotto.map((game) => {
    const sortedNumbers = [...game.numbers].sort((a, b) => a - b)
    return sortedNumbers.slice(0, 3).reduce((sum, num) => sum + num, 0)
  })

  const result = calculateStats(frontSums)
  const recent30Result = calculateStatsRecent30(frontSums)

  // AI 전략만 최근 30회 데이터로 교체
  result.ai = recent30Result.ai

  await saveFilter(
    'front-sum-filter',
    result,
    '로또 번호 중 가장 작은 3개 번호의 합을 제한하는 필터입니다. 작은 번호들의 분포를 조절합니다.'
  )
}

// 직접 실행 시
if (require.main === module) {
  generateFrontSumFilter().catch(console.error)
}

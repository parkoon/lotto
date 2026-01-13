#!/usr/bin/env tsx

import {
  calculateStats,
  calculateStatsRecent30,
  lotto,
  saveFilter,
} from './base.js'

/**
 * AC값 계산 함수
 * 산술적 복잡성 - 모든 번호 쌍의 차이값 중 유니크한 개수에서 -5
 */
function calculateACValue(numbers: number[]): number {
  const sorted = [...numbers].sort((a, b) => a - b)
  const differences = []

  // 모든 번호 쌍의 차이 계산
  for (let i = 0; i < sorted.length; i++) {
    for (let j = i + 1; j < sorted.length; j++) {
      differences.push(sorted[j] - sorted[i])
    }
  }

  // 유니크한 차이값 개수에서 5를 뺀 값이 AC값
  return new Set(differences).size - 5
}

/**
 * AC값 필터 생성
 * 로또 번호의 산술적 복잡성을 분석
 */
export async function generateACValueFilter(): Promise<void> {
  const acValues = lotto.map((game) => calculateACValue(game.numbers))

  const result = calculateStats(acValues)
  const recent30Result = calculateStatsRecent30(acValues)

  // AI 전략만 최근 30회 데이터로 교체
  result.ai = recent30Result.ai

  await saveFilter(
    'ac-value-filter',
    result,
    '로또 번호의 산술적 복잡성(AC)을 제한하는 필터입니다. AC값이 높을수록 번호들이 고르게 분포되어 있음을 의미합니다.'
  )
}

// 직접 실행 시
if (require.main === module) {
  generateACValueFilter().catch(console.error)
}

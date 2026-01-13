#!/usr/bin/env tsx

import {
  calculateRatioStats,
  calculateRatioStatsRecent30,
  lotto,
  RatioFilterResult,
  saveFilter,
} from './base.js'

/**
 * 고저 비율 필터 생성
 * 로또 번호 중 저구간(1-22)과 고구간(23-45) 비율을 분석
 */
export async function generateHighLowRatioFilter(): Promise<void> {
  const ratios = lotto.map((game) => {
    const lowCount = game.numbers.filter((num) => num <= 22).length
    const highCount = 6 - lowCount
    return { low: lowCount, high: highCount }
  })

  const ratioStats = calculateRatioStats(ratios)
  const recent30Stats = calculateRatioStatsRecent30(ratios)

  const result: RatioFilterResult = {
    conservative: {
      ratios: ratioStats.topRatios.slice(0, 3),
      description: `가장 빈번한 상위 3개 비율 (${ratioStats.topRatios
        .slice(0, 3)
        .map((r) => `${r.low}:${r.high}`)
        .join(', ')})`,
    },
    balanced: {
      ratios: ratioStats.topRatios.slice(0, 5),
      description: `균형잡힌 상위 5개 비율 (${ratioStats.topRatios
        .slice(0, 5)
        .map((r) => `${r.low}:${r.high}`)
        .join(', ')})`,
    },
    aggressive: {
      ratios: ratioStats.topRatios.slice(0, 2),
      description: `가장 높은 확률의 상위 2개 비율 (${ratioStats.topRatios
        .slice(0, 2)
        .map((r) => `${r.low}:${r.high}`)
        .join(', ')})`,
    },
    ai: {
      ratios: recent30Stats.topRatios.slice(0, 3),
      description: `최근 30회 패턴 기반 (${recent30Stats.topRatios
        .slice(0, 3)
        .map((r) => `${r.low}:${r.high}`)
        .join(', ')}, 최근 트렌드 반영)`,
    },
  }

  await saveFilter(
    'high-low-ratio-filter',
    result,
    '로또 번호 6개의 저구간(1-22)과 고구간(23-45) 비율을 제한하는 필터입니다. 균형잡힌 분포가 가장 일반적입니다.'
  )
}

// 직접 실행 시
if (require.main === module) {
  generateHighLowRatioFilter().catch(console.error)
}

#!/usr/bin/env tsx

import {
  calculateRatioStats,
  calculateRatioStatsRecent30,
  lotto,
  RatioFilterResult,
  saveFilter,
} from './base.js'

/**
 * 홀짝 비율 필터 생성
 * 로또 번호 중 홀수와 짝수 비율을 분석
 */
export async function generateOddEvenRatioFilter(): Promise<void> {
  const ratios = lotto.map((game) => {
    const oddCount = game.numbers.filter((num) => num % 2 === 1).length
    const evenCount = 6 - oddCount
    return { odd: oddCount, even: evenCount }
  })

  const ratioStats = calculateRatioStats(ratios)
  const recent30Stats = calculateRatioStatsRecent30(ratios)

  const result: RatioFilterResult = {
    conservative: {
      ratios: ratioStats.topRatios.slice(0, 3),
      description: `가장 빈번한 상위 3개 비율 (${ratioStats.topRatios
        .slice(0, 3)
        .map((r) => `${r.odd}:${r.even}`)
        .join(', ')})`,
    },
    balanced: {
      ratios: ratioStats.topRatios.slice(0, 5),
      description: `균형잡힌 상위 5개 비율 (${ratioStats.topRatios
        .slice(0, 5)
        .map((r) => `${r.odd}:${r.even}`)
        .join(', ')})`,
    },
    aggressive: {
      ratios: ratioStats.topRatios.slice(0, 2),
      description: `가장 높은 확률의 상위 2개 비율 (${ratioStats.topRatios
        .slice(0, 2)
        .map((r) => `${r.odd}:${r.even}`)
        .join(', ')})`,
    },
    ai: {
      ratios: recent30Stats.topRatios.slice(0, 3),
      description: `최근 30회 패턴 기반 (${recent30Stats.topRatios
        .slice(0, 3)
        .map((r) => `${r.odd}:${r.even}`)
        .join(', ')}, 최근 트렌드 반영)`,
    },
  }

  await saveFilter(
    'odd-even-ratio-filter',
    result,
    '로또 번호 6개의 홀수와 짝수 비율을 제한하는 필터입니다. 극단적인 비율보다는 균형잡힌 비율이 더 자주 나타납니다.'
  )
}

// 직접 실행 시
if (require.main === module) {
  generateOddEvenRatioFilter().catch(console.error)
}

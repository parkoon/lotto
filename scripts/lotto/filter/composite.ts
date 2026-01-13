#!/usr/bin/env tsx

import { calculateStats, lotto, saveFilter } from './base.js'

/**
 * 합성수 필터 생성
 * 로또 번호 중 합성수 개수를 분석
 */
export async function generateCompositeFilter(): Promise<void> {
  const compositeNumbers = [
    4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28, 30, 32,
    33, 34, 35, 36, 38, 39, 40, 42, 44, 45,
  ]

  const counts = lotto.map(
    (game) =>
      game.numbers.filter((num) => compositeNumbers.includes(num)).length
  )

  const result = calculateStats(counts)

  await saveFilter(
    'composite-filter',
    result,
    '로또 번호 중 합성수의 개수를 제한하는 필터입니다. 합성수는 소수가 아닌 자연수입니다.'
  )
}

// 직접 실행 시
if (require.main === module) {
  generateCompositeFilter().catch(console.error)
}

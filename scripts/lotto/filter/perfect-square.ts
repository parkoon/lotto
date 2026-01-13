#!/usr/bin/env tsx

import { calculateStats, lotto, saveFilter } from './base.js'

/**
 * 완전제곱수 필터 생성
 * 로또 번호 중 완전제곱수 개수를 분석
 */
export async function generatePerfectSquareFilter(): Promise<void> {
  const perfectSquares = [1, 4, 9, 16, 25, 36]

  const counts = lotto.map(
    (game) => game.numbers.filter((num) => perfectSquares.includes(num)).length
  )

  const result = calculateStats(counts)

  await saveFilter(
    'perfect-square-filter',
    result,
    '로또 번호 중 완전제곱수의 개수를 제한하는 필터입니다. 완전제곱수는 1, 4, 9, 16, 25, 36입니다.'
  )
}

// 직접 실행 시
if (require.main === module) {
  generatePerfectSquareFilter().catch(console.error)
}

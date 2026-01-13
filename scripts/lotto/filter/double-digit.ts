#!/usr/bin/env tsx

import { calculateStats, lotto, saveFilter } from './base.js'

/**
 * 쌍수 필터 생성
 * 로또 번호 중 쌍수(11, 22, 33, 44) 개수를 분석
 */
export async function generateDoubleDigitFilter(): Promise<void> {
  const doubleDigits = [11, 22, 33, 44]

  const counts = lotto.map(
    (game) => game.numbers.filter((num) => doubleDigits.includes(num)).length
  )

  const result = calculateStats(counts)

  await saveFilter(
    'double-digit-filter',
    result,
    '로또 번호 중 쌍수(11, 22, 33, 44)의 개수를 제한하는 필터입니다. 쌍수는 십의 자리와 일의 자리가 같은 수입니다.'
  )
}

// 직접 실행 시
if (require.main === module) {
  generateDoubleDigitFilter().catch(console.error)
}

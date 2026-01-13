#!/usr/bin/env tsx

import { calculateStats, lotto, saveFilter } from './base.js'

/**
 * 3의 배수 필터 생성
 * 로또 번호 중 3의 배수 개수를 분석
 */
export async function generateMultipleOf3Filter(): Promise<void> {
  const counts = lotto.map(
    (game) => game.numbers.filter((num) => num % 3 === 0).length
  )

  const result = calculateStats(counts)

  await saveFilter(
    'multiple-of-3-filter',
    result,
    '로또 번호 중 3의 배수 개수를 제한하는 필터입니다. 3의 배수는 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45입니다.'
  )
}

// 직접 실행 시
if (require.main === module) {
  generateMultipleOf3Filter().catch(console.error)
}

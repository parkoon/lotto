#!/usr/bin/env tsx

import { calculateStats, lotto, saveFilter } from './base.js'

/**
 * 5의 배수 필터 생성
 * 로또 번호 중 5의 배수 개수를 분석
 */
export async function generateMultipleOf5Filter(): Promise<void> {
  const counts = lotto.map(
    (game) => game.numbers.filter((num) => num % 5 === 0).length
  )

  const result = calculateStats(counts)

  await saveFilter(
    'multiple-of-5-filter',
    result,
    '로또 번호 중 5의 배수 개수를 제한하는 필터입니다. 5의 배수는 5, 10, 15, 20, 25, 30, 35, 40, 45입니다.'
  )
}

// 직접 실행 시
if (require.main === module) {
  generateMultipleOf5Filter().catch(console.error)
}

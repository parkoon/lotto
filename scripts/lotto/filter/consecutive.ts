#!/usr/bin/env tsx

import { calculateStats, lotto, saveFilter } from './base.js'

/**
 * 연속번호 개수 계산 함수
 */
function calculateConsecutiveCount(numbers: number[]): number {
  const sorted = [...numbers].sort((a, b) => a - b)
  let maxConsecutive = 1
  let currentConsecutive = 1

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === sorted[i - 1] + 1) {
      currentConsecutive++
      maxConsecutive = Math.max(maxConsecutive, currentConsecutive)
    } else {
      currentConsecutive = 1
    }
  }

  return maxConsecutive
}

/**
 * 연속번호 필터 생성
 * 로또 번호 중 연속된 번호의 개수를 분석
 */
export async function generateConsecutiveFilter(): Promise<void> {
  const counts = lotto.map((game) => calculateConsecutiveCount(game.numbers))

  const result = calculateStats(counts)

  await saveFilter(
    'consecutive-filter',
    result,
    '로또 번호 중 연속된 번호의 최대 개수를 제한하는 필터입니다. 연속번호는 1,2,3과 같은 순서대로 이어지는 번호입니다.'
  )
}

// 직접 실행 시
if (require.main === module) {
  generateConsecutiveFilter().catch(console.error)
}

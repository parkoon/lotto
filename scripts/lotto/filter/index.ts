#!/usr/bin/env tsx

import { generateACValueFilter } from './ac-value.js'
import { generateBackSumFilter } from './back-sum.js'
import { generateCompositeFilter } from './composite.js'
import { generateConsecutiveFilter } from './consecutive.js'
import { generateDoubleDigitFilter } from './double-digit.js'
import { generateFirstDigitSumFilter } from './first-digit-sum.js'
import { generateFrontSumFilter } from './front-sum.js'
import { generateHighLowRatioFilter } from './high-low-ratio.js'
import { generateLastDigitSumFilter } from './last-digit-sum.js'
import { generateMultipleOf3Filter } from './multiple-of-3.js'
import { generateMultipleOf5Filter } from './multiple-of-5.js'
import { generateOddEvenRatioFilter } from './odd-even-ratio.js'
import { generatePerfectSquareFilter } from './perfect-square.js'
import { generatePrimeFilter } from './prime.js'
import { generateSumRangeFilter } from './sum-range.js'

/**
 * 모든 로또 필터 생성 (AI 전략은 최근 30회 패턴 기반)
 */
export async function generateAllFilters(): Promise<void> {
  console.log('🚀 로또 필터 생성 시작 (AI 전략: 최근 30회 패턴 기반)...\n')

  // 모든 필터 생성 함수들 (AI 전략은 최근 30회 패턴 기반)
  const filterGenerators = [
    generateSumRangeFilter,
    generateACValueFilter,
    generatePrimeFilter,
    generateMultipleOf3Filter,
    generateMultipleOf5Filter,
    generatePerfectSquareFilter,
    generateCompositeFilter,
    generateFrontSumFilter,
    generateBackSumFilter,
    generateFirstDigitSumFilter,
    generateLastDigitSumFilter,
    generateConsecutiveFilter,
    generateDoubleDigitFilter,
    generateOddEvenRatioFilter,
    generateHighLowRatioFilter,
  ]

  // 모든 필터 순차 실행
  for (const generator of filterGenerators) {
    await generator()
  }

  console.log('\n🎉 모든 필터 파일 생성 완료!')
  console.log('\n📊 생성된 필터 목록 (AI 전략은 최근 30회 패턴 기반):')
  console.log('• sum-range-filter.json - 번호 총합 필터')
  console.log('• ac-value-filter.json - AC값 필터')
  console.log('• prime-filter.json - 소수 필터')
  console.log('• multiple-of-3-filter.json - 3배수 필터')
  console.log('• multiple-of-5-filter.json - 5배수 필터')
  console.log('• perfect-square-filter.json - 완전제곱수 필터')
  console.log('• composite-filter.json - 합성수 필터')
  console.log('• front-sum-filter.json - 앞수합 필터')
  console.log('• back-sum-filter.json - 뒷수합 필터')
  console.log('• first-digit-sum-filter.json - 첫수합 필터')
  console.log('• last-digit-sum-filter.json - 끝수합 필터')
  console.log('• consecutive-filter.json - 연속번호 필터')
  console.log('• double-digit-filter.json - 쌍수 필터')
  console.log('• odd-even-ratio-filter.json - 홀짝 비율 필터')
  console.log('• high-low-ratio-filter.json - 고저 비율 필터')
  console.log('\n💡 AI 전략: 최근 30회 패턴을 반영한 트렌드 기반 필터링')
}

// 스크립트 실행
async function main() {
  await generateAllFilters()
}

if (require.main === module) {
  main().catch(console.error)
}

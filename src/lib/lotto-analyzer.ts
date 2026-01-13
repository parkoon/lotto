/**
 * 로또 번호 분석 유틸리티
 * 생성된 번호의 각 필터 특성을 계산하여 분석 정보 제공
 */

// 분석 결과 타입 정의
export interface LottoAnalysisResult {
  // 기본 정보
  numbers: number[]

  // 합계 기반
  sum: number
  frontSum: number // 작은 3개 합
  backSum: number // 큰 3개 합
  firstDigitSum: number // 십의 자리 합
  lastDigitSum: number // 일의 자리 합

  // 비율 기반
  oddEvenRatio: { odd: number; even: number }
  highLowRatio: { low: number; high: number }

  // 패턴 기반
  acValue: number
  consecutiveCount: number

  // 개수 기반
  primeCount: number
  multipleOf3Count: number
  multipleOf5Count: number
  compositeCount: number
  perfectSquareCount: number
  doubleDigitCount: number
}

// 소수 목록
const PRIME_NUMBERS = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43]

// 합성수 목록 (1은 소수도 합성수도 아님)
const COMPOSITE_NUMBERS = [
  4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28, 30, 32,
  33, 34, 35, 36, 38, 39, 40, 42, 44, 45,
]

// 완전제곱수 목록
const PERFECT_SQUARES = [1, 4, 9, 16, 25, 36]

// 쌍수 목록
const DOUBLE_DIGITS = [11, 22, 33, 44]

/**
 * AC값 계산 함수
 */
const calculateACValue = (numbers: number[]): number => {
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
 * 연속번호 개수 계산 함수
 */
const calculateConsecutiveCount = (numbers: number[]): number => {
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
 * 로또 번호 분석 함수
 * @param numbers 분석할 로또 번호 배열
 * @returns 각 필터별 분석 결과
 */
export const analyzeLottoNumbers = (numbers: number[]): LottoAnalysisResult => {
  const sorted = [...numbers].sort((a, b) => a - b)

  // 합계 계산
  const sum = numbers.reduce((total, num) => total + num, 0)
  const frontSum = sorted.slice(0, 3).reduce((total, num) => total + num, 0)
  const backSum = sorted.slice(-3).reduce((total, num) => total + num, 0)
  const firstDigitSum = numbers.reduce(
    (total, num) => total + Math.floor(num / 10),
    0
  )
  const lastDigitSum = numbers.reduce((total, num) => total + (num % 10), 0)

  // 비율 계산
  const oddCount = numbers.filter((num) => num % 2 === 1).length
  const evenCount = numbers.length - oddCount
  const lowCount = numbers.filter((num) => num <= 22).length
  const highCount = numbers.length - lowCount

  // 패턴 계산
  const acValue = calculateACValue(numbers)
  const consecutiveCount = calculateConsecutiveCount(numbers)

  // 개수 계산
  const primeCount = numbers.filter((num) => PRIME_NUMBERS.includes(num)).length
  const multipleOf3Count = numbers.filter((num) => num % 3 === 0).length
  const multipleOf5Count = numbers.filter((num) => num % 5 === 0).length
  const compositeCount = numbers.filter((num) =>
    COMPOSITE_NUMBERS.includes(num)
  ).length
  const perfectSquareCount = numbers.filter((num) =>
    PERFECT_SQUARES.includes(num)
  ).length
  const doubleDigitCount = numbers.filter((num) =>
    DOUBLE_DIGITS.includes(num)
  ).length

  return {
    numbers: sorted,
    sum,
    frontSum,
    backSum,
    firstDigitSum,
    lastDigitSum,
    oddEvenRatio: { odd: oddCount, even: evenCount },
    highLowRatio: { low: lowCount, high: highCount },
    acValue,
    consecutiveCount,
    primeCount,
    multipleOf3Count,
    multipleOf5Count,
    compositeCount,
    perfectSquareCount,
    doubleDigitCount,
  }
}

/**
 * 분석 결과를 요약 문자열로 변환
 */
export const formatAnalysisResult = (
  analysis: LottoAnalysisResult
): string[] => {
  return [
    `총합: ${analysis.sum}`,
    `홀짝비율: ${analysis.oddEvenRatio.odd}:${analysis.oddEvenRatio.even}`,
    `고저비율: ${analysis.highLowRatio.low}:${analysis.highLowRatio.high}`,
    `AC값: ${analysis.acValue}`,
    `앞수합: ${analysis.frontSum}`,
    `뒤수합: ${analysis.backSum}`,
    `첫수합: ${analysis.firstDigitSum}`,
    `끝수합: ${analysis.lastDigitSum}`,
    `소수: ${analysis.primeCount}개`,
    `연속번호: ${analysis.consecutiveCount}개`,
    ...(analysis.multipleOf3Count > 0
      ? [`3배수: ${analysis.multipleOf3Count}개`]
      : []),
    ...(analysis.multipleOf5Count > 0
      ? [`5배수: ${analysis.multipleOf5Count}개`]
      : []),
    ...(analysis.compositeCount > 0
      ? [`합성수: ${analysis.compositeCount}개`]
      : []),
    ...(analysis.perfectSquareCount > 0
      ? [`완전제곱수: ${analysis.perfectSquareCount}개`]
      : []),
    ...(analysis.doubleDigitCount > 0
      ? [`쌍수: ${analysis.doubleDigitCount}개`]
      : []),
  ]
}

/**
 * 여러 번호 세트에 대한 일괄 분석
 */
export const analyzeMultipleLottoNumbers = (
  numberSets: number[][]
): LottoAnalysisResult[] => {
  return numberSets.map((numbers) => analyzeLottoNumbers(numbers))
}

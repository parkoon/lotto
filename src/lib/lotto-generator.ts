import { FilterState } from '@/store/filter-store'

// 로또 번호 생성 결과 타입
export interface LottoGenerationResult {
  success: boolean
  numbers: number[][]
  message?: string
  failedFilters?: string[]
  attempts?: number
  maxAttempts?: number
}

// 필터 검증 결과 타입
interface FilterValidationResult {
  isValid: boolean
  filterName: string
  reason?: string
}

// 소수 목록
const PRIME_NUMBERS = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43]

// 합성수 목록
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
 * 산술적 복잡성 - 모든 번호 쌍의 차이값 중 유니크한 개수에서 -5
 */
const calculateACValue = (numbers: number[]): number => {
  const sortedNumbers = [...numbers].sort((a, b) => a - b)
  const differences = []

  // 모든 번호 쌍의 차이 계산
  for (let i = 0; i < sortedNumbers.length; i++) {
    for (let j = i + 1; j < sortedNumbers.length; j++) {
      differences.push(sortedNumbers[j] - sortedNumbers[i])
    }
  }

  // 유니크한 차이값 개수에서 5를 뺀 값이 AC값
  return new Set(differences).size - 5
}

/**
 * 연속번호 개수 계산 함수
 */
const calculateConsecutiveCount = (numbers: number[]): number => {
  const sortedNumbers = [...numbers].sort((a, b) => a - b)
  let maxConsecutive = 1
  let currentConsecutive = 1

  for (let i = 1; i < sortedNumbers.length; i++) {
    if (sortedNumbers[i] === sortedNumbers[i - 1] + 1) {
      currentConsecutive++
      maxConsecutive = Math.max(maxConsecutive, currentConsecutive)
    } else {
      currentConsecutive = 1
    }
  }

  return maxConsecutive
}

/**
 * 개별 필터 검증 함수들
 */
const validateFixedNumbers = (
  numbers: number[],
  filter: FilterState['fixedNumbers']
): FilterValidationResult => {
  if (!filter.enabled) return { isValid: true, filterName: '고정수' }

  const hasAllFixedNumbers = filter.value.every((fixed) =>
    numbers.includes(fixed)
  )
  return {
    isValid: hasAllFixedNumbers,
    filterName: '고정수',
    reason: hasAllFixedNumbers
      ? undefined
      : `고정수 ${filter.value.join(', ')}이 모두 포함되어야 합니다`,
  }
}

const validateExcludeNumbers = (
  numbers: number[],
  filter: FilterState['excludeNumbers']
): FilterValidationResult => {
  if (!filter.enabled) return { isValid: true, filterName: '제외수' }

  const hasExcludedNumbers = filter.value.some((excluded) =>
    numbers.includes(excluded)
  )
  return {
    isValid: !hasExcludedNumbers,
    filterName: '제외수',
    reason: hasExcludedNumbers
      ? `제외수 ${filter.value.join(', ')} 중 일부가 포함되어 있습니다`
      : undefined,
  }
}

const validateSumRange = (
  numbers: number[],
  filter: FilterState['sumRange']
): FilterValidationResult => {
  if (!filter.enabled) return { isValid: true, filterName: '총합' }

  const sum = numbers.reduce((acc, num) => acc + num, 0)
  const isValid = sum >= filter.value.min && sum <= filter.value.max
  return {
    isValid,
    filterName: '총합',
    reason: isValid
      ? undefined
      : `총합 ${sum}이 범위 ${filter.value.min}-${filter.value.max}를 벗어납니다`,
  }
}

const validateOddEvenRatio = (
  numbers: number[],
  filter: FilterState['oddEvenRatio']
): FilterValidationResult => {
  if (!filter.enabled || filter.value.length === 0)
    return { isValid: true, filterName: '홀짝비율' }

  const oddCount = numbers.filter((num) => num % 2 === 1).length
  const evenCount = numbers.length - oddCount

  // 설정된 비율들 중 하나라도 일치하면 유효
  const isValid = filter.value.some(
    (ratio) => oddCount === ratio.odd && evenCount === ratio.even
  )

  return {
    isValid,
    filterName: '홀짝비율',
    reason: isValid
      ? undefined
      : `홀짝비율 ${oddCount}:${evenCount}이 설정된 비율들과 일치하지 않습니다`,
  }
}

const validateHighLowRatio = (
  numbers: number[],
  filter: FilterState['highLowRatio']
): FilterValidationResult => {
  if (!filter.enabled || filter.value.length === 0)
    return { isValid: true, filterName: '고저비율' }

  const lowCount = numbers.filter((num) => num <= 22).length
  const highCount = numbers.length - lowCount

  // 설정된 비율들 중 하나라도 일치하면 유효
  const isValid = filter.value.some(
    (ratio) => lowCount === ratio.low && highCount === ratio.high
  )

  return {
    isValid,
    filterName: '고저비율',
    reason: isValid
      ? undefined
      : `고저비율 ${lowCount}:${highCount}이 설정된 비율들과 일치하지 않습니다`,
  }
}

const validateACRange = (
  numbers: number[],
  filter: FilterState['acRange']
): FilterValidationResult => {
  if (!filter.enabled) return { isValid: true, filterName: 'AC값' }

  const acValue = calculateACValue(numbers)
  const isValid = acValue >= filter.value.min && acValue <= filter.value.max
  return {
    isValid,
    filterName: 'AC값',
    reason: isValid
      ? undefined
      : `AC값 ${acValue}이 범위 ${filter.value.min}-${filter.value.max}를 벗어납니다`,
  }
}

const validatePrimeCount = (
  numbers: number[],
  filter: FilterState['prime']
): FilterValidationResult => {
  if (!filter.enabled) return { isValid: true, filterName: '소수' }

  const primeCount = numbers.filter((num) => PRIME_NUMBERS.includes(num)).length
  const isValid =
    primeCount >= filter.value.min && primeCount <= filter.value.max
  return {
    isValid,
    filterName: '소수',
    reason: isValid
      ? undefined
      : `소수 개수 ${primeCount}이 범위 ${filter.value.min}-${filter.value.max}를 벗어납니다`,
  }
}

const validateMultipleOf3Count = (
  numbers: number[],
  filter: FilterState['multipleOf3']
): FilterValidationResult => {
  if (!filter.enabled) return { isValid: true, filterName: '3배수' }

  const multipleOf3Count = numbers.filter((num) => num % 3 === 0).length
  const isValid =
    multipleOf3Count >= filter.value.min && multipleOf3Count <= filter.value.max
  return {
    isValid,
    filterName: '3배수',
    reason: isValid
      ? undefined
      : `3배수 개수 ${multipleOf3Count}이 범위 ${filter.value.min}-${filter.value.max}를 벗어납니다`,
  }
}

const validateMultipleOf5Count = (
  numbers: number[],
  filter: FilterState['multipleOf5']
): FilterValidationResult => {
  if (!filter.enabled) return { isValid: true, filterName: '5배수' }

  const multipleOf5Count = numbers.filter((num) => num % 5 === 0).length
  const isValid =
    multipleOf5Count >= filter.value.min && multipleOf5Count <= filter.value.max
  return {
    isValid,
    filterName: '5배수',
    reason: isValid
      ? undefined
      : `5배수 개수 ${multipleOf5Count}이 범위 ${filter.value.min}-${filter.value.max}를 벗어납니다`,
  }
}

const validateCompositeCount = (
  numbers: number[],
  filter: FilterState['composite']
): FilterValidationResult => {
  if (!filter.enabled) return { isValid: true, filterName: '합성수' }

  const compositeCount = numbers.filter((num) =>
    COMPOSITE_NUMBERS.includes(num)
  ).length
  const isValid =
    compositeCount >= filter.value.min && compositeCount <= filter.value.max
  return {
    isValid,
    filterName: '합성수',
    reason: isValid
      ? undefined
      : `합성수 개수 ${compositeCount}이 범위 ${filter.value.min}-${filter.value.max}를 벗어납니다`,
  }
}

const validatePerfectSquareCount = (
  numbers: number[],
  filter: FilterState['perfectSquare']
): FilterValidationResult => {
  if (!filter.enabled) return { isValid: true, filterName: '완전제곱수' }

  const perfectSquareCount = numbers.filter((num) =>
    PERFECT_SQUARES.includes(num)
  ).length
  const isValid =
    perfectSquareCount >= filter.value.min &&
    perfectSquareCount <= filter.value.max
  return {
    isValid,
    filterName: '완전제곱수',
    reason: isValid
      ? undefined
      : `완전제곱수 개수 ${perfectSquareCount}이 범위 ${filter.value.min}-${filter.value.max}를 벗어납니다`,
  }
}

const validateDoubleDigitCount = (
  numbers: number[],
  filter: FilterState['doubleDigit']
): FilterValidationResult => {
  if (!filter.enabled) return { isValid: true, filterName: '쌍수' }

  const doubleDigitCount = numbers.filter((num) =>
    DOUBLE_DIGITS.includes(num)
  ).length
  const isValid =
    doubleDigitCount >= filter.value.min && doubleDigitCount <= filter.value.max
  return {
    isValid,
    filterName: '쌍수',
    reason: isValid
      ? undefined
      : `쌍수 개수 ${doubleDigitCount}이 범위 ${filter.value.min}-${filter.value.max}를 벗어납니다`,
  }
}

const validateConsecutiveCount = (
  numbers: number[],
  filter: FilterState['consecutive']
): FilterValidationResult => {
  if (!filter.enabled) return { isValid: true, filterName: '연속번호' }

  const consecutiveCount = calculateConsecutiveCount(numbers)
  const isValid =
    consecutiveCount >= filter.value.min && consecutiveCount <= filter.value.max
  return {
    isValid,
    filterName: '연속번호',
    reason: isValid
      ? undefined
      : `연속번호 개수 ${consecutiveCount}이 범위 ${filter.value.min}-${filter.value.max}를 벗어납니다`,
  }
}

const validateFrontSum = (
  numbers: number[],
  filter: FilterState['frontSum']
): FilterValidationResult => {
  if (!filter.enabled) return { isValid: true, filterName: '앞수합' }

  const sortedNumbers = [...numbers].sort((a, b) => a - b)
  const frontSum = sortedNumbers.slice(0, 3).reduce((sum, num) => sum + num, 0)
  const isValid = frontSum >= filter.value.min && frontSum <= filter.value.max
  return {
    isValid,
    filterName: '앞수합',
    reason: isValid
      ? undefined
      : `앞수합 ${frontSum}이 범위 ${filter.value.min}-${filter.value.max}를 벗어납니다`,
  }
}

const validateBackSum = (
  numbers: number[],
  filter: FilterState['backSum']
): FilterValidationResult => {
  if (!filter.enabled) return { isValid: true, filterName: '뒷수합' }

  const sortedNumbers = [...numbers].sort((a, b) => a - b)
  const backSum = sortedNumbers.slice(-3).reduce((sum, num) => sum + num, 0)
  const isValid = backSum >= filter.value.min && backSum <= filter.value.max
  return {
    isValid,
    filterName: '뒷수합',
    reason: isValid
      ? undefined
      : `뒷수합 ${backSum}이 범위 ${filter.value.min}-${filter.value.max}를 벗어납니다`,
  }
}

const validateFirstDigitSum = (
  numbers: number[],
  filter: FilterState['firstDigitSum']
): FilterValidationResult => {
  if (!filter.enabled) return { isValid: true, filterName: '첫수합' }

  const firstDigitSum = numbers.reduce(
    (sum, num) => sum + Math.floor(num / 10),
    0
  )
  const isValid =
    firstDigitSum >= filter.value.min && firstDigitSum <= filter.value.max
  return {
    isValid,
    filterName: '첫수합',
    reason: isValid
      ? undefined
      : `첫수합 ${firstDigitSum}이 범위 ${filter.value.min}-${filter.value.max}를 벗어납니다`,
  }
}

const validateLastDigitSum = (
  numbers: number[],
  filter: FilterState['lastDigitSum']
): FilterValidationResult => {
  if (!filter.enabled) return { isValid: true, filterName: '끝수합' }

  const lastDigitSum = numbers.reduce((sum, num) => sum + (num % 10), 0)
  const isValid =
    lastDigitSum >= filter.value.min && lastDigitSum <= filter.value.max
  return {
    isValid,
    filterName: '끝수합',
    reason: isValid
      ? undefined
      : `끝수합 ${lastDigitSum}이 범위 ${filter.value.min}-${filter.value.max}를 벗어납니다`,
  }
}

/**
 * 모든 필터 검증 함수
 */
const validateAllFilters = (
  numbers: number[],
  filters: FilterState
): FilterValidationResult[] => {
  const results: FilterValidationResult[] = []

  // 각 필터 검증
  results.push(validateFixedNumbers(numbers, filters.fixedNumbers))
  results.push(validateExcludeNumbers(numbers, filters.excludeNumbers))
  results.push(validateSumRange(numbers, filters.sumRange))
  results.push(validateOddEvenRatio(numbers, filters.oddEvenRatio))
  results.push(validateHighLowRatio(numbers, filters.highLowRatio))
  results.push(validateACRange(numbers, filters.acRange))
  results.push(validatePrimeCount(numbers, filters.prime))
  results.push(validateMultipleOf3Count(numbers, filters.multipleOf3))
  results.push(validateMultipleOf5Count(numbers, filters.multipleOf5))
  results.push(validateCompositeCount(numbers, filters.composite))
  results.push(validatePerfectSquareCount(numbers, filters.perfectSquare))
  results.push(validateDoubleDigitCount(numbers, filters.doubleDigit))
  results.push(validateConsecutiveCount(numbers, filters.consecutive))
  results.push(validateFrontSum(numbers, filters.frontSum))
  results.push(validateBackSum(numbers, filters.backSum))
  results.push(validateFirstDigitSum(numbers, filters.firstDigitSum))
  results.push(validateLastDigitSum(numbers, filters.lastDigitSum))

  return results
}

/**
 * 단일 로또 번호 세트 생성 (필터 적용)
 */
const generateSingleLottoNumbers = (filters: FilterState): number[] | null => {
  const MAX_ATTEMPTS = 100000
  let attempts = 0

  while (attempts < MAX_ATTEMPTS) {
    attempts++

    // 기본 랜덤 번호 생성
    const numbers = new Set<number>()
    while (numbers.size < 6) {
      const randomNumber = Math.floor(Math.random() * 45) + 1
      numbers.add(randomNumber)
    }

    const numberArray = Array.from(numbers).sort((a, b) => a - b)

    // 모든 필터 검증
    const validationResults = validateAllFilters(numberArray, filters)
    const isValid = validationResults.every((result) => result.isValid)

    if (isValid) {
      return numberArray
    }
  }

  return null // 최대 시도 횟수 초과
}

/**
 * 여러 로또 번호 세트 생성 (필터 적용)
 * @param filters 필터 조건
 * @param count 생성할 번호 세트 개수
 * @param onProgress 진행률 콜백 (선택사항)
 */
export const generateFilteredLottoNumbers = async (
  filters: FilterState,
  count: number,
  onProgress?: (progress: number, attempts: number) => void
): Promise<LottoGenerationResult> => {
  const result: LottoGenerationResult = {
    success: false,
    numbers: [],
    attempts: 0,
    maxAttempts: 100000 * count,
  }

  const generatedNumbers: number[][] = []
  let totalAttempts = 0

  try {
    for (let i = 0; i < count; i++) {
      // 진행률 업데이트
      if (onProgress) {
        onProgress((i / count) * 100, totalAttempts)
      }

      const numbers = generateSingleLottoNumbers(filters)

      if (numbers === null) {
        // 생성 실패
        result.success = false
        result.message = `번호 생성에 실패했습니다. 필터 조건을 완화해주세요.`
        result.attempts = totalAttempts

        // 실패한 필터 정보 수집
        const sampleNumbers = Array.from({ length: 6 }, (_, i) => i + 1)
        const validationResults = validateAllFilters(sampleNumbers, filters)
        const enabledFilters = validationResults.filter(
          (r) => r.filterName !== '고정수' && r.filterName !== '제외수'
        )

        result.failedFilters = enabledFilters
          .filter((r) => !r.isValid)
          .map((r) => r.filterName)

        return result
      }

      generatedNumbers.push(numbers)
      totalAttempts += 1000 // 추정 시도 횟수 (실제 구현에서는 정확히 계산)
    }

    // 최종 진행률 업데이트
    if (onProgress) {
      onProgress(100, totalAttempts)
    }

    result.success = true
    result.numbers = generatedNumbers
    result.attempts = totalAttempts
    result.message = `성공적으로 ${count}개의 번호를 생성했습니다.`
  } catch {
    result.success = false
    result.message = '번호 생성 중 오류가 발생했습니다.'
    result.attempts = totalAttempts
  }

  return result
}

/**
 * 기본 로또 번호 생성 (필터 미적용)
 */
export const generateBasicLottoNumbers = (count: number = 1): number[][] => {
  const results: number[][] = []

  for (let i = 0; i < count; i++) {
    const numbers = new Set<number>()
    while (numbers.size < 6) {
      const randomNumber = Math.floor(Math.random() * 45) + 1
      numbers.add(randomNumber)
    }
    results.push(Array.from(numbers).sort((a, b) => a - b))
  }

  return results
}

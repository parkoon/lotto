'use client'

import { useFilterStore } from '@/store/filter-store'

/**
 * 활성화된 필터 상태를 표시하는 컴포넌트
 */
export const LottoFilterDisplay = () => {
  const filters = useFilterStore()

  // 필터 요약 정보를 생성하는 함수들
  const getFilterSummaries = () => {
    const summaries: Array<{ name: string; value: string; enabled: boolean }> =
      []

    // 고정수
    if (filters.fixedNumbers.enabled && filters.fixedNumbers.value.length > 0) {
      summaries.push({
        name: '고정수',
        value: filters.fixedNumbers.value.join(', '),
        enabled: true,
      })
    }

    // 제외수
    if (
      filters.excludeNumbers.enabled &&
      filters.excludeNumbers.value.length > 0
    ) {
      summaries.push({
        name: '제외수',
        value:
          filters.excludeNumbers.value.length > 5
            ? `${filters.excludeNumbers.value.slice(0, 5).join(', ')}...`
            : filters.excludeNumbers.value.join(', '),
        enabled: true,
      })
    }

    // 총합 범위
    if (filters.sumRange.enabled) {
      summaries.push({
        name: '총합',
        value: `${filters.sumRange.value.min}-${filters.sumRange.value.max}`,
        enabled: true,
      })
    }

    // 홀짝 비율
    if (filters.oddEvenRatio.enabled && filters.oddEvenRatio.value.length > 0) {
      const ratios = filters.oddEvenRatio.value
        .map((r) => `${r.odd}:${r.even}`)
        .join(',')
      summaries.push({
        name: '홀짝비율',
        value: `${filters.oddEvenRatio.value.length}개 (${ratios})`,
        enabled: true,
      })
    }

    // 고저 비율
    if (filters.highLowRatio.enabled && filters.highLowRatio.value.length > 0) {
      const ratios = filters.highLowRatio.value
        .map((r) => `${r.low}:${r.high}`)
        .join(',')
      summaries.push({
        name: '고저비율',
        value: `${filters.highLowRatio.value.length}개 (${ratios})`,
        enabled: true,
      })
    }

    // AC값 범위
    if (filters.acRange.enabled) {
      summaries.push({
        name: 'AC값',
        value: `${filters.acRange.value.min}-${filters.acRange.value.max}`,
        enabled: true,
      })
    }

    // 소수
    if (filters.prime.enabled) {
      const primeValue = filters.prime.value
      const displayValue =
        typeof primeValue === 'object' && primeValue
          ? primeValue.min === primeValue.max
            ? `${primeValue.min}개`
            : `${primeValue.min}-${primeValue.max}개`
          : '설정됨'

      summaries.push({
        name: '소수',
        value: displayValue,
        enabled: true,
      })
    }

    // 3배수
    if (filters.multipleOf3.enabled) {
      const multipleOf3Value = filters.multipleOf3.value
      const displayValue =
        typeof multipleOf3Value === 'object' && multipleOf3Value
          ? multipleOf3Value.min === multipleOf3Value.max
            ? `${multipleOf3Value.min}개`
            : `${multipleOf3Value.min}-${multipleOf3Value.max}개`
          : '설정됨'

      summaries.push({
        name: '3배수',
        value: displayValue,
        enabled: true,
      })
    }

    // 5배수
    if (filters.multipleOf5.enabled) {
      const multipleOf5Value = filters.multipleOf5.value
      const displayValue =
        typeof multipleOf5Value === 'object' && multipleOf5Value
          ? multipleOf5Value.min === multipleOf5Value.max
            ? `${multipleOf5Value.min}개`
            : `${multipleOf5Value.min}-${multipleOf5Value.max}개`
          : '설정됨'

      summaries.push({
        name: '5배수',
        value: displayValue,
        enabled: true,
      })
    }

    // 합성수
    if (filters.composite.enabled) {
      const compositeValue = filters.composite.value
      const displayValue =
        typeof compositeValue === 'object' && compositeValue
          ? compositeValue.min === compositeValue.max
            ? `${compositeValue.min}개`
            : `${compositeValue.min}-${compositeValue.max}개`
          : '설정됨'

      summaries.push({
        name: '합성수',
        value: displayValue,
        enabled: true,
      })
    }

    // 완전제곱수
    if (filters.perfectSquare.enabled) {
      const perfectSquareValue = filters.perfectSquare.value
      const displayValue =
        typeof perfectSquareValue === 'object' && perfectSquareValue
          ? perfectSquareValue.min === perfectSquareValue.max
            ? `${perfectSquareValue.min}개`
            : `${perfectSquareValue.min}-${perfectSquareValue.max}개`
          : '설정됨'

      summaries.push({
        name: '완전제곱수',
        value: displayValue,
        enabled: true,
      })
    }

    // 두 자리수
    if (filters.doubleDigit.enabled) {
      const doubleDigitValue = filters.doubleDigit.value
      const displayValue =
        typeof doubleDigitValue === 'object' && doubleDigitValue
          ? doubleDigitValue.min === doubleDigitValue.max
            ? `${doubleDigitValue.min}개`
            : `${doubleDigitValue.min}-${doubleDigitValue.max}개`
          : '설정됨'

      summaries.push({
        name: '두 자리수',
        value: displayValue,
        enabled: true,
      })
    }

    // 연속수
    if (filters.consecutive.enabled) {
      const consecutiveValue = filters.consecutive.value
      const displayValue =
        typeof consecutiveValue === 'object' && consecutiveValue
          ? consecutiveValue.min === consecutiveValue.max
            ? `최대 ${consecutiveValue.min}개`
            : `${consecutiveValue.min}-${consecutiveValue.max}개`
          : '설정됨'

      summaries.push({
        name: '연속수',
        value: displayValue,
        enabled: true,
      })
    }

    // 앞수합
    if (filters.frontSum.enabled) {
      summaries.push({
        name: '앞수합',
        value: `${filters.frontSum.value.min}-${filters.frontSum.value.max}`,
        enabled: true,
      })
    }

    // 뒷수합
    if (filters.backSum.enabled) {
      summaries.push({
        name: '뒷수합',
        value: `${filters.backSum.value.min}-${filters.backSum.value.max}`,
        enabled: true,
      })
    }

    // 첫수합
    if (filters.firstDigitSum.enabled) {
      summaries.push({
        name: '첫수합',
        value: `${filters.firstDigitSum.value.min}-${filters.firstDigitSum.value.max}`,
        enabled: true,
      })
    }

    // 끝수합
    if (filters.lastDigitSum.enabled) {
      summaries.push({
        name: '끝수합',
        value: `${filters.lastDigitSum.value.min}-${filters.lastDigitSum.value.max}`,
        enabled: true,
      })
    }

    return summaries
  }

  const activeSummaries = getFilterSummaries()

  if (activeSummaries.length === 0) {
    return (
      <div className="rounded-lg bg-neutral-50 pb-4 text-center">
        <p className="text-sm text-neutral-500">활성화된 필터가 없습니다</p>
        <p className="mt-1 text-xs text-neutral-400">
          필터 설정 페이지에서 조건을 설정해보세요
        </p>
      </div>
    )
  }

  return (
    <div className="flex gap-2 overflow-x-scroll pb-2">
      {activeSummaries.map((summary, index) => (
        <div
          key={index}
          className="nb-shadow flex-shrink-0 rounded bg-white px-3 py-2 text-xs"
        >
          {summary.name}: {summary.value}
        </div>
      ))}
    </div>
  )
}

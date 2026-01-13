import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import acValueFilter from '../data/lotto/filter/ac-value-filter.json'
import backSumFilter from '../data/lotto/filter/back-sum-filter.json'
import compositeFilter from '../data/lotto/filter/composite-filter.json'
import consecutiveFilter from '../data/lotto/filter/consecutive-filter.json'
import doubleDigitFilter from '../data/lotto/filter/double-digit-filter.json'
import firstDigitSumFilter from '../data/lotto/filter/first-digit-sum-filter.json'
import frontSumFilter from '../data/lotto/filter/front-sum-filter.json'
import highLowRatioFilter from '../data/lotto/filter/high-low-ratio-filter.json'
import lastDigitSumFilter from '../data/lotto/filter/last-digit-sum-filter.json'
import multipleOf3Filter from '../data/lotto/filter/multiple-of-3-filter.json'
import multipleOf5Filter from '../data/lotto/filter/multiple-of-5-filter.json'
import oddEvenRatioFilter from '../data/lotto/filter/odd-even-ratio-filter.json'
import perfectSquareFilter from '../data/lotto/filter/perfect-square-filter.json'
import primeFilter from '../data/lotto/filter/prime-filter.json'
// 필터 데이터 import
import sumRangeFilter from '../data/lotto/filter/sum-range-filter.json'

// 필터 아이템 타입 정의
type FilterItem<T> = {
  value: T
  enabled: boolean
}

// 필터 상태 타입 정의
export interface FilterState {
  // 고정수/제외수
  fixedNumbers: FilterItem<number[]>
  excludeNumbers: FilterItem<number[]>

  // 총합 범위
  sumRange: FilterItem<{ min: number; max: number }>

  // 홀짝/고저 비율 (여러 비율 지원)
  oddEvenRatio: FilterItem<{ odd: number; even: number }[]>
  highLowRatio: FilterItem<{ low: number; high: number }[]>

  // 수합 필터들 (범위 형태로 수정)
  frontSum: FilterItem<{ min: number; max: number }>
  backSum: FilterItem<{ min: number; max: number }>
  firstDigitSum: FilterItem<{ min: number; max: number }>
  lastDigitSum: FilterItem<{ min: number; max: number }>

  // AC값 범위
  acRange: FilterItem<{ min: number; max: number }>

  // 숫자 타입별 필터 (범위 형태로 수정)
  prime: FilterItem<{ min: number; max: number }>
  multipleOf3: FilterItem<{ min: number; max: number }>
  composite: FilterItem<{ min: number; max: number }>

  // 특별한 숫자 타입들 (범위 형태로 수정)
  multipleOf5: FilterItem<{ min: number; max: number }>
  perfectSquare: FilterItem<{ min: number; max: number }>
  doubleDigit: FilterItem<{ min: number; max: number }>
  consecutive: FilterItem<{ min: number; max: number }>
}

// 필터 액션 타입 정의
interface FilterActions {
  // 고정수/제외수 액션
  setFixedNumbers: (numbers: number[]) => void
  setExcludeNumbers: (numbers: number[]) => void
  toggleFixedNumbers: () => void
  toggleExcludeNumbers: () => void

  // 총합 범위 액션
  setSumRange: (range: { min: number; max: number }) => void
  toggleSumRange: () => void

  // 홀짝/고저 비율 액션
  setOddEvenRatio: (ratios: { odd: number; even: number }[]) => void
  setHighLowRatio: (ratios: { low: number; high: number }[]) => void
  toggleOddEvenRatio: () => void
  toggleHighLowRatio: () => void

  // 수합 필터 액션
  setFrontSum: (range: { min: number; max: number }) => void
  setBackSum: (range: { min: number; max: number }) => void
  setFirstDigitSum: (range: { min: number; max: number }) => void
  setLastDigitSum: (range: { min: number; max: number }) => void
  toggleFrontSum: () => void
  toggleBackSum: () => void
  toggleFirstDigitSum: () => void
  toggleLastDigitSum: () => void

  // AC값 범위 액션
  setACRange: (range: { min: number; max: number }) => void
  toggleACRange: () => void

  // 숫자 타입별 필터 액션
  setPrimeRange: (range: { min: number; max: number }) => void
  setMultipleOf3Range: (range: { min: number; max: number }) => void
  setCompositeRange: (range: { min: number; max: number }) => void
  togglePrime: () => void
  toggleMultipleOf3: () => void
  toggleComposite: () => void

  // 특별한 숫자 타입 액션
  setMultipleOf5Range: (range: { min: number; max: number }) => void
  setPerfectSquareRange: (range: { min: number; max: number }) => void
  setDoubleDigitRange: (range: { min: number; max: number }) => void
  setConsecutiveRange: (range: { min: number; max: number }) => void
  toggleMultipleOf5: () => void
  togglePerfectSquare: () => void
  toggleDoubleDigit: () => void
  toggleConsecutive: () => void

  // 필터 초기화 (균형적 전략 기반)
  resetFilters: () => void
}

// 균형적 전략 기반 기본 필터 상태
const defaultFilterState: FilterState = {
  fixedNumbers: { value: [], enabled: false },
  excludeNumbers: { value: [], enabled: false },
  sumRange: { value: sumRangeFilter.balanced, enabled: true },
  oddEvenRatio: { value: oddEvenRatioFilter.balanced.ratios, enabled: true },
  highLowRatio: { value: highLowRatioFilter.balanced.ratios, enabled: true },
  frontSum: { value: frontSumFilter.balanced, enabled: true },
  backSum: { value: backSumFilter.balanced, enabled: true },
  firstDigitSum: { value: firstDigitSumFilter.balanced, enabled: true },
  lastDigitSum: { value: lastDigitSumFilter.balanced, enabled: true },
  acRange: { value: acValueFilter.balanced, enabled: true },
  prime: { value: primeFilter.balanced, enabled: true },
  multipleOf3: { value: multipleOf3Filter.balanced, enabled: true },
  composite: { value: compositeFilter.balanced, enabled: true },
  multipleOf5: { value: multipleOf5Filter.balanced, enabled: true },
  perfectSquare: { value: perfectSquareFilter.balanced, enabled: true },
  doubleDigit: { value: doubleDigitFilter.balanced, enabled: true },
  consecutive: { value: consecutiveFilter.balanced, enabled: true },
}

// 필터 스토어 생성
export const useFilterStore = create<FilterState & FilterActions>()(
  persist(
    (set) => ({
      ...defaultFilterState,

      // 고정수/제외수 액션
      setFixedNumbers: (numbers) =>
        set((state) => ({
          fixedNumbers: { ...state.fixedNumbers, value: numbers },
        })),
      setExcludeNumbers: (numbers) =>
        set((state) => ({
          excludeNumbers: { ...state.excludeNumbers, value: numbers },
        })),
      toggleFixedNumbers: () =>
        set((state) => ({
          fixedNumbers: {
            ...state.fixedNumbers,
            enabled: !state.fixedNumbers.enabled,
          },
        })),
      toggleExcludeNumbers: () =>
        set((state) => ({
          excludeNumbers: {
            ...state.excludeNumbers,
            enabled: !state.excludeNumbers.enabled,
          },
        })),

      // 총합 범위 액션
      setSumRange: (range) =>
        set((state) => ({
          sumRange: { ...state.sumRange, value: range },
        })),
      toggleSumRange: () =>
        set((state) => ({
          sumRange: { ...state.sumRange, enabled: !state.sumRange.enabled },
        })),

      // 홀짝/고저 비율 액션
      setOddEvenRatio: (ratios) =>
        set((state) => ({
          oddEvenRatio: { ...state.oddEvenRatio, value: ratios },
        })),
      setHighLowRatio: (ratios) =>
        set((state) => ({
          highLowRatio: { ...state.highLowRatio, value: ratios },
        })),
      toggleOddEvenRatio: () =>
        set((state) => ({
          oddEvenRatio: {
            ...state.oddEvenRatio,
            enabled: !state.oddEvenRatio.enabled,
          },
        })),
      toggleHighLowRatio: () =>
        set((state) => ({
          highLowRatio: {
            ...state.highLowRatio,
            enabled: !state.highLowRatio.enabled,
          },
        })),

      // 수합 필터 액션
      setFrontSum: (range) =>
        set((state) => ({
          frontSum: { ...state.frontSum, value: range },
        })),
      setBackSum: (range) =>
        set((state) => ({
          backSum: { ...state.backSum, value: range },
        })),
      setFirstDigitSum: (range) =>
        set((state) => ({
          firstDigitSum: { ...state.firstDigitSum, value: range },
        })),
      setLastDigitSum: (range) =>
        set((state) => ({
          lastDigitSum: { ...state.lastDigitSum, value: range },
        })),
      toggleFrontSum: () =>
        set((state) => ({
          frontSum: { ...state.frontSum, enabled: !state.frontSum.enabled },
        })),
      toggleBackSum: () =>
        set((state) => ({
          backSum: { ...state.backSum, enabled: !state.backSum.enabled },
        })),
      toggleFirstDigitSum: () =>
        set((state) => ({
          firstDigitSum: {
            ...state.firstDigitSum,
            enabled: !state.firstDigitSum.enabled,
          },
        })),
      toggleLastDigitSum: () =>
        set((state) => ({
          lastDigitSum: {
            ...state.lastDigitSum,
            enabled: !state.lastDigitSum.enabled,
          },
        })),

      // AC값 범위 액션
      setACRange: (range) =>
        set((state) => ({
          acRange: { ...state.acRange, value: range },
        })),
      toggleACRange: () =>
        set((state) => ({
          acRange: { ...state.acRange, enabled: !state.acRange.enabled },
        })),

      // 숫자 타입별 필터 액션
      setPrimeRange: (range) =>
        set((state) => ({
          prime: { ...state.prime, value: range },
        })),
      setMultipleOf3Range: (range) =>
        set((state) => ({
          multipleOf3: { ...state.multipleOf3, value: range },
        })),
      setCompositeRange: (range) =>
        set((state) => ({
          composite: { ...state.composite, value: range },
        })),
      togglePrime: () =>
        set((state) => ({
          prime: { ...state.prime, enabled: !state.prime.enabled },
        })),
      toggleMultipleOf3: () =>
        set((state) => ({
          multipleOf3: {
            ...state.multipleOf3,
            enabled: !state.multipleOf3.enabled,
          },
        })),
      toggleComposite: () =>
        set((state) => ({
          composite: { ...state.composite, enabled: !state.composite.enabled },
        })),

      // 특별한 숫자 타입 액션
      setMultipleOf5Range: (range) =>
        set((state) => ({
          multipleOf5: { ...state.multipleOf5, value: range },
        })),
      setPerfectSquareRange: (range) =>
        set((state) => ({
          perfectSquare: { ...state.perfectSquare, value: range },
        })),
      setDoubleDigitRange: (range) =>
        set((state) => ({
          doubleDigit: { ...state.doubleDigit, value: range },
        })),
      setConsecutiveRange: (range) =>
        set((state) => ({
          consecutive: { ...state.consecutive, value: range },
        })),
      toggleMultipleOf5: () =>
        set((state) => ({
          multipleOf5: {
            ...state.multipleOf5,
            enabled: !state.multipleOf5.enabled,
          },
        })),
      togglePerfectSquare: () =>
        set((state) => ({
          perfectSquare: {
            ...state.perfectSquare,
            enabled: !state.perfectSquare.enabled,
          },
        })),
      toggleDoubleDigit: () =>
        set((state) => ({
          doubleDigit: {
            ...state.doubleDigit,
            enabled: !state.doubleDigit.enabled,
          },
        })),
      toggleConsecutive: () =>
        set((state) => ({
          consecutive: {
            ...state.consecutive,
            enabled: !state.consecutive.enabled,
          },
        })),

      // 필터 초기화 (균형적 전략 기반)
      resetFilters: () =>
        set({
          fixedNumbers: { value: [], enabled: false },
          excludeNumbers: { value: [], enabled: false },
          sumRange: { value: sumRangeFilter.balanced, enabled: true },
          oddEvenRatio: {
            value: oddEvenRatioFilter.balanced.ratios,
            enabled: true,
          },
          highLowRatio: {
            value: highLowRatioFilter.balanced.ratios,
            enabled: true,
          },
          frontSum: { value: frontSumFilter.balanced, enabled: true },
          backSum: { value: backSumFilter.balanced, enabled: true },
          firstDigitSum: { value: firstDigitSumFilter.balanced, enabled: true },
          lastDigitSum: { value: lastDigitSumFilter.balanced, enabled: true },
          acRange: { value: acValueFilter.balanced, enabled: true },
          prime: { value: primeFilter.balanced, enabled: true },
          multipleOf3: { value: multipleOf3Filter.balanced, enabled: true },
          composite: { value: compositeFilter.balanced, enabled: true },
          multipleOf5: { value: multipleOf5Filter.balanced, enabled: true },
          perfectSquare: { value: perfectSquareFilter.balanced, enabled: true },
          doubleDigit: { value: doubleDigitFilter.balanced, enabled: true },
          consecutive: { value: consecutiveFilter.balanced, enabled: true },
        }),
    }),
    {
      name: 'lotto-filter-storage-v3', // 비율 필터 배열 지원을 위한 버전 업그레이드
      version: 3, // 버전 명시
      migrate: (persistedState: unknown, version: number) => {
        // 이전 버전의 데이터를 새로운 구조로 마이그레이션
        if (version < 3) {
          const state = persistedState as Record<string, unknown>

          // 각 필터의 값이 숫자인 경우 {min, max} 구조로 변환
          const migrateNumericToRange = (
            value: unknown,
            defaultValue: number
          ) => {
            if (typeof value === 'number') {
              return { min: value, max: value }
            }
            if (
              typeof value === 'object' &&
              value &&
              typeof (value as Record<string, unknown>).min === 'number' &&
              typeof (value as Record<string, unknown>).max === 'number'
            ) {
              return value as { min: number; max: number }
            }
            return { min: defaultValue, max: defaultValue }
          }

          // 배열 형태의 sum 필터를 {min, max} 구조로 변환
          const migrateArrayToRange = (
            value: unknown,
            defaultMin: number,
            defaultMax: number
          ) => {
            if (Array.isArray(value) && value.length === 2) {
              return { min: value[0], max: value[1] }
            }
            if (
              typeof value === 'object' &&
              value &&
              typeof (value as Record<string, unknown>).min === 'number' &&
              typeof (value as Record<string, unknown>).max === 'number'
            ) {
              return value as { min: number; max: number }
            }
            return { min: defaultMin, max: defaultMax }
          }

          const getFilterValue = (filterName: string) => {
            const filter = state?.[filterName] as
              | Record<string, unknown>
              | undefined
            return filter?.value
          }

          const getFilterEnabled = (
            filterName: string,
            defaultEnabled: boolean
          ) => {
            const filter = state?.[filterName] as
              | Record<string, unknown>
              | undefined
            return typeof filter?.enabled === 'boolean'
              ? filter.enabled
              : defaultEnabled
          }

          return {
            ...defaultFilterState,
            // 기존에 설정된 값이 있으면 마이그레이션, 없으면 기본값 사용
            prime: {
              ...defaultFilterState.prime,
              value: migrateNumericToRange(getFilterValue('prime'), 2),
              enabled: getFilterEnabled(
                'prime',
                defaultFilterState.prime.enabled
              ),
            },
            multipleOf3: {
              ...defaultFilterState.multipleOf3,
              value: migrateNumericToRange(getFilterValue('multipleOf3'), 2),
              enabled: getFilterEnabled(
                'multipleOf3',
                defaultFilterState.multipleOf3.enabled
              ),
            },
            composite: {
              ...defaultFilterState.composite,
              value: migrateNumericToRange(getFilterValue('composite'), 4),
              enabled: getFilterEnabled(
                'composite',
                defaultFilterState.composite.enabled
              ),
            },
            multipleOf5: {
              ...defaultFilterState.multipleOf5,
              value: migrateNumericToRange(getFilterValue('multipleOf5'), 1),
              enabled: getFilterEnabled(
                'multipleOf5',
                defaultFilterState.multipleOf5.enabled
              ),
            },
            perfectSquare: {
              ...defaultFilterState.perfectSquare,
              value: migrateNumericToRange(getFilterValue('perfectSquare'), 0),
              enabled: getFilterEnabled(
                'perfectSquare',
                defaultFilterState.perfectSquare.enabled
              ),
            },
            doubleDigit: {
              ...defaultFilterState.doubleDigit,
              value: migrateNumericToRange(getFilterValue('doubleDigit'), 0),
              enabled: getFilterEnabled(
                'doubleDigit',
                defaultFilterState.doubleDigit.enabled
              ),
            },
            consecutive: {
              ...defaultFilterState.consecutive,
              value: migrateNumericToRange(getFilterValue('consecutive'), 1),
              enabled: getFilterEnabled(
                'consecutive',
                defaultFilterState.consecutive.enabled
              ),
            },
            // 다른 필터들은 기본값 또는 기존 값 유지
            fixedNumbers:
              (state?.fixedNumbers as FilterItem<number[]>) ??
              defaultFilterState.fixedNumbers,
            excludeNumbers:
              (state?.excludeNumbers as FilterItem<number[]>) ??
              defaultFilterState.excludeNumbers,
            sumRange:
              (state?.sumRange as FilterItem<{ min: number; max: number }>) ??
              defaultFilterState.sumRange,
            oddEvenRatio: {
              ...defaultFilterState.oddEvenRatio,
              value: Array.isArray(getFilterValue('oddEvenRatio'))
                ? (getFilterValue('oddEvenRatio') as {
                    odd: number
                    even: number
                  }[])
                : getFilterValue('oddEvenRatio')
                  ? [
                      getFilterValue('oddEvenRatio') as {
                        odd: number
                        even: number
                      },
                    ]
                  : defaultFilterState.oddEvenRatio.value,
              enabled: getFilterEnabled(
                'oddEvenRatio',
                defaultFilterState.oddEvenRatio.enabled
              ),
            },
            highLowRatio: {
              ...defaultFilterState.highLowRatio,
              value: Array.isArray(getFilterValue('highLowRatio'))
                ? (getFilterValue('highLowRatio') as {
                    low: number
                    high: number
                  }[])
                : getFilterValue('highLowRatio')
                  ? [
                      getFilterValue('highLowRatio') as {
                        low: number
                        high: number
                      },
                    ]
                  : defaultFilterState.highLowRatio.value,
              enabled: getFilterEnabled(
                'highLowRatio',
                defaultFilterState.highLowRatio.enabled
              ),
            },
            frontSum: {
              ...defaultFilterState.frontSum,
              value: migrateArrayToRange(getFilterValue('frontSum'), 28, 28),
              enabled: getFilterEnabled(
                'frontSum',
                defaultFilterState.frontSum.enabled
              ),
            },
            backSum: {
              ...defaultFilterState.backSum,
              value: migrateArrayToRange(getFilterValue('backSum'), 99, 99),
              enabled: getFilterEnabled(
                'backSum',
                defaultFilterState.backSum.enabled
              ),
            },
            firstDigitSum: {
              ...defaultFilterState.firstDigitSum,
              value: migrateArrayToRange(
                getFilterValue('firstDigitSum'),
                11,
                11
              ),
              enabled: getFilterEnabled(
                'firstDigitSum',
                defaultFilterState.firstDigitSum.enabled
              ),
            },
            lastDigitSum: {
              ...defaultFilterState.lastDigitSum,
              value: migrateArrayToRange(
                getFilterValue('lastDigitSum'),
                25,
                25
              ),
              enabled: getFilterEnabled(
                'lastDigitSum',
                defaultFilterState.lastDigitSum.enabled
              ),
            },
            acRange:
              (state?.acRange as FilterItem<{ min: number; max: number }>) ??
              defaultFilterState.acRange,
          }
        }
        return persistedState as FilterState & FilterActions
      },
    }
  )
)

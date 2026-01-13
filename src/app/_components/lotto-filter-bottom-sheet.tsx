'use client'
import { TbRefresh, TbX } from 'react-icons/tb'
import { Drawer } from 'vaul'

import { FilterSection } from '@/app/_components/lotto-filter-selector/filter-section'
import { Button } from '@/components/ui/button'
import { IconButton } from '@/components/ui/icon-button'
import { MAX_MOBILE_SCREEN_WIDTH } from '@/config/constants'
import { useFilterStore } from '@/store/filter-store'

import { LottoACValueSelector } from './lotto-filter-selector/lotto-ac-value-selector'
import { LottoBackSumSelector } from './lotto-filter-selector/lotto-back-sum-selector'
import { LottoCompositeSelector } from './lotto-filter-selector/lotto-composite-selector'
import { LottoConsecutiveSelector } from './lotto-filter-selector/lotto-consecutive-selector'
import { LottoDoubleDigitSelector } from './lotto-filter-selector/lotto-double-digit-selector'
import { LottoExcludeNumberSelector } from './lotto-filter-selector/lotto-exclude-number-selector'
import { LottoFirstDigitSumSelector } from './lotto-filter-selector/lotto-first-digit-sum-selector'
import { LottoFixedNumberSelector } from './lotto-filter-selector/lotto-fixed-number-selector'
import { LottoFrontSumSelector } from './lotto-filter-selector/lotto-front-sum-selector'
import { LottoHighLowRatioSelector } from './lotto-filter-selector/lotto-high-low-ratio-selector'
import { LottoLastDigitSumSelector } from './lotto-filter-selector/lotto-last-digit-sum-selector'
import { LottoMultipleOf3Selector } from './lotto-filter-selector/lotto-multiple-of-3-selector'
import { LottoMultipleOf5Selector } from './lotto-filter-selector/lotto-multiple-of-5-selector'
import { LottoOddEvenRatioSelector } from './lotto-filter-selector/lotto-odd-even-ratio-selector'
import { LottoPerfectSquareSelector } from './lotto-filter-selector/lotto-perfect-square-selector'
import { LottoPrimeSelector } from './lotto-filter-selector/lotto-prime-selector'
import { LottoSumRangeSelector } from './lotto-filter-selector/lotto-sum-range-selector'

type LottoFilterBottomSheetProps = {
  onClose: () => void
  open: boolean
}
export const LottoFilterBottomSheet = ({
  onClose,
  open,
}: LottoFilterBottomSheetProps) => {
  // zustand store에서 상태만 가져오기 (summary 표시용)
  const {
    fixedNumbers,
    excludeNumbers,
    sumRange,
    oddEvenRatio,
    highLowRatio,
    frontSum,
    backSum,
    firstDigitSum,
    lastDigitSum,
    acRange,
    prime,
    multipleOf3,
    composite,
    multipleOf5,
    perfectSquare,
    doubleDigit,
    consecutive,

    // 토글 액션 (FilterSection에서 사용)
    toggleFixedNumbers,
    toggleExcludeNumbers,
    toggleSumRange,
    toggleOddEvenRatio,
    toggleHighLowRatio,
    toggleFrontSum,
    toggleBackSum,
    toggleFirstDigitSum,
    toggleLastDigitSum,
    toggleACRange,
    togglePrime,
    toggleMultipleOf3,
    toggleComposite,
    toggleMultipleOf5,
    togglePerfectSquare,
    toggleDoubleDigit,
    toggleConsecutive,

    resetFilters,
  } = useFilterStore()

  return (
    <Drawer.Root handleOnly={true} open={open} onClose={onClose}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          draggable={false}
          className="fixed top-0 right-0 left-0 z-50 outline-none"
        >
          <div
            className="nb-shadow relative mx-auto overflow-x-hidden overflow-y-scroll rounded bg-white"
            style={{
              maxWidth: MAX_MOBILE_SCREEN_WIDTH - 16 * 2,
              width: `calc(100% - ${16 * 2}px)`,
              height: `calc(100vh - ${16 * 2}px)`,
              marginTop: 16,
            }}
          >
            <div className="sticky top-0 z-1 flex items-center justify-between bg-white p-4">
              <h4 className="font-semibold">필터 설정</h4>
              <IconButton onClick={onClose}>
                <TbX />
              </IconButton>
            </div>

            {/* 안내 메시지 */}
            <div className="px-4">
              <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-3">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 flex-shrink-0">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-400">
                      <span className="text-xs font-bold text-white">!</span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <p className="mb-1 font-medium text-amber-800">
                      전문가 설정 영역
                    </p>
                    <p className="leading-relaxed text-amber-700">
                      복잡한 필터 설정보다는 <strong>전략 기반 자동생성</strong>
                      을 추천드립니다. 균형적, 보수적, 공격적 전략 중 선택하시면
                      최적화된 번호를 쉽게 생성할 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mr-4 mb-4 flex justify-end">
              <Button
                inline
                size="sm"
                className="bg-secondary h-fit gap-1 px-2 py-1 text-sm text-white"
                onClick={resetFilters}
              >
                <TbRefresh size={20} />
                초기화
              </Button>
            </div>

            <div className="space-y-2 px-4 pb-4">
              {/* 고정수 선택 섹션 */}
              <FilterSection
                title="고정수 설정"
                enabled={fixedNumbers.enabled}
                onEnabledChange={toggleFixedNumbers}
                summary={
                  fixedNumbers.value.length > 0
                    ? `${fixedNumbers.value.join(', ')}`
                    : '고정 번호 없음'
                }
              >
                <LottoFixedNumberSelector />
              </FilterSection>

              {/* 제외수 선택 섹션 */}
              <FilterSection
                title="제외수 설정"
                enabled={excludeNumbers.enabled}
                onEnabledChange={toggleExcludeNumbers}
                summary={
                  excludeNumbers.value.length > 0
                    ? `${excludeNumbers.value.length}개 제외: ${excludeNumbers.value.slice(0, 5).join(', ')}${excludeNumbers.value.length > 5 ? '...' : ''}`
                    : '제외 번호 없음'
                }
              >
                <LottoExcludeNumberSelector />
              </FilterSection>

              {/* 총합 범위 선택 섹션 */}
              <FilterSection
                title="총합 범위"
                enabled={sumRange.enabled}
                onEnabledChange={toggleSumRange}
                summary={`${sumRange.value.min} ~ ${sumRange.value.max}`}
              >
                <LottoSumRangeSelector />
              </FilterSection>

              {/* 홀짝 비율 선택 섹션 */}
              <FilterSection
                title="홀짝 비율"
                enabled={oddEvenRatio.enabled}
                onEnabledChange={toggleOddEvenRatio}
                summary={`선택된 비율: ${oddEvenRatio.value.length}개`}
              >
                <LottoOddEvenRatioSelector />
              </FilterSection>

              {/* 고저 비율 선택 섹션 */}
              <FilterSection
                title="고저 비율"
                enabled={highLowRatio.enabled}
                onEnabledChange={toggleHighLowRatio}
                summary={`선택된 비율: ${highLowRatio.value.length}개`}
              >
                <LottoHighLowRatioSelector />
              </FilterSection>

              {/* AC값 필터 선택 섹션 */}
              <FilterSection
                title="AC값 필터"
                enabled={acRange.enabled}
                onEnabledChange={toggleACRange}
                summary={`AC ${acRange.value.min} ~ ${acRange.value.max}`}
              >
                <LottoACValueSelector />
              </FilterSection>

              {/* 소수 필터 선택 섹션 */}
              <FilterSection
                title="소수 필터"
                enabled={prime.enabled}
                onEnabledChange={togglePrime}
                summary={
                  typeof prime.value === 'object' && prime.value
                    ? prime.value.min === prime.value.max
                      ? `소수 ${prime.value.min}개`
                      : `소수 ${prime.value.min}-${prime.value.max}개`
                    : '소수 설정'
                }
              >
                <LottoPrimeSelector />
              </FilterSection>

              {/* 3배수 필터 선택 섹션 */}
              <FilterSection
                title="3배수 필터"
                enabled={multipleOf3.enabled}
                onEnabledChange={toggleMultipleOf3}
                summary={
                  typeof multipleOf3.value === 'object' && multipleOf3.value
                    ? multipleOf3.value.min === multipleOf3.value.max
                      ? `3배수 ${multipleOf3.value.min}개`
                      : `3배수 ${multipleOf3.value.min}-${multipleOf3.value.max}개`
                    : '3배수 설정'
                }
              >
                <LottoMultipleOf3Selector />
              </FilterSection>

              {/* 5배수 필터 선택 섹션 */}
              <FilterSection
                title="5배수 필터"
                enabled={multipleOf5.enabled}
                onEnabledChange={toggleMultipleOf5}
                summary={
                  typeof multipleOf5.value === 'object' && multipleOf5.value
                    ? multipleOf5.value.min === multipleOf5.value.max
                      ? `5배수 ${multipleOf5.value.min}개`
                      : `5배수 ${multipleOf5.value.min}-${multipleOf5.value.max}개`
                    : '5배수 설정'
                }
              >
                <LottoMultipleOf5Selector />
              </FilterSection>

              {/* 완전제곱수 필터 선택 섹션 */}
              <FilterSection
                title="완전제곱수 필터"
                enabled={perfectSquare.enabled}
                onEnabledChange={togglePerfectSquare}
                summary={
                  typeof perfectSquare.value === 'object' && perfectSquare.value
                    ? perfectSquare.value.min === perfectSquare.value.max
                      ? `완전제곱수 ${perfectSquare.value.min}개`
                      : `완전제곱수 ${perfectSquare.value.min}-${perfectSquare.value.max}개`
                    : '완전제곱수 설정'
                }
              >
                <LottoPerfectSquareSelector />
              </FilterSection>

              {/* 합성수 필터 선택 섹션 */}
              <FilterSection
                title="합성수 필터"
                enabled={composite.enabled}
                onEnabledChange={toggleComposite}
                summary={
                  typeof composite.value === 'object' && composite.value
                    ? composite.value.min === composite.value.max
                      ? `합성수 ${composite.value.min}개`
                      : `합성수 ${composite.value.min}-${composite.value.max}개`
                    : '합성수 설정'
                }
              >
                <LottoCompositeSelector />
              </FilterSection>

              {/* 두 자리수 필터 선택 섹션 */}
              <FilterSection
                title="두 자리수 필터"
                enabled={doubleDigit.enabled}
                onEnabledChange={toggleDoubleDigit}
                summary={
                  typeof doubleDigit.value === 'object' && doubleDigit.value
                    ? doubleDigit.value.min === doubleDigit.value.max
                      ? `두 자리수 ${doubleDigit.value.min}개`
                      : `두 자리수 ${doubleDigit.value.min}-${doubleDigit.value.max}개`
                    : '두 자리수 설정'
                }
              >
                <LottoDoubleDigitSelector />
              </FilterSection>

              {/* 연속수 필터 선택 섹션 */}
              <FilterSection
                title="연속수 필터"
                enabled={consecutive.enabled}
                onEnabledChange={toggleConsecutive}
                summary={
                  typeof consecutive.value === 'object' && consecutive.value
                    ? consecutive.value.min === consecutive.value.max
                      ? `연속수 ${consecutive.value.min}개`
                      : `연속수 ${consecutive.value.min}-${consecutive.value.max}개`
                    : '연속수 설정'
                }
              >
                <LottoConsecutiveSelector />
              </FilterSection>

              {/* 앞수합 필터 선택 섹션 */}
              <FilterSection
                title="앞수합 필터"
                enabled={frontSum.enabled}
                onEnabledChange={toggleFrontSum}
                summary={`앞수합 ${frontSum.value.min} ~ ${frontSum.value.max}`}
              >
                <LottoFrontSumSelector />
              </FilterSection>

              {/* 뒷수합 필터 선택 섹션 */}
              <FilterSection
                title="뒷수합 필터"
                enabled={backSum.enabled}
                onEnabledChange={toggleBackSum}
                summary={`뒷수합 ${backSum.value.min} ~ ${backSum.value.max}`}
              >
                <LottoBackSumSelector />
              </FilterSection>

              {/* 첫수합 필터 선택 섹션 */}
              <FilterSection
                title="첫수합 필터"
                enabled={firstDigitSum.enabled}
                onEnabledChange={toggleFirstDigitSum}
                summary={`첫수합 ${firstDigitSum.value.min} ~ ${firstDigitSum.value.max}`}
              >
                <LottoFirstDigitSumSelector />
              </FilterSection>

              {/* 끝수합 필터 선택 섹션 */}
              <FilterSection
                title="끝수합 필터"
                enabled={lastDigitSum.enabled}
                onEnabledChange={toggleLastDigitSum}
                summary={`끝수합 ${lastDigitSum.value.min} ~ ${lastDigitSum.value.max}`}
              >
                <LottoLastDigitSumSelector />
              </FilterSection>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

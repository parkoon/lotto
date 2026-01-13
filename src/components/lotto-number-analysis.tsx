'use client'

import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { analyzeLottoNumbers, formatAnalysisResult } from '@/lib/lotto-analyzer'

interface LottoNumberAnalysisProps {
  numbers: number[]
  compact?: boolean
}

/**
 * 로또 번호 분석 결과 표시 컴포넌트
 */
export const LottoNumberAnalysis = ({
  numbers,
  compact = false,
}: LottoNumberAnalysisProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const analysis = analyzeLottoNumbers(numbers)
  const summary = formatAnalysisResult(analysis)

  if (compact) {
    return (
      <div className="mt-2 flex flex-wrap gap-1">
        {summary.slice(0, 4).map((item, index) => (
          <Badge
            key={index}
            variant="outline"
            className="bg-neutral-50 text-xs text-neutral-600"
          >
            {item}
          </Badge>
        ))}
      </div>
    )
  }

  return (
    <div className="mt-3 space-y-2">
      <h4 className="text-sm font-medium text-neutral-700">번호 분석</h4>

      {/* 기본 정보 - 총합, AC값 */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-500">총합</span>
            <span className="font-medium">{analysis.sum}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-500">AC값</span>
            <span className="font-medium">{analysis.acValue}</span>
          </div>
        </div>
        <Button
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-6 border-none bg-transparent px-2 text-xs font-normal text-neutral-500 shadow-none hover:text-neutral-700"
        >
          {isExpanded ? '접기' : '더보기'}
        </Button>
      </div>

      {/* 확장된 상세 정보 */}
      {isExpanded && (
        <div className="space-y-2">
          {/* 주요 정보 */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-500">홀짝비율</span>
              <span className="font-medium">
                {analysis.oddEvenRatio.odd}:{analysis.oddEvenRatio.even}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">고저비율</span>
              <span className="font-medium">
                {analysis.highLowRatio.low}:{analysis.highLowRatio.high}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">앞수합</span>
              <span className="font-medium">{analysis.frontSum}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">뒤수합</span>
              <span className="font-medium">{analysis.backSum}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">첫수합</span>
              <span className="font-medium">{analysis.firstDigitSum}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">끝수합</span>
              <span className="font-medium">{analysis.lastDigitSum}</span>
            </div>
          </div>

          {/* 세부 정보 */}
          <div className="border-t border-neutral-100 pt-2">
            <div className="flex flex-wrap gap-1">
              <Badge variant="secondary" className="text-xs">
                소수: {analysis.primeCount}개
              </Badge>
              <Badge variant="secondary" className="text-xs">
                연속번호: {analysis.consecutiveCount}개
              </Badge>
              {analysis.multipleOf3Count > 0 && (
                <Badge variant="secondary" className="text-xs">
                  3배수: {analysis.multipleOf3Count}개
                </Badge>
              )}
              {analysis.multipleOf5Count > 0 && (
                <Badge variant="secondary" className="text-xs">
                  5배수: {analysis.multipleOf5Count}개
                </Badge>
              )}
              {analysis.compositeCount > 0 && (
                <Badge variant="secondary" className="text-xs">
                  합성수: {analysis.compositeCount}개
                </Badge>
              )}
              {analysis.perfectSquareCount > 0 && (
                <Badge variant="secondary" className="text-xs">
                  완전제곱수: {analysis.perfectSquareCount}개
                </Badge>
              )}
              {analysis.doubleDigitCount > 0 && (
                <Badge variant="secondary" className="text-xs">
                  쌍수: {analysis.doubleDigitCount}개
                </Badge>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * 간단한 요약 분석 컴포넌트
 */
export const LottoNumberSummary = ({ numbers }: { numbers: number[] }) => {
  return <LottoNumberAnalysis numbers={numbers} compact />
}

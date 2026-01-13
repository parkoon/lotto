#!/usr/bin/env tsx

import { writeFile } from 'fs/promises'
import { resolve } from 'path'

import lottoData from '../../../src/data/lotto.json'

// 로또 데이터 타입 정의
export interface LottoGame {
  round: number
  numbers: number[]
  bonusNumber?: number
  date: string
}

export const lotto: LottoGame[] = lottoData as LottoGame[]

// 필터 결과 타입 정의
export interface FilterResult {
  conservative: {
    min: number
    max: number
    description: string
  }
  balanced: {
    min: number
    max: number
    description: string
  }
  aggressive: {
    min: number
    max: number
    description: string
  }
  ai: {
    min: number
    max: number
    description: string
  }
}

export interface RatioFilterResult {
  conservative: {
    ratios: Array<{ odd?: number; even?: number; low?: number; high?: number }>
    description: string
  }
  balanced: {
    ratios: Array<{ odd?: number; even?: number; low?: number; high?: number }>
    description: string
  }
  aggressive: {
    ratios: Array<{ odd?: number; even?: number; low?: number; high?: number }>
    description: string
  }
  ai: {
    ratios: Array<{ odd?: number; even?: number; low?: number; high?: number }>
    description: string
  }
}

export interface RatioStats {
  topRatios: Array<{
    odd?: number
    even?: number
    low?: number
    high?: number
    count: number
    percentage: string
  }>
}

/**
 * 전체 데이터 기반 통계 계산 함수
 *
 * 네 가지 전략 제공:
 * - Conservative: 25%-75% 분위수 (IQR, 중간 50% 범위) - 안정적
 * - Balanced: 10%-90% 분위수 (80% 범위) - 균형잡힌
 * - Aggressive: 평균±1표준편차 (68% 신뢰구간) - 공격적
 * - AI: 25%-75% 분위수 범위 (패턴 기반)
 */
export function calculateStats(values: number[]): FilterResult {
  const sorted = [...values].sort((a, b) => a - b)
  const length = sorted.length

  // 통계 지표 계산
  const mean = values.reduce((sum, val) => sum + val, 0) / length
  const q1 = sorted[Math.floor(length * 0.25)] // 1분위수 (25%)
  const q3 = sorted[Math.floor(length * 0.75)] // 3분위수 (75%)
  const p10 = sorted[Math.floor(length * 0.1)] // 10 퍼센타일
  const p90 = sorted[Math.floor(length * 0.9)] // 90 퍼센타일
  const std = Math.sqrt(
    values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / length
  )

  // AI 전략: 분위수 범위로 안정적인 패턴 제공 (단일값 방지)
  const aiMin = Math.max(0, q1)
  const aiMax = q3

  return {
    conservative: {
      min: q1,
      max: q3,
      description: `25%-75% 분위수 (중간 50% 범위)`,
    },
    balanced: {
      min: p10,
      max: p90,
      description: `10%-90% 분위수 (넓은 80% 범위)`,
    },
    aggressive: {
      min: Math.max(0, Math.round(mean - std)),
      max: Math.round(mean + std),
      description: `평균±1표준편차 (68% 신뢰구간)`,
    },
    ai: {
      min: aiMin,
      max: aiMax,
      description: `패턴 기반 (${aiMin}-${aiMax} 범위, 전체 데이터 분석)`,
    },
  }
}

/**
 * 최근 30회 패턴 기반 통계 계산 함수
 *
 * AI 추천에서 사용하는 핵심 함수로, 최신 트렌드를 반영합니다.
 * 전체 데이터 대신 최근 30회 데이터만 사용하여 현재 패턴을 분석합니다.
 *
 * @param values 전체 데이터 배열 (최근 30개만 사용됨)
 * @returns 최근 30회 기반 필터 결과
 */
export function calculateStatsRecent30(values: number[]): FilterResult {
  // 최근 30회 데이터만 추출 (트렌드 분석용)
  const recent30 = values.slice(-30)
  const sorted = [...recent30].sort((a, b) => a - b)
  const length = sorted.length

  // 최근 데이터 기반 통계 지표 계산
  const mean = recent30.reduce((sum, val) => sum + val, 0) / length
  const q1 = sorted[Math.floor(length * 0.25)] // 최근 30회 1분위수
  const q3 = sorted[Math.floor(length * 0.75)] // 최근 30회 3분위수
  const p10 = sorted[Math.floor(length * 0.1)] // 최근 30회 10 퍼센타일
  const p90 = sorted[Math.floor(length * 0.9)] // 최근 30회 90 퍼센타일
  const std = Math.sqrt(
    recent30.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / length
  )

  // AI 전략: 최근 트렌드 반영한 25%-75% 분위수 범위
  const aiMin = Math.max(0, q1)
  const aiMax = q3

  return {
    conservative: {
      min: q1,
      max: q3,
      description: `25%-75% 분위수 (중간 50% 범위)`,
    },
    balanced: {
      min: p10,
      max: p90,
      description: `10%-90% 분위수 (넓은 80% 범위)`,
    },
    aggressive: {
      min: Math.max(0, Math.round(mean - std)),
      max: Math.round(mean + std),
      description: `평균±1표준편차 (68% 신뢰구간)`,
    },
    ai: {
      min: aiMin,
      max: aiMax,
      description: `최근 30회 패턴 기반 (${aiMin}-${aiMax} 범위, 최근 트렌드 반영)`,
    },
  }
}

/**
 * 전체 데이터 기반 비율 통계 계산 함수
 *
 * 홀짝비율(odd:even) 또는 고저비율(low:high)의 출현 빈도를 분석합니다.
 *
 * @param ratios 홀짝비율 또는 고저비율 배열
 * @returns 빈도순으로 정렬된 비율 통계
 */
export function calculateRatioStats(
  ratios: { low: number; high: number }[] | { odd: number; even: number }[]
): RatioStats {
  const ratioMap: Record<string, number> = {}

  // 각 비율의 출현 횟수 계산
  ratios.forEach((ratio) => {
    let key: string
    if ('odd' in ratio) {
      key = `${ratio.odd}:${ratio.even}` // 홀짝비율 키 생성
    } else {
      key = `${ratio.low}:${ratio.high}` // 고저비율 키 생성
    }
    ratioMap[key] = (ratioMap[key] || 0) + 1
  })

  // 빈도순으로 정렬하여 상위 비율들 반환
  const topRatios = Object.entries(ratioMap)
    .map(([key, count]) => {
      const [first, second] = key.split(':').map(Number)
      const percentage = ((count / ratios.length) * 100).toFixed(2)

      if ('odd' in ratios[0]) {
        return { odd: first, even: second, count, percentage }
      } else {
        return { low: first, high: second, count, percentage }
      }
    })
    .sort((a, b) => b.count - a.count) // 출현 빈도 내림차순 정렬

  return { topRatios }
}

/**
 * 최근 30회 비율 통계 계산 함수
 *
 * AI 추천용으로 최근 30회 데이터만을 분석하여 현재 트렌드를 반영합니다.
 *
 * @param ratios 전체 홀짝비율 또는 고저비율 배열
 * @returns 최근 30회 기반 빈도순 비율 통계
 */
export function calculateRatioStatsRecent30(
  ratios: { low: number; high: number }[] | { odd: number; even: number }[]
): RatioStats {
  // 최근 30회 데이터만 추출
  const recent30 = ratios.slice(-30)
  const ratioMap: Record<string, number> = {}

  recent30.forEach((ratio) => {
    let key: string
    if ('odd' in ratio) {
      key = `${ratio.odd}:${ratio.even}`
    } else {
      key = `${ratio.low}:${ratio.high}`
    }
    ratioMap[key] = (ratioMap[key] || 0) + 1
  })

  const topRatios = Object.entries(ratioMap)
    .map(([key, count]) => {
      const [first, second] = key.split(':').map(Number)
      const percentage = ((count / recent30.length) * 100).toFixed(2)

      if ('odd' in recent30[0]) {
        return { odd: first, even: second, count, percentage }
      } else {
        return { low: first, high: second, count, percentage }
      }
    })
    .sort((a, b) => b.count - a.count)

  return { topRatios }
}

/**
 * 필터 파일 저장 유틸리티 함수
 *
 * 계산된 필터 통계를 JSON 파일로 저장합니다.
 * 파일은 src/data/lotto/filter/ 디렉토리에 저장되며,
 * 프론트엔드에서 import하여 사용됩니다.
 *
 * @param name 필터 파일명 (확장자 제외)
 * @param data 필터 통계 데이터 (범위형 또는 비율형)
 * @param description 필터 설명
 */
export async function saveFilter(
  name: string,
  data: FilterResult | RatioFilterResult,
  description: string
): Promise<void> {
  const filterData = {
    description,
    ...data,
  }

  // 프로젝트 루트 기준 필터 데이터 경로
  const filePath = resolve(
    __dirname,
    '../../../src/data/lotto/filter',
    `${name}.json`
  )

  await writeFile(filePath, JSON.stringify(filterData, null, 2))
  console.log(`✅ ${name}.json 생성 완료`)
}

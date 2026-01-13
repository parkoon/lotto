import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: '전략 기반 자동생성 - AI 로또 번호 생성',
  description:
    '균형적, 보수적, 공격적, AI 전략 중 선택하여 최적화된 로또 번호를 자동 생성합니다. 각 전략별 특징을 분석하여 맞춤형 번호 조합을 제공합니다.',
  keywords: [
    '로또번호생성',
    '로또전략',
    'AI로또',
    '균형적전략',
    '보수적전략',
    '공격적전략',
    '로또자동생성',
  ],
  openGraph: {
    title: '전략 기반 자동생성 - AI 로또 번호 생성',
    description:
      '균형적, 보수적, 공격적, AI 전략으로 최적화된 로또 번호를 자동 생성하세요.',
  },
}

export default function StrategyLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

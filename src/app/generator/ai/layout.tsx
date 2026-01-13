import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'AI 자동 로또 번호 생성 | 로또 번호 생성기',
  description:
    'AI가 과거 당첨 패턴을 분석하여 최적의 로또 번호를 자동 생성합니다. 인기번호, 홀짝균형, 페어조합 등을 고려한 번호 추천',
  keywords: [
    '로또 AI 생성',
    '로또 자동 생성',
    '로또 번호 추천',
    'AI 로또 분석',
    '로또 패턴 분석',
    '로또 번호 생성기',
    '로또 당첨 번호',
    '로또 통계 분석',
    '로또 번호 생성',
    '로또 자동 추천',
    '로또 AI 추천',
    '로또 번호 분석',
    '로또 당첨 패턴',
    '로또 통계 기반 생성',
  ],
  openGraph: {
    title: 'AI 자동 로또 번호 생성기',
    description:
      'AI가 과거 당첨 패턴을 분석하여 최적의 로또 번호를 자동 생성합니다.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI 로또 번호 자동 생성기',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI 자동 로또 번호 생성기',
    description:
      'AI가 과거 당첨 패턴을 분석하여 최적의 로또 번호를 자동 생성합니다.',
    images: ['/images/og-image.png'],
  },
}

export default function AutoLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'AI 자동 로또 번호 생성기',
            description:
              'AI가 과거 당첨 패턴을 분석하여 최적의 로또 번호를 자동 생성합니다.',
            url: 'https://lottolab.vip/generator/ai',
            applicationCategory: 'UtilityApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'KRW',
            },
            featureList: [
              'AI 분석 기반 번호 생성',
              '과거 당첨 패턴 분석',
              '인기번호 고려',
              '홀짝 균형 최적화',
              '페어 조합 분석',
            ],
          }),
        }}
      />
      {children}
    </>
  )
}

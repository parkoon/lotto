import { Metadata } from 'next'
import { Suspense } from 'react'

import { createWebApplicationData } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: '내 로또 번호 당첨 확인 - 과거 당첨 이력 조회',
  description:
    '내가 선택한 로또 번호가 과거에 몇 번 당첨되었는지 확인해보세요. 1등부터 5등까지 모든 당첨 이력을 한눈에 볼 수 있습니다. 로또 번호 분석과 당첨 확률 계산을 무료로 제공합니다.',
  keywords: [
    '로또',
    '당첨확인',
    '번호조회',
    '당첨이력',
    '로또분석',
    '당첨확률',
  ],
  openGraph: {
    title: '내 로또 번호 당첨 확인 - 과거 당첨 이력 조회',
    description:
      '내가 선택한 로또 번호가 과거에 몇 번 당첨되었는지 확인해보세요. 1등부터 5등까지 모든 당첨 이력을 한눈에 볼 수 있습니다.',
    url: '/stats/my-history',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: '로또 번호 당첨 확인 도구',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '내 로또 번호 당첨 확인 - 과거 당첨 이력 조회',
    description:
      '내가 선택한 로또 번호가 과거에 몇 번 당첨되었는지 확인해보세요.',
    images: ['/images/og-image.png'],
  },
  alternates: {
    canonical: '/stats/my-history',
  },
}

export default function LottoMyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* 🏗️ 구조화된 데이터 - 검색 엔진 최적화 */}
      {createWebApplicationData({
        name: '로또 번호 당첨 확인',
        description:
          '내가 선택한 로또 번호가 과거에 몇 번 당첨되었는지 확인할 수 있는 도구입니다.',
        url: 'https://lottolab.vip/stats/my-history',
        featureList: [
          '로또 번호 당첨 이력 조회',
          '등수별 당첨 횟수 통계',
          '자동 번호 생성',
          '당첨 확률 분석',
        ],
      })}

      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </>
  )
}

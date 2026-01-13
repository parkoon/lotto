import { Metadata } from 'next'

import { createWebApplicationData } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: '최신 로또 엑셀 다운로드',
  description:
    '로또 1회부터 최신 회차까지 모든 당첨번호를 엑셀로 다운로드하세요. 홀짝 비율, 번호 순위, 핫수/콜드수, AC값 분석 등 다양한 통계 데이터를 엑셀 파일로 제공합니다.',
  keywords: [
    '로또엑셀',
    '로또데이터',
    '로또당첨번호',
    '엑셀다운로드',
    '로또분석',
    '로또통계',
    '로또엑셀파일',
    '로또번호분석',
    '로또당첨정보',
    '로또데이터베이스',
    '홀짝비율',
    '핫수콜드수',
    'AC값분석',
  ],
  openGraph: {
    title: '최신 로또 엑셀 다운로드',
    description:
      '로또 1회부터 최신 회차까지 모든 당첨번호를 엑셀로 다운로드하세요. 홀짝 비율, 번호 순위, 핫수/콜드수 등 다양한 분석 데이터 제공.',
    url: '/excel/history',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: '로또 엑셀 다운로드 서비스',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '최신 로또 엑셀 다운로드 - 완벽한 당첨번호 데이터',
    description:
      '로또 1회부터 최신 회차까지 모든 당첨번호를 엑셀로 다운로드하세요.',
    images: ['/images/og-image.png'],
  },
  alternates: {
    canonical: '/excel/history',
  },
}

export default function LottoExcelHistoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* 🏗️ 구조화된 데이터 - 검색 엔진 최적화 */}
      {createWebApplicationData({
        name: '로또 엑셀 다운로드',
        description:
          '로또 1회부터 최신 회차까지 모든 당첨번호와 분석 데이터를 엑셀 파일로 다운로드할 수 있는 서비스입니다.',
        url: 'https://lottolab.vip/excel/history',
        featureList: [
          '전체 로또 당첨번호 엑셀 다운로드',
          '홀짝 비율 분석 엑셀',
          '번호 순위 통계 엑셀',
          '핫수/콜드수 분석 엑셀',
          'AC값 분석 엑셀',
          '날짜별 데이터 정리',
        ],
      })}

      <>{children}</>
    </>
  )
}

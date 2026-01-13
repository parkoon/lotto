import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  // 🏷️ 메인 페이지 타이틀 (브랜드 인지도 중심)
  title: '로또랩 홈 - 당첨 번호 확인 및 분석',
  // 📝 메인 페이지 설명 (전체 서비스 소개)
  description:
    '최신 로또 당첨 번호 확인, 내 번호 당첨 여부 확인, AI 기반 번호 생성, 전략별 번호 추천 등 종합 로또 서비스를 무료로 제공합니다.',
  // 📱 소셜 미디어 공유 설정
  openGraph: {
    title: '로또랩 - 당첨 번호 확인 및 번호 생성 서비스',
    description:
      '최신 로또 당첨 번호 확인, AI 기반 번호 생성, 전략별 번호 추천, 통계 분석 등 종합 로또 서비스를 무료로 제공합니다.',
    url: '/',
    type: 'website',
  },
  // 🔗 표준 URL 설정
  alternates: {
    canonical: '/',
  },
}

export default function HomeLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

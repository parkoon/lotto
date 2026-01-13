import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: '필터 기반 자동생성 - 맞춤형 로또 번호 생성',
  description:
    '홀짝비율, 총합범위, AC값 등 세부 필터를 직접 설정하여 맞춤형 로또 번호를 생성합니다. 전문가 수준의 조건 설정으로 원하는 패턴의 번호를 만들어보세요.',
  keywords: [
    '로또필터',
    '로또번호맞춤생성',
    '홀짝비율',
    'AC값',
    '로또조건설정',
    '전문가로또',
  ],
  openGraph: {
    title: '필터 기반 자동생성 - 맞춤형 로또 번호 생성',
    description:
      '세부 필터 조건을 설정하여 나만의 맞춤형 로또 번호를 생성하세요.',
  },
}

export default function CustomLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

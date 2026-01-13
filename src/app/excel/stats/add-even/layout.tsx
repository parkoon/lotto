import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '홀짝 비율 엑셀 다운로드 - 로또 번호 균형 분석',
  description:
    '로또 홀짝 비율 통계를 엑셀로 다운로드하세요. 홀수와 짝수 번호의 비율 분석 데이터를 제공합니다. 균형잡힌 번호 조합 선택에 활용하세요.',
  keywords: [
    '로또 엑셀 다운로드',
    '홀짝 비율 엑셀',
    '로또 홀짝',
    '홀수 짝수 비율',
    '번호 균형 분석',
    'Odd Even Ratio',
    '로또 홀짝 통계',
    '번호 균형',
    '홀짝 패턴',
    '로또 통계 분석',
    '번호 조합 균형',
  ],
  openGraph: {
    title: '홀짝 비율 엑셀 다운로드 - 로또랩',
    description:
      '로또 홀짝 비율 통계를 엑셀로 다운로드하세요. 번호 균형 분석 데이터를 제공합니다.',
    type: 'website',
    url: '/excel/stats/add-even',
    siteName: '로또랩',
  },
  twitter: {
    card: 'summary_large_image',
    title: '홀짝 비율 엑셀 다운로드 - 로또랩',
    description: '로또 홀짝 비율 통계를 엑셀로 다운로드하세요.',
  },
  alternates: {
    canonical: '/excel/stats/add-even',
  },
}

export default function OddEvenExcelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* JSON-LD 구조화된 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: '홀짝 비율 엑셀 다운로드',
            description:
              '로또 홀짝 비율 통계를 엑셀로 다운로드할 수 있는 페이지입니다.',
            url: 'https://lottolab.vip/excel/stats/add-even',
            mainEntity: {
              '@type': 'DataDownload',
              name: '로또 홀짝 비율 통계 데이터',
              description: '홀수와 짝수 번호의 비율 분석 통계 데이터',
              encodingFormat: 'application/vnd.ms-excel',
              about: {
                '@type': 'Thing',
                name: '홀짝 비율',
                description:
                  '로또 번호에서 홀수와 짝수의 비율을 나타내는 통계 지표',
              },
            },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: '홈',
                  item: 'https://lottolab.vip/',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: '로또',
                  item: 'https://lottolab.vip//lotto',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: '통계 엑셀',
                  item: 'https://lottolab.vip//lotto/excel/stats',
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  name: '홀짝 비율 엑셀',
                  item: 'https://lottolab.vip//lotto/excel/stats/add-even',
                },
              ],
            },
          }),
        }}
      />
      {children}
    </>
  )
}

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '당첨 순위 엑셀 다운로드 - 로또 번호 순위 분석',
  description:
    '로또 당첨 순위 통계를 엑셀로 다운로드하세요. 1~45번 각 번호의 당첨 횟수와 순위 데이터를 제공합니다. 인기 번호 분석과 번호 선택에 활용하세요.',
  keywords: [
    '로또 엑셀 다운로드',
    '당첨 순위 엑셀',
    '로또 순위',
    '번호 순위',
    '당첨 횟수',
    'Number Ranking',
    '로또 번호 순위',
    '인기 번호',
    '번호 빈도',
    '로또 통계 분석',
    '번호별 당첨 횟수',
  ],
  openGraph: {
    title: '당첨 순위 엑셀 다운로드 - 로또랩',
    description:
      '로또 당첨 순위 통계를 엑셀로 다운로드하세요. 번호별 당첨 횟수와 순위 데이터를 제공합니다.',
    type: 'website',
    url: '/excel/stats/number-rank',
    siteName: '로또랩',
  },
  twitter: {
    card: 'summary_large_image',
    title: '당첨 순위 엑셀 다운로드 - 로또랩',
    description: '로또 당첨 순위 통계를 엑셀로 다운로드하세요.',
  },
  alternates: {
    canonical: '/excel/stats/number-rank',
  },
}

export default function NumberRankExcelLayout({
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
            name: '당첨 순위 엑셀 다운로드',
            description:
              '로또 당첨 순위 통계를 엑셀로 다운로드할 수 있는 페이지입니다.',
            url: 'https://lottolab.vip/excel/stats/number-rank',
            mainEntity: {
              '@type': 'DataDownload',
              name: '로또 당첨 순위 통계 데이터',
              description: '1~45번 각 번호의 당첨 횟수와 순위 통계 데이터',
              encodingFormat: 'application/vnd.ms-excel',
              about: {
                '@type': 'Thing',
                name: '당첨 순위',
                description:
                  '로또 번호별 당첨 횟수와 순위를 나타내는 통계 지표',
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
                  name: '당첨 순위 엑셀',
                  item: 'https://lottolab.vip//lotto/excel/stats/number-rank',
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

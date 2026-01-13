import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AC값 엑셀 다운로드 - 로또 통계 분석',
  description:
    '로또 AC값(복잡도) 통계를 엑셀로 다운로드하세요. 1회부터 최신 회차까지의 AC값 데이터와 분석 자료를 제공합니다. 로또 번호 조합의 복잡성 분석에 활용하세요.',
  keywords: [
    '로또 엑셀 다운로드',
    'AC값 엑셀',
    '로또 AC값',
    'AC값 다운로드',
    '로또 복잡도',
    'Arithmetic Complexity',
    '로또 AC값 통계',
    '번호 복잡도 분석',
    '로또 데이터 분석',
    'AC값 패턴',
    '로또 통계 엑셀',
  ],
  openGraph: {
    title: 'AC값 엑셀 다운로드 - 로또랩',
    description:
      '로또 AC값(복잡도) 통계를 엑셀로 다운로드하세요. 번호 조합의 복잡성 분석 데이터를 제공합니다.',
    type: 'website',
    url: '/excel/stats/ac',
    siteName: '로또랩',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AC값 엑셀 다운로드 - 로또랩',
    description: '로또 AC값(복잡도) 통계를 엑셀로 다운로드하세요.',
  },
  alternates: {
    canonical: '/excel/stats/ac',
  },
}

export default function AcExcelLayout({
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
            name: 'AC값 엑셀 다운로드',
            description:
              '로또 AC값(복잡도) 통계를 엑셀로 다운로드할 수 있는 페이지입니다.',
            url: 'https://lottolab.vip/excel/stats/ac',
            mainEntity: {
              '@type': 'DataDownload',
              name: '로또 AC값 통계 데이터',
              description:
                '1회부터 최신 회차까지의 로또 AC값(복잡도) 통계 데이터',
              encodingFormat: 'application/vnd.ms-excel',
              about: {
                '@type': 'Thing',
                name: 'AC값',
                description:
                  'Arithmetic Complexity - 로또 번호 조합의 복잡성을 나타내는 통계 지표',
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
                  name: '엑셀 다운로드',
                  item: 'https://lottolab.vip/excel',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: '통계 엑셀',
                  item: 'https://lottolab.vip/excel/stats',
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  name: 'AC값 엑셀',
                  item: 'https://lottolab.vip/excel/stats/ac',
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

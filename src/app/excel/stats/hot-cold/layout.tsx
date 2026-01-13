import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '핫수/콜드수 엑셀 다운로드 - 로또 번호 빈도 분석',
  description:
    '로또 핫수/콜드수 통계를 엑셀로 다운로드하세요. 최근 자주 나온 번호(핫수)와 잘 안 나온 번호(콜드수) 데이터를 제공합니다. 번호 선택 전략 수립에 활용하세요.',
  keywords: [
    '로또 엑셀 다운로드',
    '핫수 콜드수 엑셀',
    '로또 핫수',
    '로또 콜드수',
    '번호 빈도 분석',
    'Hot Cold Numbers',
    '로또 번호 빈도',
    '자주 나온 번호',
    '안 나온 번호',
    '로또 통계 분석',
    '번호 출현 빈도',
  ],
  openGraph: {
    title: '핫수/콜드수 엑셀 다운로드 - 로또랩',
    description:
      '로또 핫수/콜드수 통계를 엑셀로 다운로드하세요. 번호 빈도 분석 데이터를 제공합니다.',
    type: 'website',
    url: '/excel/stats/hot-cold',
    siteName: '로또랩',
  },
  twitter: {
    card: 'summary_large_image',
    title: '핫수/콜드수 엑셀 다운로드 - 로또랩',
    description: '로또 핫수/콜드수 통계를 엑셀로 다운로드하세요.',
  },
  alternates: {
    canonical: '/excel/stats/hot-cold',
  },
}

export default function HotColdExcelLayout({
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
            name: '핫수/콜드수 엑셀 다운로드',
            description:
              '로또 핫수/콜드수 통계를 엑셀로 다운로드할 수 있는 페이지입니다.',
            url: 'https://lottolab.vip/excel/stats/hot-cold',
            mainEntity: {
              '@type': 'DataDownload',
              name: '로또 핫수/콜드수 통계 데이터',
              description:
                '최근 자주 나온 번호(핫수)와 잘 안 나온 번호(콜드수) 통계 데이터',
              encodingFormat: 'application/vnd.ms-excel',
              about: [
                {
                  '@type': 'Thing',
                  name: '핫수',
                  description: '최근 자주 나온 로또 번호들 (Hot Numbers)',
                },
                {
                  '@type': 'Thing',
                  name: '콜드수',
                  description: '최근 잘 안 나온 로또 번호들 (Cold Numbers)',
                },
              ],
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
                  name: '핫수/콜드수 엑셀',
                  item: 'https://lottolab.vip/excel/stats/hot-cold',
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

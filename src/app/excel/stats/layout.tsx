import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: '로또 통계 엑셀 다운로드 - 로또랩',
    template: '%s | 로또랩',
  },
  description:
    '로또 번호 통계를 엑셀로 다운로드하세요. AC값, 당첨순위, 핫수/콜드수, 홀짝비율 등 다양한 통계 데이터를 엑셀 파일로 제공합니다.',
  keywords: [
    '로또 엑셀 다운로드',
    '로또 통계 엑셀',
    '로또 데이터 다운로드',
    'AC값 엑셀',
    '당첨순위 엑셀',
    '핫수 콜드수 엑셀',
    '홀짝비율 엑셀',
    '로또 분석 도구',
    '로또 통계 분석',
    '로또 엑셀 다운로드',
    '로또 데이터 분석',
  ],
  authors: [{ name: '로또랩' }],
  creator: '로또랩',
  publisher: '로또랩',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: '로또 통계 엑셀 다운로드 - 로또랩',
    description:
      '로또 번호 통계를 엑셀로 다운로드하세요. AC값, 당첨순위, 핫수/콜드수, 홀짝비율 등 다양한 통계 데이터를 제공합니다.',
    type: 'website',
    locale: 'ko_KR',
    siteName: '로또랩',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: '로또 통계 엑셀 다운로드 - 로또랩',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '로또 통계 엑셀 다운로드 - 로또랩',
    description:
      '로또 번호 통계를 엑셀로 다운로드하세요. 다양한 통계 데이터를 엑셀 파일로 제공합니다.',
    images: ['/images/og-image.png'],
  },
}

export default function LottoExcelStatsLayout({
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
            name: '로또 통계 엑셀 다운로드',
            description:
              '로또 번호 통계를 엑셀로 다운로드할 수 있는 페이지입니다.',
            url: 'https://lottolab.vip/excel/stats',
            mainEntity: {
              '@type': 'DataDownload',
              name: '로또 통계 데이터',
              description:
                'AC값, 당첨순위, 핫수/콜드수, 홀짝비율 등 로또 통계 데이터',
              encodingFormat: 'application/vnd.ms-excel',
              contentSize: 'Various',
              license: 'https://lottolab.vip/terms',
            },
            publisher: {
              '@type': 'Organization',
              name: '로또랩',
              url: 'https://lottolab.vip',
            },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: '홈',
                  item: 'https://lottolab.vip',
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
              ],
            },
          }),
        }}
      />
      {children}
    </>
  )
}

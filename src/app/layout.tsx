import './globals.css'

import type { Metadata, Viewport } from 'next'

import { Toaster } from '@/components/ui/toast'
import { MAX_MOBILE_SCREEN_WIDTH } from '@/config/constants'
import { createWebSiteData } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: {
    default: '로또랩 - 로또 번호 생성 및 분석 도구',
    template: '%s | 로또랩',
  },
  description:
    'AI 기반 로또 번호 생성, 전략별 번호 추천, 당첨 번호 분석, 확률 계산 등 데이터 중심의 로또 도구를 제공합니다. 균형적, 보수적, 공격적 전략으로 최적화된 번호를 생성하세요.',
  keywords: [
    '로또',
    '로또 번호 생성',
    '로또 AI',
    '로또분석',
    '로또전략',
    '번호분석',
    '당첨확률',
    '로또통계',
    '로또예측',
    '로또도구',
    '645로또',
    '로또번호추천',
  ],
  authors: [{ name: '로또랩' }],
  creator: '로또랩',
  publisher: '로또랩',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://lottolab.vip'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: '/',
    title: '로또랩 - 로또 번호 생성 및 분석 도구',
    description:
      'AI 기반 로또 번호 생성, 전략별 번호 추천, 당첨 번호 분석 등 로또 도구를 제공합니다.',
    siteName: '로또랩',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: '로또랩 - 로또 번호 생성 및 분석 도구',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '로또랩 - 로또 번호 생성 및 분석 도구',
    description:
      'AI 기반 로또 번호 생성, 전략별 번호 추천, 당첨 번호 분석 등 로또 도구를 제공합니다.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  /**
   * **iOS의 "safe area"**를 사용하는 데 영향을 미치는 속성.
   * cover 를 설정하면 콘텐츠가 디바이스의 모든 화면 영역을 커버하며, 노치 영역까지 포함됩니
   *
   */
  viewportFit: 'cover',
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        {/* 📊 Google Analytics */}
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-V6T4FK1SC6`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-V6T4FK1SC6', {
                    page_path: window.location.pathname,
                  });
                `,
            }}
          />
        </>

        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.5/dist/web/static/pretendard.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.5/dist/web/static/pretendard.css"
        />

        {/* 🏗️ 웹사이트 구조화된 데이터 */}
        {createWebSiteData({
          name: '로또랩',
          description:
            'AI 기반 로또 번호 생성, 전략별 번호 추천, 당첨 번호 분석, 확률 계산 등 데이터 중심의 로또 도구를 제공합니다.',
          url: 'https://lottolab.vip/',
        })}
      </head>
      <body className={`antialiased`}>
        <main
          className="bg-background mx-auto h-full min-h-screen"
          style={{
            maxWidth: MAX_MOBILE_SCREEN_WIDTH,
          }}
        >
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
}

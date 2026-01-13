/**
 * 🏗️ 구조화된 데이터(JSON-LD) 헬퍼 함수들
 *
 * 🔍 역할: SEO용 구조화된 데이터를 생성하여 검색 엔진 이해도 향상
 * 📍 사용법: layout.tsx에서 import하여 사용
 *
 * 💡 장점:
 * - layout 파일이 깔끔해짐
 * - 재사용 가능
 * - 수정이 쉬움
 * - 타입 안전성
 */

interface StructuredDataProps {
  name: string
  description: string
  url: string
  featureList?: string[]
}

interface FAQItem {
  question: string
  answer: string
}

/**
 * 웹 애플리케이션 구조화된 데이터 생성
 */
export function createWebApplicationData({
  name,
  description,
  url,
  featureList = [],
}: StructuredDataProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    ...(featureList.length > 0 && { featureList }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/**
 * FAQ 페이지 구조화된 데이터 생성
 */
export function createFAQData(faqItems: FAQItem[]) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/**
 * 웹사이트 구조화된 데이터 생성
 */
export function createWebSiteData({
  name,
  description,
  url,
}: {
  name: string
  description: string
  url: string
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    description,
    url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/**
 * 로또 도구 구조화된 데이터 생성 (웹 애플리케이션)
 */
export function createLottoToolData({
  name,
  description,
  url,
}: {
  name: string
  description: string
  url: string
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    audience: {
      '@type': 'Audience',
      audienceType: '로또 구매자',
    },
    featureList: [
      'AI 기반 로또 번호 생성',
      '전략별 번호 추천 (균형적, 보수적, 공격적)',
      '당첨 번호 분석 및 통계',
      '번호 패턴 분석',
      '확률 계산',
      '맞춤형 필터 설정',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/**
 * 로또 번호 생성기 구조화된 데이터
 */
export function createLottoGeneratorData({
  strategy,
  url,
}: {
  strategy: string
  url: string
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${strategy} 전략 로또 번호 생성기`,
    description: `${strategy} 전략을 사용하여 최적화된 로또 번호를 자동 생성하는 도구입니다.`,
    url,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    keywords: '로또, 번호생성, AI, 전략, 분석',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

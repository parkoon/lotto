import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://lottolab.vip'

  return {
    rules: {
      userAgent: '*', // 모든 검색 엔진 봇 대상
      allow: '/', // 모든 페이지 크롤링 허용
      disallow: [
        // 💡 크롤링을 차단하고 싶은 페이지가 있다면 여기에 추가하세요
        // 예시: '/temp/', '/draft/', '/internal/'
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`, // 사이트맵 위치 알려주기
  }
}

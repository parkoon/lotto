import { MetadataRoute } from 'next'

/**
 * 사이트맵 생성 파일
 *
 * 🔍 역할: 검색 엔진이 사이트 구조를 이해하고 크롤링할 수 있도록 도와주는 파일
 * 📍 생성 경로: /sitemap.xml
 *
 * 🔄 언제 수정해야 하나요?
 * - 새로운 페이지가 추가될 때
 * - 페이지 경로가 변경될 때
 * - 도메인이 변경될 때
 *
 * 📝 수정 방법:
 * 1. 새 페이지 추가 시: return 배열에 새로운 객체 추가
 *
 * 💡 초간단 버전: URL만 있어도 충분함
 * - lastModified, changeFrequency, priority 모두 선택사항
 * - 검색 엔진이 알아서 판단함
 * - 복잡하게 생각할 필요 없음!
 */

// ⚙️ Next.js 정적 export를 위한 설정
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://lottolab.vip',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `https://lottolab.vip/generator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `https://lottolab.vip/generator/strategy`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `https://lottolab.vip/generator/custom`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `https://lottolab.vip/stats/my-history`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `https://lottolab.vip/stats/number`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `https://lottolab.vip/generator/ai`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `https://lottolab.vip/excel/history`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    // 통계 엑셀 페이지들
    {
      url: `https://lottolab.vip/excel/stats`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `https://lottolab.vip/excel/stats/ac`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `https://lottolab.vip/excel/stats/hot-cold`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `https://lottolab.vip/excel/stats/add-even`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `https://lottolab.vip/excel/stats/number-rank`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ]
}

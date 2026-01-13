import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // 정적 사이트 생성 - Cloudflare Pages는 정적 파일만 호스팅 가능
  output: 'export',

  // URL 끝에 슬래시 추가 - SEO 및 일관성을 위해
  trailingSlash: true,

  // 이미지 최적화 비활성화 - 정적 export에서는 Next.js 이미지 최적화 사용 불가
  images: {
    unoptimized: true,
  },

  // Cloudflare Pages 최적화 설정
  compress: true, // gzip 압축 활성화로 번들 크기 감소
  poweredByHeader: false, // 'X-Powered-By: Next.js' 헤더 제거로 보안 강화

  experimental: {
    /**
     * @see https://nextjs.org/docs/app/api-reference/config/typescript#statically-typed-links
     * 라우팅 경로 타이핑
     */
    typedRoutes: true,
  },
}

export default nextConfig

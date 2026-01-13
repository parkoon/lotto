# 🔍 SEO 설정 종합 가이드

## 📋 개요

이 문서는 일상도구 사이트의 SEO 설정에 대한 종합 가이드입니다. 유지보수 시 참고하여 SEO 성능을 유지하고 개선할 수 있습니다.

## 🗂️ 파일 구조

```
src/app/
├── layout.tsx          # 🌐 전체 사이트 SEO 설정
├── page.tsx            # 🏠 메인 페이지 SEO 설정
├── sitemap.ts          # 🗺️ 사이트맵 생성
├── robots.ts           # 🤖 검색 엔진 크롤링 규칙
├── lotto/
│   ├── my/
│   │   └── layout.tsx  # 🎯 로또 번호 확인 페이지 SEO
│   └── stats/
│       └── layout.tsx  # 📊 로또 통계 페이지 SEO
```

## 🔧 주요 설정 항목

### 1. 메타데이터 (Metadata)

- **title**: 검색 결과 제목
- **description**: 검색 결과 미리보기 설명
- **keywords**: 타겟 키워드 배열
- **openGraph**: 소셜 미디어 공유 설정
- **twitter**: 트위터 공유 설정

### 2. 구조화된 데이터 (JSON-LD)

- **WebSite**: 전체 사이트 정보
- **WebApplication**: 도구/앱 정보
- **FAQPage**: 자주 묻는 질문

### 3. 검색 엔진 최적화

- **sitemap.xml**: 페이지 목록 및 우선순위
- **robots.txt**: 크롤링 허용/차단 규칙
- **canonical**: 중복 콘텐츠 방지

## 🔄 유지보수 가이드

### 새로운 페이지 추가 시

1. **페이지별 layout.tsx 생성**

   ```typescript
   // src/app/새로운-페이지/layout.tsx
   export const metadata: Metadata = {
     title: '페이지 제목',
     description: '페이지 설명',
     // ... 기타 설정
   }
   ```

2. **sitemap.ts 업데이트**
   ```typescript
   // src/app/sitemap.ts
   return [
     // ... 기존 페이지들
     {
       url: `${baseUrl}/새로운-페이지`,
     },
   ]
   ```

### 도메인 변경 시

다음 파일들에서 도메인을 일괄 변경하세요:

1. **src/app/layout.tsx**
   - `metadataBase: new URL('새-도메인')`
   - JSON-LD 스크립트 내 URL

2. **src/app/sitemap.ts**
   - `baseUrl = '새-도메인'`

3. **src/app/robots.ts**
   - `baseUrl = '새-도메인'`

4. **각 페이지 layout.tsx**
   - JSON-LD 스크립트 내 URL

### 검색 엔진 등록 시

1. **Google Search Console**

   ```typescript
   // src/app/layout.tsx
   verification: {
     google: 'your-google-verification-code',
   }
   ```

2. **Naver Search Advisor**
   ```typescript
   // src/app/layout.tsx
   verification: {
     other: {
       'naver-site-verification': 'your-naver-verification-code',
     },
   }
   ```

## 🖼️ 이미지 관리

### 필수 이미지 파일

```
public/images/
├── og-image.png          # 메인 사이트 공유 이미지
├── og-image.png    # 로또 페이지 이미지
```

### 이미지 요구사항

- **크기**: 1200x630 픽셀 (Open Graph 권장)
- **포맷**: JPG 또는 PNG
- **용량**: 각각 1MB 이하
- **내용**: 각 페이지의 기능을 시각적으로 표현

## 🎯 키워드 전략

### 현재 타겟 키워드

| 페이지    | 주요 키워드                            |
| --------- | -------------------------------------- |
| 메인      | 일상도구, 생활도구, 데이터분석         |
| 로또 확인 | 로또, 당첨확인, 번호조회, 당첨이력     |
| 로또 통계 | 로또통계, 번호분석, 출현횟수, 로또차트 |

### 키워드 추가 방법

```typescript
// 각 페이지 layout.tsx에서
keywords: [
  '기존키워드1',
  '기존키워드2',
  '새로운키워드', // 추가
],
```

## 📊 성능 모니터링

### 확인해야 할 지표

1. **Google Search Console**
   - 검색 노출 수
   - 클릭률 (CTR)
   - 평균 검색 순위

2. **Google Analytics**
   - 유기적 검색 트래픽
   - 페이지별 방문자 수
   - 이탈률

3. **페이지 속도**
   - Core Web Vitals
   - 모바일 성능 점수

## ⚠️ 주의사항

### 하지 말아야 할 것들

1. **키워드 스터핑**: 키워드를 과도하게 반복하지 마세요
2. **중복 콘텐츠**: 같은 내용을 여러 페이지에 복사하지 마세요
3. **잘못된 메타데이터**: 페이지 내용과 맞지 않는 설명 사용 금지
4. **robots.txt 실수**: 중요한 페이지를 차단하지 마세요

### 권장사항

1. **정기적 업데이트**: 월 1회 이상 메타데이터 검토
2. **사용자 중심**: 검색 엔진보다 사용자 경험 우선
3. **모바일 최적화**: 모바일 친화적 설계 유지
4. **페이지 속도**: 빠른 로딩 속도 유지

## 🔗 유용한 도구

- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com)
- [Naver Search Advisor](https://searchadvisor.naver.com)
- [구조화된 데이터 테스트](https://search.google.com/test/rich-results)
- [PageSpeed Insights](https://pagespeed.web.dev)

## 📞 문의사항

SEO 설정 관련 문의사항이 있으시면 개발팀에 연락주세요.

---

_마지막 업데이트: 2024년 12월_

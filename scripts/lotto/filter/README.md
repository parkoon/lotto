# 로또 필터 생성 스크립트

로또 번호 분석 데이터를 기반으로 다양한 필터를 생성하는 스크립트 모음입니다.

## 📁 디렉토리 구조

```
scripts/lotto/filter/
├── base.ts                 # 공통 유틸리티 함수들
├── index.ts               # 모든 필터 생성 (메인 실행 파일)
├── sum-range.ts           # 번호 총합 필터
├── ac-value.ts            # AC값 필터
├── prime.ts               # 소수 필터
├── multiple-of-3.ts       # 3의 배수 필터
├── multiple-of-5.ts       # 5의 배수 필터
├── perfect-square.ts      # 완전제곱수 필터
├── composite.ts           # 합성수 필터
├── front-sum.ts           # 앞수합 필터
├── back-sum.ts            # 뒷수합 필터
├── first-digit-sum.ts     # 첫수합 필터
├── last-digit-sum.ts      # 끝수합 필터
├── consecutive.ts         # 연속번호 필터
├── double-digit.ts        # 쌍수 필터
├── odd-even-ratio.ts      # 홀짝 비율 필터
├── high-low-ratio.ts      # 고저 비율 필터
└── README.md              # 이 파일
```

## 🚀 사용법

### 1. 모든 필터 생성

```bash
# 프로젝트 루트에서 실행
yarn lotto:filters

# 또는 직접 실행
npx tsx scripts/lotto/filter/index.ts
```

### 2. 사용 가능한 스크립트

| 스크립트             | 설명           |
| -------------------- | -------------- |
| `yarn lotto:filters` | 모든 필터 생성 |

## 📊 생성되는 필터 파일

모든 필터는 `src/data/lotto/filter/` 디렉토리에 JSON 파일로 생성됩니다.

### 숫자 범위 필터 구조

```json
{
  "description": "필터 설명",
  "conservative": {
    "min": 최소값,
    "max": 최대값,
    "description": "25%-75% 분위수 (중간 50% 범위)"
  },
  "balanced": {
    "min": 최소값,
    "max": 최대값,
    "description": "10%-90% 분위수 (넓은 80% 범위)"
  },
  "aggressive": {
    "min": 최소값,
    "max": 최대값,
    "description": "평균±1표준편차 (68% 신뢰구간)"
  },
  "ai": {
    "min": Q1값,
    "max": Q3값,
    "description": "최근 30회 패턴 기반 (Q1-Q3 범위, 최근 트렌드 반영)"
  }
}
```

### 비율 필터 구조

```json
{
  "description": "필터 설명",
  "conservative": {
    "ratios": [{ "odd": 3, "even": 3 }],
    "description": "가장 빈번한 상위 3개 비율"
  },
  "balanced": {
    "ratios": [
      { "odd": 3, "even": 3 },
      { "odd": 4, "even": 2 }
    ],
    "description": "균형잡힌 상위 5개 비율"
  },
  "aggressive": {
    "ratios": [{ "odd": 3, "even": 3 }],
    "description": "가장 높은 확률의 상위 2개 비율"
  },
  "ai": {
    "ratios": [
      { "odd": 4, "even": 2 },
      { "odd": 3, "even": 3 },
      { "odd": 5, "even": 1 }
    ],
    "description": "최근 30회 패턴 기반 (4:2, 3:3, 5:1, 최근 트렌드 반영)"
  }
}
```

## 🔧 필터 추가 방법

새로운 필터를 추가하려면:

1. `base.ts`의 유틸리티 함수들을 사용하는 새 함수 생성
2. `index.ts`에 새 필터 함수 추가

### 예시: 새 필터 추가

```typescript
// new-filter.ts
import { lotto, calculateStats, saveFilter } from './base.js'

/**
 * 새로운 필터 생성
 * 새로운 조건의 필터를 분석
 */
export async function generateNewFilter(): Promise<void> {
  // 데이터 분석 로직
  const values = lotto.map((game) => {
    // 분석 로직
    return someValue
  })

  const result = calculateStats(values)

  await saveFilter('new-filter', result, '새로운 필터 설명')
}

// 직접 실행 시
if (require.main === module) {
  generateNewFilter().catch(console.error)
}
```

## 📈 필터 종류

### 1. 숫자 개수 기반 필터

- **소수 필터**: 소수의 개수 제한
- **3의 배수 필터**: 3의 배수 개수 제한
- **5의 배수 필터**: 5의 배수 개수 제한
- **완전제곱수 필터**: 완전제곱수 개수 제한
- **합성수 필터**: 합성수 개수 제한
- **쌍수 필터**: 쌍수(11, 22, 33, 44) 개수 제한

### 2. 합계 기반 필터

- **총합 필터**: 6개 번호의 총합 범위 제한
- **앞수합 필터**: 작은 3개 번호의 합 제한
- **뒷수합 필터**: 큰 3개 번호의 합 제한
- **첫수합 필터**: 십의 자리 합 제한
- **끝수합 필터**: 일의 자리 합 제한

### 3. 패턴 기반 필터

- **AC값 필터**: 산술적 복잡성 제한
- **연속번호 필터**: 연속된 번호 개수 제한

### 4. 비율 기반 필터

- **홀짝 비율 필터**: 홀수:짝수 비율 제한
- **고저 비율 필터**: 저구간:고구간 비율 제한

## 🎯 전략별 설정

각 필터는 4가지 전략을 제공합니다:

- **보수적 (Conservative)**: 가장 안정적인 범위
- **균형적 (Balanced)**: 넓은 범위로 다양성 확보
- **공격적 (Aggressive)**: 통계적 신뢰구간 기반
- **AI 추천**: 최근 30회 패턴 기반 최적화

## 📝 주의사항

- 로또 데이터 파일(`src/data/lotto.json`)이 최신 상태여야 합니다
- 필터 생성 전에 `yarn lotto:fetch` 명령으로 데이터 업데이트 권장
- 생성된 필터는 확률적 분석 결과이며 당첨을 보장하지 않습니다

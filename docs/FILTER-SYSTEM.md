# 로또 필터 시스템 상세 가이드

로또 번호 생성에 사용되는 통계 기반 필터 시스템의 완전한 가이드입니다.

## 📋 목차

1. [필터 시스템 개요](#필터-시스템-개요)
2. [전략별 설정](#전략별-설정)
3. [필터 카테고리](#필터-카테고리)
4. [개별 필터 상세](#개별-필터-상세)
5. [통계적 배경](#통계적-배경)
6. [필터 영향도 분석](#필터-영향도-분석)
7. [신규 필터 추가 가이드](#신규-필터-추가-가이드)
8. [유지보수 가이드](#유지보수-가이드)

---

## 필터 시스템 개요

### 기본 원리

로또 필터 시스템은 **통계적 분석**을 기반으로 로또 번호의 특정 패턴과 특성을 제한하여 더 현실적인 번호 조합을 생성합니다.

### 핵심 개념

- **필터**: 특정 조건을 만족하는 번호 조합만 허용
- **전략**: 필터의 엄격함 정도 (보수적 ~ 공격적)
- **통계 기반**: 실제 로또 당첨 번호 데이터 분석 결과 활용
- **범위 제한**: 극단적이거나 비현실적인 조합 배제

---

## 전략별 설정

### 1. 보수적 (Conservative) 🛡️

- **범위**: 25%-75% 분위수 (중간 50% 구간)
- **특징**: 가장 빈번하게 나타나는 안정적인 범위
- **용도**: 위험 회피, 높은 확률의 패턴 선호
- **예시**: 총합 90-150, 홀짝비율 2:4, 3:3, 4:2

### 2. 균형적 (Balanced) ⚖️

- **범위**: 10%-90% 분위수 (넓은 80% 구간)
- **특징**: 다양성과 안정성의 균형
- **용도**: 일반적인 번호 생성, 적당한 모험
- **예시**: 총합 75-180, 다양한 홀짝비율 포함

### 3. 공격적 (Aggressive) ⚡

- **범위**: 평균 ± 1표준편차 (68% 신뢰구간)
- **특징**: 통계적 신뢰구간 기반의 과학적 접근
- **용도**: 데이터 기반 의사결정, 중간 위험도
- **예시**: 통계적으로 유의미한 범위

### 4. AI 추천 🤖

- **범위**: 최근 30회 패턴 기반 (최근 트렌드 반영)
- **특징**: 최신 데이터 기반 최적화, 트렌드 반영
- **용도**: 최근 패턴 활용, 동적 최적화
- **예시**: 총합 113-158 (최근 30회 Q1-Q3), 홀짝비율 4:2, 3:3, 5:1

---

## 필터 카테고리

### 📊 1. 합계 기반 필터

숫자들의 합을 제한하는 필터들

### 🔢 2. 개수 기반 필터

특정 조건을 만족하는 숫자의 개수를 제한

### 📐 3. 비율 기반 필터

두 그룹 간의 비율을 제한

### 🎯 4. 패턴 기반 필터

숫자 배열의 특정 패턴을 제한

---

## 개별 필터 상세

### 📊 합계 기반 필터

#### 1. 총합 필터 (sum-range-filter)

```typescript
// 계산 방식
const sum = numbers.reduce((total, num) => total + num, 0)
```

- **의미**: 6개 번호의 총합
- **일반적 범위**: 80-160
- **통계적 근거**: 정규분포에 가까운 패턴
- **영향**: 극단적으로 작거나 큰 번호 조합 배제

#### 2. 앞수합 필터 (front-sum-filter)

```typescript
// 계산 방식
const frontSum = sortedNumbers.slice(0, 3).reduce((sum, num) => sum + num, 0)
```

- **의미**: 가장 작은 3개 번호의 합
- **일반적 범위**: 20-80
- **용도**: 작은 번호들의 분포 조절
- **영향**: 너무 작거나 큰 번호들의 편중 방지

#### 3. 뒷수합 필터 (back-sum-filter)

```typescript
// 계산 방식
const backSum = sortedNumbers.slice(-3).reduce((sum, num) => sum + num, 0)
```

- **의미**: 가장 큰 3개 번호의 합
- **일반적 범위**: 50-120
- **용도**: 큰 번호들의 분포 조절

#### 4. 첫수합 필터 (first-digit-sum-filter)

```typescript
// 계산 방식
const firstDigitSum = numbers.reduce(
  (sum, num) => sum + Math.floor(num / 10),
  0
)
```

- **의미**: 십의 자리 숫자들의 합
- **범위**: 6-18 (1의 자리 6개 ~ 4의 자리 6개)
- **용도**: 번호 분포의 균등성 조절

#### 5. 끝수합 필터 (last-digit-sum-filter)

```typescript
// 계산 방식
const lastDigitSum = numbers.reduce((sum, num) => sum + (num % 10), 0)
```

- **의미**: 일의 자리 숫자들의 합
- **범위**: 15-35
- **용도**: 일의 자리 패턴 다양성 확보

### 🔢 개수 기반 필터

#### 6. 소수 필터 (prime-filter)

```typescript
// 소수 목록
const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43]
```

- **의미**: 소수의 개수 (0-6개)
- **일반적 범위**: 1-3개
- **통계적 근거**: 45개 중 14개가 소수 (31%)

#### 7. 3의 배수 필터 (multiple-of-3-filter)

```typescript
// 3의 배수: 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45
const multipleOf3 = numbers.filter((num) => num % 3 === 0).length
```

- **의미**: 3의 배수 개수
- **범위**: 0-4개 (일반적으로 1-2개)
- **비율**: 45개 중 15개 (33%)

#### 8. 5의 배수 필터 (multiple-of-5-filter)

```typescript
// 5의 배수: 5, 10, 15, 20, 25, 30, 35, 40, 45
const multipleOf5 = numbers.filter((num) => num % 5 === 0).length
```

- **의미**: 5의 배수 개수
- **범위**: 0-2개 (일반적으로 0-1개)
- **비율**: 45개 중 9개 (20%)

#### 9. 완전제곱수 필터 (perfect-square-filter)

```typescript
// 완전제곱수: 1, 4, 9, 16, 25, 36
const perfectSquares = [1, 4, 9, 16, 25, 36]
```

- **의미**: 완전제곱수 개수
- **범위**: 0-2개 (매우 드물게 3개)
- **비율**: 45개 중 6개 (13%)

#### 10. 합성수 필터 (composite-filter)

```typescript
// 합성수: 소수가 아닌 자연수 (1 제외)
const compositeNumbers = [4, 6, 8, 9, 10, 12, ...]
```

- **의미**: 합성수 개수
- **범위**: 2-5개
- **비율**: 45개 중 30개 (67%)

#### 11. 쌍수 필터 (double-digit-filter)

```typescript
// 쌍수: 11, 22, 33, 44
const doubleDigits = [11, 22, 33, 44]
```

- **의미**: 쌍수 개수
- **범위**: 0-1개 (매우 드물게 2개)
- **비율**: 45개 중 4개 (9%)

### 📐 비율 기반 필터

#### 12. 홀짝 비율 필터 (odd-even-ratio-filter)

```typescript
// 계산 방식
const oddCount = numbers.filter((num) => num % 2 === 1).length
const evenCount = 6 - oddCount
```

- **가능한 비율**: 0:6, 1:5, 2:4, 3:3, 4:2, 5:1, 6:0
- **일반적 비율**: 2:4, 3:3, 4:2 (80% 이상)
- **홀수**: 1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45 (23개)
- **짝수**: 2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44 (22개)

#### 13. 고저 비율 필터 (high-low-ratio-filter)

```typescript
// 계산 방식
const lowCount = numbers.filter((num) => num <= 22).length
const highCount = 6 - lowCount
```

- **저구간**: 1-22 (22개)
- **고구간**: 23-45 (23개)
- **일반적 비율**: 2:4, 3:3, 4:2
- **균등 분포**: 거의 50:50에 가까운 비율

### 🎯 패턴 기반 필터

#### 14. AC값 필터 (ac-value-filter)

```typescript
// 계산 방식: 모든 번호 쌍의 차이값 중 유니크한 개수에서 -5
function calculateACValue(numbers) {
  const sorted = numbers.sort((a, b) => a - b)
  const differences = []

  // 모든 번호 쌍의 차이 계산 (예: 6개 번호면 C(6,2) = 15개 쌍)
  for (let i = 0; i < sorted.length; i++) {
    for (let j = i + 1; j < sorted.length; j++) {
      differences.push(sorted[j] - sorted[i])
    }
  }

  // 유니크한 차이값 개수에서 5를 뺀 값이 AC값
  return new Set(differences).size - 5
}
```

- **의미**: 산술적 복잡성 (Arithmetic Complexity)
- **계산**: 모든 쌍의 차이 → 유니크 개수 → -5 (볼 수 -1)
- **범위**: 일반적으로 7-12 (3,16,18,24,40,44 = AC값 10)
- **높은 AC값**: 더 다양한 간격으로 분포된 번호
- **낮은 AC값**: 비슷한 간격으로 몰려있는 번호

#### 15. 연속번호 필터 (consecutive-filter)

```typescript
// 계산 방식: 가장 긴 연속 번호 길이
function calculateConsecutiveCount(numbers) {
  const sorted = numbers.sort((a, b) => a - b)
  let maxConsecutive = 1
  let currentConsecutive = 1

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === sorted[i - 1] + 1) {
      currentConsecutive++
      maxConsecutive = Math.max(maxConsecutive, currentConsecutive)
    } else {
      currentConsecutive = 1
    }
  }
  return maxConsecutive
}
```

- **의미**: 연속된 번호의 최대 길이
- **범위**: 1-3 (일반적으로 1-2)
- **예시**: [1,2,3,15,32,41] → 연속번호 3개

---

## 통계적 배경

### 중심극한정리의 적용

로또 번호의 총합은 중심극한정리에 의해 정규분포에 가까운 형태를 보입니다.

- **평균**: 약 138 (1+2+...+45의 중점)
- **표준편차**: 약 20-25
- **분포**: 종 모양의 정규분포

### 확률론적 근거

각 필터는 다음과 같은 확률론적 원리에 기반합니다:

1. **대수의 법칙**: 충분한 표본에서 일정한 패턴 관찰
2. **회귀 효과**: 극단값은 평균으로 회귀하는 경향
3. **독립성**: 각 추첨은 독립적이지만 패턴은 존재
4. **균등분포**: 각 번호가 선택될 확률은 동일

### 비모수 통계 활용

- **분위수 기반**: 평균에 의존하지 않는 견고한 통계량
- **최근 30회 패턴**: 최근 30회 데이터의 25%-75% 분위수 범위
- **순위 기반**: 이상치에 영향받지 않는 순위 통계

---

## 필터 영향도 분석

### 높은 영향도 필터 (생성 번호에 큰 영향)

1. **총합 필터**: 전체적인 번호 크기 조절
2. **홀짝 비율**: 기본적인 분포 특성 결정
3. **고저 비율**: 번호 범위 분포 조절

### 중간 영향도 필터

1. **AC값**: 번호 간 분산 정도 조절
2. **소수 개수**: 특정 타입 번호 비율 조절
3. **앞수합/뒷수합**: 구간별 세밀한 조절

### 낮은 영향도 필터 (미세 조정)

1. **쌍수 개수**: 드물게 적용
2. **연속번호**: 특수한 패턴 제한
3. **완전제곱수**: 특정 숫자 타입 제한

### 필터 간 상관관계

- **총합 ↔ 앞수합/뒷수합**: 강한 양의 상관관계
- **홀짝비율 ↔ 고저비율**: 약한 상관관계
- **AC값 ↔ 연속번호**: 음의 상관관계 (AC값 높으면 연속번호 적음)

---

## 신규 필터 추가 가이드

### 1. 필터 아이디어 검증

새로운 필터를 추가하기 전 다음을 확인하세요:

```typescript
// 예시: 십의 자리 다양성 필터
const uniqueTensDigits = new Set(numbers.map((num) => Math.floor(num / 10)))
  .size
```

**검증 체크리스트:**

- [ ] 통계적 유의성: 실제 데이터에서 패턴이 관찰되는가?
- [ ] 독립성: 기존 필터와 중복되지 않는가?
- [ ] 실용성: 번호 생성에 의미있는 제약을 가하는가?
- [ ] 구현 가능성: 효율적으로 계산 가능한가?

### 2. 필터 구현 단계

#### Step 1: 데이터 분석

```typescript
// scripts/analyze-new-filter.ts
import { lotto } from './filter/base.js'

function analyzeNewPattern() {
  const values = lotto.map((game) => {
    // 새로운 패턴 계산 로직
    return calculateNewMetric(game.numbers)
  })

  // 기본 통계 확인
  console.log('평균:', values.reduce((a, b) => a + b) / values.length)
  console.log('최근 30회 패턴:', calculateStatsRecent30(values).ai)
  console.log('분위수:', calculatePercentiles(values))
}
```

#### Step 2: 필터 함수 작성

```typescript
// scripts/lotto/filter/new-metric.ts
export async function generateNewMetricFilter(): Promise<void> {
  const values = lotto.map((game) => calculateNewMetric(game.numbers))
  const result = calculateStats(values)

  await saveFilter('new-metric-filter', result, '새로운 메트릭에 대한 설명')
}
```

#### Step 3: 통합 및 테스트

- `index.ts`에 새 필터 추가
- `package.json`에 스크립트 추가
- README 문서 업데이트
- 충분한 테스트 수행

### 3. 필터 품질 평가 기준

#### 통계적 기준

- **분포의 적정성**: 너무 극단적이지 않은 범위
- **빈도의 일관성**: 시간에 따른 일정한 패턴
- **예측력**: 미래 번호에 대한 설명력

#### 실용적 기준

- **계산 효율성**: O(n) 이하의 시간 복잡도
- **이해 가능성**: 직관적으로 설명 가능한 의미
- **조정 가능성**: 전략별 다른 범위 설정 가능

---

## 유지보수 가이드

### 정기 업데이트 프로세스 (매주 토요일)

#### 1. 자동 업데이트

```bash
# 통합 스크립트 실행
yarn lotto:update
```

#### 2. 데이터 검증

```typescript
// 업데이트 후 확인사항
- 새로운 당첨번호가 정상적으로 추가되었는가?
- 모든 필터 JSON 파일이 갱신되었는가?
- 이상치나 오류 데이터는 없는가?
```

#### 3. 필터 성능 모니터링

- **분포 변화**: 새로운 데이터로 인한 통계 변화 확인
- **극단값 감지**: 비정상적인 필터 범위 변화 모니터링
- **상관관계 변화**: 필터 간 관계 변화 추적

### 장기 유지보수 (분기별)

#### 1. 필터 효과성 평가

- 각 전략별 실제 적중률 분석
- 필터 조합의 최적화 가능성 검토
- 사용자 피드백 반영

#### 2. 시스템 개선

- 새로운 통계 기법 적용 검토
- 계산 성능 최적화
- 코드 리팩토링 및 문서 업데이트

#### 3. 데이터 품질 관리

- 과거 데이터 정확성 재검증
- 데이터 소스 안정성 확인
- 백업 및 복구 절차 점검

### 문제 해결 가이드

#### 일반적인 문제들

**1. 필터 범위가 너무 극단적인 경우**

```typescript
// 해결책: 이상치 제거 또는 robust 통계 사용
const robustStats = calculateRobustStats(values, { outlierThreshold: 0.05 })
```

**2. 새로운 패턴으로 인한 기존 필터 무효화**

```typescript
// 해결책: 적응적 필터 범위 또는 시간 가중 통계
const adaptiveRange = calculateTimeWeightedStats(values, { decayFactor: 0.95 })
```

**3. 필터 간 충돌로 인한 생성 불가**

```typescript
// 해결책: 필터 우선순위 설정 또는 조건 완화
const relaxedFilters = applyPriorityBasedFiltering(filters, priorities)
```

### 모니터링 지표

#### 시스템 건강성 지표

- **필터 적용률**: 전체 조합 중 필터 통과 비율
- **생성 성공률**: 요청 대비 성공적인 번호 생성 비율
- **범위 안정성**: 필터 범위의 주별 변동 계수

#### 데이터 품질 지표

- **데이터 일관성**: 새 데이터와 기존 패턴의 일치도
- **이상치 빈도**: 예상 범위를 벗어나는 데이터 비율
- **완전성**: 누락되거나 손상된 데이터 여부

---

## 참고 자료

### 통계학 개념

- **분위수 (Percentile)**: 데이터를 순서대로 나열했을 때의 위치
- **표준편차 (Standard Deviation)**: 평균으로부터의 분산 정도
- **최근 30회 패턴**: 최근 30회의 Q1-Q3 범위로 트렌드 반영
- **중심극한정리**: 표본 크기가 충분히 클 때 정규분포 수렴

### 확률론 개념

- **독립사건**: 한 사건이 다른 사건에 영향을 주지 않음
- **조건부 확률**: 특정 조건 하에서의 확률
- **베이즈 정리**: 사전 정보를 활용한 확률 갱신

### 추가 학습 자료

- 「Statistics for Dummies」 - 기초 통계학
- 「The Art of Computer Programming」 - 알고리즘 최적화
- 「Pattern Recognition and Machine Learning」 - 패턴 인식

---

_이 문서는 로또 필터 시스템의 지속적인 개선을 위한 살아있는 문서입니다. 새로운 발견이나 개선사항이 있으면 언제든지 업데이트해주세요._

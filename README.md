# Tennis Character & On-court Response Evaluation (T-CORE)

## T-CORE 축

| 축 이름       | 코드 | 좌측 성향 (코드)   | 우측 성향 (코드)        | 의미 설명                                                                             |
| ------------- | ---- | ------------------ | ----------------------- | ------------------------------------------------------------------------------------- |
| **샷 스타일** | P/C  | **Power (P)**      | **Control (C)**         | 볼을 강하게 쳐서 압도하려는 성향 vs 정확하고 안정적인 샷으로 점수를 쌓는 성향         |
| **사고 방식** | O/I  | **Organized (O)**  | **Instinctive (I)**     | 계획적으로 플레이하고 판단하는 성향 vs 상황에 따라 즉흥적으로 반응하는 성향           |
| **포지셔닝**  | N/B  | **Net Player (N)** | **Baseline Player (B)** | 네트 근처에서 전진 플레이를 선호하는 성향 vs 베이스라인 근처에서 랠리를 선호하는 성향 |
| **태도/동기** | A/E  | **Aspire (A)**     | **Enjoy (E)**           | 실력 향상이나 성취를 중요하게 여기는 성향 vs 테니스 자체의 즐거움에 더 집중하는 성향  |

## T-CORE 축 상세

| 코드 | 한글 이름      | 핵심 개념                                                  | 설명                                                                                                                                          | 행동 특징 요약                                             |
| ---- | -------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| P    | 파워형         | 강한 샷으로 상대를 압도하려는 공격형 스타일                | 랠리보다는 직접 공격해서 빨리 끝내는 플레이를 선호해요. 리스크가 있어도 한 방에 결정지으려는 욕구가 강하고, 상대를 밀어붙일 때 쾌감을 느껴요. | 파워 샷 선호, 찬스에 과감함, 실수보다 공격 기회를 중시     |
| C    | 컨트롤형       | 정확하고 안정적인 샷으로 점수를 쌓는 전략형 스타일         | 무리하게 공격하기보다는 안정적인 플레이로 실수를 줄이고, 상대의 흐름을 읽으며 찬스를 기다리는 스타일이에요.                                   | 실수 최소화, 구석 공략, 랠리 유도                          |
| O    | 조직형         | 계획적이고 체계적으로 플레이를 설계하는 분석형 스타일      | 경기 흐름과 상황을 머릿속으로 정리하고, 다음 행동을 미리 계획한 뒤 플레이하는 걸 선호해요. 계획대로 경기를 운영할 때 안정감을 느껴요.         | 미리 생각하고 움직임, 루틴 중시, 변화보다 검증된 선택 선호 |
| I    | 직감형         | 직감과 순간 판단에 따라 유연하게 움직이는 본능형 스타일    | 상황에 따라 즉시 느끼는 감각과 타이밍으로 플레이를 결정해요. 흐름에 자연스럽게 반응하며, 순간의 영감을 발휘할 때 몰입감을 느껴요.             | 반사적 선택, 다양한 시도, 자유로운 대응                    |
| N    | 네트플레이어   | 네트 근처에서 전진 플레이로 주도권을 잡는 스타일           | 앞으로 치고 나가는 전진 움직임에서 리듬을 찾고, 빠른 타이밍에서 승부를 보는 걸 즐겨요. 적극적으로 공간을 좁히는 플레이에 익숙해요.            | 네트 전진, 발리/스매시에 자신감, 짧은 전개 선호            |
| B    | 베이스라이너   | 베이스라인 근처에서 안정적인 랠리로 흐름을 조절하는 스타일 | 코트 뒤쪽에서 긴 랠리 속에 흐름을 가져오는 걸 선호해요. 실수를 줄이고 상대 약점을 찾아내며 꾸준한 플레이에 자신감을 느껴요.                   | 긴 랠리 선호, 수비적 대응, 실수 유도 전략                  |
| A    | 성장지향형     | 실력 향상과 성취를 추구하며 목표 지향적으로 접근함         | 더 나아지고 싶은 마음이 크고, 스스로의 성장을 실감할 때 큰 보람을 느껴요. 연습도 경기처럼 진지하게 임하는 편이에요.                           | 기술 향상에 관심, 피드백 중시, 목표 설정 집중              |
| E    | **재미지향형** | 테니스 자체의 재미와 몰입을 즐기는 순수 플레이형           | 이기고 지는 것보다 공을 치는 순간의 즐거움과 교감에 더 집중해요. 가볍고 유연하게 플레이할 때 가장 즐거움을 느껴요.                            | 결과보다 재미 중시, 유쾌한 경기 태도, 실수도 쉽게 넘김     |

## 질문 생성 프롬프트

```
[요청]

"태도/동기(Aspire vs Enjoy)" 축에 대해
사용자가 테니스 성향을 파악할 수 있는 7점 척도 문항 10개를 만들어줘.
질문은 일상적인 경기 상황처럼 들리게 하고,
한쪽 성향만 반영되도록 해줘.
결과는 다음 JSON 형태로:

{
  "text": "...",
  "scoreKey": { "A": 1 }
}
```

```
[혼합형 요청]

"Power vs Control"과 "Net vs Baseline"을 함께 반영한
복합 성향 테니스 질문 5개를 7점 척도 문항 형식으로 만들어줘.
질문은 상황 묘사 기반이며 자연스럽고 몰입감 있게 표현해줘.
scoreKey는 예를 들어 { "P": 0.6, "N": 0.4 }처럼 비율로 작성해줘.
```

## 디자인 프롬프트

Create a comprehensive JSON design system profile by analyzing the provided screenshots. Extract all visual design patterns, component structures, and styling conventions that would enable Cursor AI to consistently replicate this design language across new implementations.

## Specific Requirements:

### 1. Element-Specific Color Mapping: For each visual element, specify EXACTLY where colors are applied:

- Card backgrounds vs card borders vs card content
- Button backgrounds vs button text vs button icons
- Icon fills vs icon containers vs icon backgrounds
- Text colors for different hierarchy levels
- Background gradients and their precise application areas

### 2. Accurate Color Extraction: Provide precise hex values by analyzing:

- Gradient start/end colors and their direction
- Shadow colors and opacity values
- Hover state color variations
- Border colors vs fill colors
- Text color contrast ratios

### 3. Context-Aware Styling Rules: Document styling with specific application context:

- "Card containers have gradient X, but card icons use solid color Y"
- "Primary buttons use gradient A on background, secondary buttons use color B"
- "Navigation icons are color C, but action icons are color D"

### 4. Visual Effect Placement: Specify exactly which elements receive visual treatments:

- Which elements have shadows (and shadow specifications)
- Which elements have gradients (and gradient specifications)
- Which elements have border radius (and specific radius values)
- Which elements have hover animations

### 5. Component State Mapping: For each component, document:

- Default state styling
- Hover state changes (what changes and how)
- Active/pressed state appearance
- Disabled state styling
- Focus state indicators

##Output Format: Structure as a detailed JSON object that maps styling to specific elements:

```json
{
  "elementStyling": {
    "cards": {
      "background": "linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)",
      "border": "#E0E0E0",
      "shadow": "0 4px 12px rgba(0,0,0,0.1)",
      "icons": {
        "fill": "#FFFFFF",
        "background": "none"
      }
    },
    "buttons": {
      "primary": {
        "background": "#007AFF",
        "text": "#FFFFFF",
        "hover": {
          "background": "#0056CC"
        }
      }
    }
  }
}
```

Include specific selectors/contexts for each styling rule.

Content Exclusion: Focus purely on design structure and visual patterns - ignore specific text content, actual images, or branded elements.

AI Replication Goal: The JSON should serve as a precise style guide that prevents styling misplacement. Each visual effect should be mapped to its exact element context so Cursor AI applies:

- Gradients to the correct elements (cards vs icons vs buttons)
- Colors to the right component parts (backgrounds vs text vs borders)
- Visual effects to appropriate contexts (shadows on containers, not content)

### Color Accuracy Techniques:

- Sample colors from multiple points on gradients
- Note gradient directions (linear, radial, angle)
- Distinguish between overlay colors and base colors
- Account for transparency/opacity in layered elements
- Specify color variations for different states

Critical: Include "DO NOT" rules to prevent common misapplications like putting card gradients on icons or button colors on text elements.

Provide actionable, specific data that translates directly into code implementation.

---

```

## Prompt Template: Frontend Application Development

```

I need to develop a frontend mobile web application with the following specifications:

### Pages Required:

[List key pages and their primary functionality]

### User Roles and Permissions:

[Define who can do what in the system]

### Shared Components:

Navigation System – [Describe navigation approach: Sidebar, Top nav, etc.]
Header/Top Bar – [Describe common elements: user info, theme toggle, etc.]

### Modals/Popups:

[List main interactive elements that appear as overlays]

### Technical Requirements:

- Use [Specify CSS Framework] for styling
- Focus on component reusability
- Implement URL-based routing for all pages
- Create proper hooks and services for API data handling
- Develop a mock API store with realistic data structure (including IDs)
- Ensure the application is fully functional end-to-end

## Additional Considerations:

[Any specific technical or UX requirements]

Please develop this application with clean, maintainable code and intuitive user experience.

````


## 스크립트 사용법

### 로또 데이터 관리

#### 🚀 일괄 업데이트 (매주 토요일 권장)
```bash
yarn lotto:update
```

**로또 데이터 + 필터 데이터**를 한 번에 업데이트합니다. 매주 토요일 로또 발표 후 실행하세요.

- 📥 1단계: 최신 로또 데이터 가져오기 (`lotto:fetch`)
- ⚙️ 2단계: 15개 필터 데이터 생성 (`lotto:filters`)

#### 개별 작업

##### 1. 로또 데이터만 가져오기
```bash
yarn lotto:fetch
```

최신 로또 데이터를 동행복권 API에서 가져와서 `src/data/lotto.json`에 저장합니다.

##### 2. 필터 데이터만 업데이트
```bash
yarn lotto:filters
```

모든 필터 JSON 파일을 다시 생성합니다.

##### 3. 조건 데이터 업데이트

```bash
npm run update:conditions
```

로또 데이터를 분석해서 번호 생성기에서 사용할 조건 데이터를 생성하고 `src/data/lotto-conditions.json`에 저장합니다.

#### 3. 상세 분석 보기

```bash
npm run analyze:lotto
```

조건 데이터 생성과 함께 상세한 분석 결과를 콘솔에 출력합니다:

- 가장 많이 나온 번호 TOP 10
- 자주 함께 나온 번호 쌍 TOP 10
- 홀짝 패턴 분석
- 구간별 분포 분석 (1-10, 11-20, 21-30, 31-40, 41-45)
- 최근 핫 번호 분석 (최근 100회 기준)

### 데이터 업데이트 워크플로우

매주 토요일 로또 발표 후 다음 명령어 하나로 모든 데이터를 업데이트하세요:

```bash
yarn lotto:update
```

**자동으로 실행되는 과정:**
1. `yarn lotto:fetch` - 최신 로또 데이터 가져오기
2. `yarn lotto:filters` - 15개 필터 데이터 재생성
3. 웹사이트에서 자동으로 새로운 데이터를 import해서 사용

**개별 업데이트도 가능:**
- 조건 데이터만: `npm run update:conditions`
- 필터 데이터만: `yarn lotto:filters`

### 파일 구조

```
├── scripts/
│   ├── generate-lotto-conditions.ts # 패턴 분석 + 조건 데이터 생성
│   └── lotto/
│       ├── fetch-lotto.ts       # 로또 데이터 가져오기
│       ├── update-all.ts        # 통합 업데이트 스크립트
│       └── filter/              # 필터 생성 스크립트들
│           ├── index.ts         # 모든 필터 생성
│           ├── base.ts          # 공통 유틸리티
│           ├── sum-range.ts     # 총합 필터
│           ├── prime.ts         # 소수 필터
│           └── ...              # 기타 15개 필터
├── docs/
│   └── FILTER-SYSTEM.md         # 필터 시스템 상세 가이드
└── src/data/
    ├── lotto.json               # 로또 원본 데이터
    ├── lotto-conditions.json    # 생성기용 조건 데이터
    └── lotto/filter/            # 필터 JSON 파일들
        ├── sum-range-filter.json
        ├── prime-filter.json
        └── ...                  # 15개 필터 파일
```

### 📊 필터 시스템

로또 번호 생성에 사용되는 통계 기반 필터 시스템이 구축되어 있습니다.

#### 필터 종류 (15개)

1. **합계 기반** (5개): 총합, 앞수합, 뒷수합, 첫수합, 끝수합
2. **개수 기반** (6개): 소수, 3배수, 5배수, 완전제곱수, 합성수, 쌍수
3. **비율 기반** (2개): 홀짝비율, 고저비율
4. **패턴 기반** (2개): AC값, 연속번호

#### 전략별 설정

- **보수적**: 25%-75% 분위수 (중간 50% 범위)
- **균형적**: 10%-90% 분위수 (넓은 80% 범위)
- **공격적**: 평균±1표준편차 (68% 신뢰구간)
- **AI 추천**: 최근 30회 패턴 기반 (최근 트렌드 반영)

자세한 내용은 [📖 필터 시스템 가이드](docs/FILTER-SYSTEM.md)를 참고하세요.

## icon

https://www.figma.com/community/file/1092848226893690641/neubrutalism-icons-set

```

```
````

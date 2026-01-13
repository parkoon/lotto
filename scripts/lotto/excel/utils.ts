import * as fs from 'fs'
import * as path from 'path'
import * as XLSX from 'xlsx'

import { ExcelConfig, ExcelData, LottoData } from './types'

/**
 * 로또 데이터를 읽어옵니다
 */
export function loadLottoData(): LottoData[] {
  const lottoJsonPath = path.join(process.cwd(), 'src/data/lotto.json')
  return JSON.parse(fs.readFileSync(lottoJsonPath, 'utf8'))
}

/**
 * 날짜를 "YYYY년 MM월 DD일" 형식에서 "YYYY. MM. DD" 형식으로 변환합니다
 * @param dateString - "2002년 12월 07일" 형식의 날짜 문자열
 * @returns "2002. 12. 07" 형식의 날짜 문자열 (월/일은 항상 2자리)
 */
export function formatDateForExcel(dateString: string): string {
  // "2024년 7월 9일" 형태를 파싱하여 "2024. 07. 09" 형태로 변환
  const match = dateString.match(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/)
  if (match) {
    const year = match[1]
    const month = match[2].padStart(2, '0')
    const day = match[3].padStart(2, '0')
    return `${year}. ${month}. ${day}`
  }

  // fallback: 기존 방식 (정규식 매치 실패 시)
  return dateString
    .replace(/년\s*/g, '. ')
    .replace(/월\s*/g, '. ')
    .replace(/일$/, '')
}

/**
 * 엑셀 파일을 생성합니다
 */
export function createExcelFile(
  data: ExcelData,
  config: ExcelConfig,
  columnWidths?: { wch: number }[]
): void {
  // 워크시트 생성
  const worksheet = XLSX.utils.aoa_to_sheet(data)

  // 컬럼 너비 설정
  if (columnWidths) {
    worksheet['!cols'] = columnWidths
  }

  // 워크북 생성
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, config.sheetName)

  // 디렉토리 확인 및 생성
  const outputDir = path.dirname(config.outputPath)
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // 엑셀 파일 저장
  XLSX.writeFile(workbook, config.outputPath)
}

/**
 * 숫자가 홀수인지 확인합니다
 */
export function isOdd(num: number): boolean {
  return num % 2 === 1
}

/**
 * 숫자가 짝수인지 확인합니다
 */
export function isEven(num: number): boolean {
  return num % 2 === 0
}

/**
 * 홀수/짝수 개수를 계산합니다
 */
export function calculateOddEvenCount(numbers: number[]): {
  odd: number
  even: number
} {
  const oddCount = numbers.filter(isOdd).length
  const evenCount = numbers.filter(isEven).length
  return { odd: oddCount, even: evenCount }
}

/**
 * 홀짝 비율을 문자열로 반환합니다
 */
export function formatOddEvenRatio(
  oddCount: number,
  evenCount: number
): string {
  return `${oddCount}:${evenCount}`
}

/**
 * 홀수와 짝수 번호들을 분류하여 문자열로 반환합니다
 */
export function separateOddEvenNumbers(numbers: number[]): {
  oddNumbers: string
  evenNumbers: string
} {
  const oddNums = numbers.filter(isOdd).sort((a, b) => a - b)
  const evenNums = numbers.filter(isEven).sort((a, b) => a - b)

  return {
    oddNumbers: oddNums.length > 0 ? oddNums.join(', ') : '-',
    evenNumbers: evenNums.length > 0 ? evenNums.join(', ') : '-',
  }
}

/**
 * 로또 데이터를 회차 내림차순으로 정렬합니다
 */
export function sortLottoDataByRoundDesc(data: LottoData[]): LottoData[] {
  return [...data].sort((a, b) => b.round - a.round)
}

/**
 * 로또 번호별 출현 횟수를 계산합니다 (보너스 번호 포함)
 */
export function calculateNumberFrequency(data: LottoData[]): {
  [key: number]: number
} {
  const frequency: { [key: number]: number } = {}

  // 1~45번 초기화
  for (let i = 1; i <= 45; i++) {
    frequency[i] = 0
  }

  // 출현 횟수 계산
  data.forEach((item) => {
    // 당첨 번호 6개
    item.numbers.forEach((num) => {
      frequency[num]++
    })
    // 보너스 번호
    frequency[item.bonus]++
  })

  return frequency
}

/**
 * 번호별 출현 횟수를 순위별로 정렬합니다
 */
export function sortNumbersByFrequency(frequency: {
  [key: number]: number
}): Array<{
  rank: number
  number: number
  count: number
  percentage: string
}> {
  const totalDraws = Object.values(frequency).reduce(
    (sum, count) => sum + count,
    0
  )

  // 번호별 데이터 배열 생성
  const numberData = Object.entries(frequency).map(([num, count]) => ({
    number: parseInt(num),
    count,
    percentage: ((count / totalDraws) * 100).toFixed(1) + '%',
  }))

  // 출현 횟수 기준 내림차순 정렬
  numberData.sort((a, b) => b.count - a.count)

  // 순위 추가
  return numberData.map((item, index) => ({
    rank: index + 1,
    ...item,
  }))
}

/**
 * 각 번호의 마지막 출현 회차를 계산합니다
 */
export function calculateLastAppearance(data: LottoData[]): {
  [key: number]: { round: number; date: string } | null
} {
  const sortedData = sortLottoDataByRoundDesc(data)
  const lastAppearance: {
    [key: number]: { round: number; date: string } | null
  } = {}

  // 1~45번 초기화
  for (let i = 1; i <= 45; i++) {
    lastAppearance[i] = null
  }

  // 최신 회차부터 검색하여 마지막 출현 회차 찾기
  for (const item of sortedData) {
    // 당첨 번호 6개 검사
    item.numbers.forEach((num) => {
      if (lastAppearance[num] === null) {
        lastAppearance[num] = { round: item.round, date: item.date }
      }
    })
    // 보너스 번호 검사
    if (lastAppearance[item.bonus] === null) {
      lastAppearance[item.bonus] = { round: item.round, date: item.date }
    }
  }

  return lastAppearance
}

/**
 * 최근 N주 내에서 나온 번호들을 찾습니다
 */
export function findRecentNumbers(
  data: LottoData[],
  weeks: number
): Set<number> {
  const sortedData = sortLottoDataByRoundDesc(data)
  const recentNumbers = new Set<number>()

  // 최근 N주 데이터만 처리
  const recentData = sortedData.slice(0, weeks)

  recentData.forEach((item) => {
    // 당첨 번호 6개
    item.numbers.forEach((num) => {
      recentNumbers.add(num)
    })
    // 보너스 번호
    recentNumbers.add(item.bonus)
  })

  return recentNumbers
}

/**
 * 핫수와 콜드수를 계산합니다
 */
export function calculateHotColdNumbers(data: LottoData[]): {
  hotNumbers: number[]
  coldNumbers: number[]
  numberStatus: {
    [key: number]: {
      status: 'hot' | 'cold' | 'normal'
      recent5WeeksCount: number
      recent10WeeksCount: number
      lastAppearance: { round: number; date: string } | null
    }
  }
} {
  const lastAppearance = calculateLastAppearance(data)

  const hotNumbers: number[] = []
  const coldNumbers: number[] = []
  const numberStatus: {
    [key: number]: {
      status: 'hot' | 'cold' | 'normal'
      recent5WeeksCount: number
      recent10WeeksCount: number
      lastAppearance: { round: number; date: string } | null
    }
  } = {}

  // 최근 5주, 10주 데이터에서 각 번호의 출현 횟수 계산
  const recent5WeeksData = sortLottoDataByRoundDesc(data).slice(0, 5)
  const recent10WeeksData = sortLottoDataByRoundDesc(data).slice(0, 10)

  for (let num = 1; num <= 45; num++) {
    // 최근 5주 출현 횟수
    let recent5WeeksCount = 0
    recent5WeeksData.forEach((item) => {
      if (item.numbers.includes(num) || item.bonus === num) {
        recent5WeeksCount++
      }
    })

    // 최근 10주 출현 횟수
    let recent10WeeksCount = 0
    recent10WeeksData.forEach((item) => {
      if (item.numbers.includes(num) || item.bonus === num) {
        recent10WeeksCount++
      }
    })

    // 상태 판단
    let status: 'hot' | 'cold' | 'normal'
    if (recent5WeeksCount >= 1) {
      status = 'hot'
      hotNumbers.push(num)
    } else if (recent10WeeksCount === 0) {
      status = 'cold'
      coldNumbers.push(num)
    } else {
      status = 'normal'
    }

    numberStatus[num] = {
      status,
      recent5WeeksCount,
      recent10WeeksCount,
      lastAppearance: lastAppearance[num],
    }
  }

  return {
    hotNumbers: hotNumbers.sort((a, b) => a - b),
    coldNumbers: coldNumbers.sort((a, b) => a - b),
    numberStatus,
  }
}

/**
 * AC값 계산 함수
 * 산술적 복잡성 - 모든 번호 쌍의 차이값 중 유니크한 개수에서 -5
 */
export function calculateACValue(numbers: number[]): number {
  const sorted = [...numbers].sort((a, b) => a - b)
  const differences = []

  // 모든 번호 쌍의 차이 계산
  for (let i = 0; i < sorted.length; i++) {
    for (let j = i + 1; j < sorted.length; j++) {
      differences.push(sorted[j] - sorted[i])
    }
  }

  // 유니크한 차이값 개수에서 5를 뺀 값이 AC값
  return new Set(differences).size - 5
}

/**
 * 번호 배열을 문자열로 변환합니다
 */
export function formatNumbers(numbers: number[]): string {
  return numbers.sort((a, b) => a - b).join(', ')
}

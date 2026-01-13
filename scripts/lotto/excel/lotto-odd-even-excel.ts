import * as path from 'path'

import { ExcelConfig, ExcelData, ExcelGenerator } from './types'
import {
  calculateOddEvenCount,
  createExcelFile,
  formatDateForExcel,
  formatOddEvenRatio,
  loadLottoData,
  separateOddEvenNumbers,
  sortLottoDataByRoundDesc,
} from './utils'

export class LottoOddEvenExcelGenerator implements ExcelGenerator {
  private readonly config: ExcelConfig

  constructor() {
    this.config = {
      filename: 'lotto-odd-even-ratio.xlsx',
      outputPath: path.join(
        process.cwd(),
        'public/lotto/lotto-odd-even-ratio.xlsx'
      ),
      sheetName: '로또 홀짝 비율',
    }
  }

  async generateData(): Promise<ExcelData> {
    const lottoData = loadLottoData()
    const sortedData = sortLottoDataByRoundDesc(lottoData)

    const worksheetData: ExcelData = []

    // 헤더 행 추가
    worksheetData.push(['회차', '추첨일', '홀수', '짝수', '비율'])

    // 데이터 행 추가
    sortedData.forEach((item) => {
      const { odd, even } = calculateOddEvenCount(item.numbers)
      const { oddNumbers, evenNumbers } = separateOddEvenNumbers(item.numbers)
      const ratio = formatOddEvenRatio(odd, even)

      const row = [
        item.round,
        formatDateForExcel(item.date),
        oddNumbers,
        evenNumbers,
        ratio,
      ]
      worksheetData.push(row)
    })

    return worksheetData
  }

  getConfig(): ExcelConfig {
    return this.config
  }

  async generate(): Promise<void> {
    console.log('로또 홀짝 비율 엑셀 파일 생성 시작...')

    try {
      const data = await this.generateData()
      const columnWidths = [
        { wch: 8 }, // 회차
        { wch: 15 }, // 추첨일
        { wch: 20 }, // 홀수 번호들
        { wch: 20 }, // 짝수 번호들
        { wch: 10 }, // 비율
      ]

      createExcelFile(data, this.config, columnWidths)

      console.log(
        `홀짝 비율 엑셀 파일이 생성되었습니다: ${this.config.outputPath}`
      )
      console.log(`웹에서 접근 가능한 URL: /lotto/${this.config.filename}`)
      console.log(`총 ${data.length - 1}개의 회차 데이터가 포함되었습니다.`)
    } catch (error) {
      console.error('홀짝 비율 엑셀 파일 생성 중 오류가 발생했습니다:', error)
    }
  }
}

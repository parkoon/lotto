import * as path from 'path'

import { ExcelConfig, ExcelData, ExcelGenerator } from './types'
import {
  calculateACValue,
  createExcelFile,
  formatDateForExcel,
  formatNumbers,
  loadLottoData,
  sortLottoDataByRoundDesc,
} from './utils'

export class LottoACValueExcelGenerator implements ExcelGenerator {
  private readonly config: ExcelConfig

  constructor() {
    this.config = {
      filename: 'lotto-ac-value.xlsx',
      outputPath: path.join(process.cwd(), 'public/lotto/lotto-ac-value.xlsx'),
      sheetName: 'AC값 분석',
    }
  }

  async generateData(): Promise<ExcelData> {
    const lottoData = loadLottoData()
    const sortedData = sortLottoDataByRoundDesc(lottoData)

    // 헤더 행
    const headers = ['회차', '추첨일', '번호', 'AC값']

    // 데이터 행들
    const rows: ExcelData = [headers]

    // 각 회차별 데이터 추가
    sortedData.forEach((item) => {
      const formattedNumbers = formatNumbers(item.numbers)
      const acValue = calculateACValue(item.numbers)

      rows.push([
        item.round,
        formatDateForExcel(item.date),
        formattedNumbers,
        acValue,
      ])
    })

    return rows
  }

  getConfig(): ExcelConfig {
    return this.config
  }

  async generate(): Promise<void> {
    console.log('AC값 엑셀 파일 생성 시작...')

    try {
      const data = await this.generateData()

      const columnWidths = [
        { wch: 8 }, // 회차
        { wch: 15 }, // 추첨일
        { wch: 25 }, // 번호
        { wch: 10 }, // AC값
      ]

      createExcelFile(data, this.config, columnWidths)

      console.log(`AC값 엑셀 파일이 생성되었습니다: ${this.config.outputPath}`)
      console.log(`웹에서 접근 가능한 URL: /lotto/${this.config.filename}`)
      console.log(`총 ${data.length - 1}개의 회차 데이터가 포함되었습니다.`)
    } catch (error) {
      console.error('AC값 엑셀 파일 생성 중 오류가 발생했습니다:', error)
    }
  }
}

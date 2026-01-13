import * as path from 'path'

import { ExcelConfig, ExcelData, ExcelGenerator } from './types'
import {
  createExcelFile,
  formatDateForExcel,
  loadLottoData,
  sortLottoDataByRoundDesc,
} from './utils'

export class LottoDataExcelGenerator implements ExcelGenerator {
  private readonly config: ExcelConfig

  constructor() {
    this.config = {
      filename: 'lotto-data.xlsx',
      outputPath: path.join(process.cwd(), 'public/lotto/lotto-data.xlsx'),
      sheetName: '로또 당첨 결과',
    }
  }

  async generateData(): Promise<ExcelData> {
    const lottoData = loadLottoData()
    const sortedData = sortLottoDataByRoundDesc(lottoData)

    const worksheetData: ExcelData = []

    // 헤더 행 추가
    worksheetData.push([
      '회차',
      '추첨일',
      '번호1',
      '번호2',
      '번호3',
      '번호4',
      '번호5',
      '번호6',
      '보너스',
      '총판매액',
      '1등당첨금',
      '1등당첨자수',
    ])

    // 데이터 행 추가
    sortedData.forEach((item) => {
      const row = [
        item.round,
        formatDateForExcel(item.date),
        item.numbers[0],
        item.numbers[1],
        item.numbers[2],
        item.numbers[3],
        item.numbers[4],
        item.numbers[5],
        item.bonus,
        item.totalSales.toLocaleString(),
        item.firstPrizeAmount.toLocaleString(),
        item.firstWinners,
      ]
      worksheetData.push(row)
    })

    return worksheetData
  }

  getConfig(): ExcelConfig {
    return this.config
  }

  async generate(): Promise<void> {
    console.log('로또 데이터 엑셀 파일 생성 시작...')

    try {
      const data = await this.generateData()
      const columnWidths = [
        { wch: 8 }, // 회차
        { wch: 15 }, // 추첨일
        { wch: 8 }, // 번호1
        { wch: 8 }, // 번호2
        { wch: 8 }, // 번호3
        { wch: 8 }, // 번호4
        { wch: 8 }, // 번호5
        { wch: 8 }, // 번호6
        { wch: 8 }, // 보너스
        { wch: 15 }, // 총판매액
        { wch: 15 }, // 1등당첨금
        { wch: 12 }, // 1등당첨자수
      ]

      createExcelFile(data, this.config, columnWidths)

      console.log(
        `로또 데이터 엑셀 파일이 생성되었습니다: ${this.config.outputPath}`
      )
      console.log(`웹에서 접근 가능한 URL: /lotto/${this.config.filename}`)
      console.log(`총 ${data.length - 1}개의 회차 데이터가 포함되었습니다.`)
    } catch (error) {
      console.error('로또 데이터 엑셀 파일 생성 중 오류가 발생했습니다:', error)
    }
  }
}

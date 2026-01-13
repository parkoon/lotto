import * as path from 'path'

import { ExcelConfig, ExcelData, ExcelGenerator } from './types'
import {
  calculateNumberFrequency,
  createExcelFile,
  loadLottoData,
  sortNumbersByFrequency,
} from './utils'

export class LottoRankingExcelGenerator implements ExcelGenerator {
  private readonly config: ExcelConfig

  constructor() {
    this.config = {
      filename: 'lotto-number-ranking.xlsx',
      outputPath: path.join(
        process.cwd(),
        'public/lotto/lotto-number-ranking.xlsx'
      ),
      sheetName: '로또 번호 당첨 순위',
    }
  }

  async generateData(): Promise<ExcelData> {
    const lottoData = loadLottoData()

    // 번호별 출현 횟수 계산
    const frequency = calculateNumberFrequency(lottoData)

    // 순위별로 정렬
    const ranking = sortNumbersByFrequency(frequency)

    const worksheetData: ExcelData = []

    // 헤더 행 추가
    worksheetData.push(['순위', '당첨번호', '출현횟수', '비율'])

    // 데이터 행 추가
    ranking.forEach((item) => {
      const row = [item.rank, item.number, item.count, item.percentage]
      worksheetData.push(row)
    })

    return worksheetData
  }

  getConfig(): ExcelConfig {
    return this.config
  }

  async generate(): Promise<void> {
    console.log('로또 번호 순위 엑셀 파일 생성 시작...')

    try {
      const data = await this.generateData()
      const columnWidths = [
        { wch: 8 }, // 순위
        { wch: 10 }, // 당첨번호
        { wch: 12 }, // 출현횟수
        { wch: 10 }, // 비율
      ]

      createExcelFile(data, this.config, columnWidths)

      console.log(
        `번호 순위 엑셀 파일이 생성되었습니다: ${this.config.outputPath}`
      )
      console.log(`웹에서 접근 가능한 URL: /lotto/${this.config.filename}`)
      console.log(`총 45개의 번호 순위 데이터가 포함되었습니다.`)
    } catch (error) {
      console.error('번호 순위 엑셀 파일 생성 중 오류가 발생했습니다:', error)
    }
  }
}

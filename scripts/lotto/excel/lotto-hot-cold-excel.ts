import * as path from 'path'

import { ExcelConfig, ExcelData, ExcelGenerator } from './types'
import {
  calculateHotColdNumbers,
  createExcelFile,
  formatDateForExcel,
  loadLottoData,
  sortLottoDataByRoundDesc,
} from './utils'

export class LottoHotColdExcelGenerator implements ExcelGenerator {
  private readonly config: ExcelConfig

  constructor() {
    this.config = {
      filename: 'lotto-hot-cold.xlsx',
      outputPath: path.join(process.cwd(), 'public/lotto/lotto-hot-cold.xlsx'),
      sheetName: '핫수콜드수',
    }
  }

  async generateData(): Promise<ExcelData> {
    const lottoData = loadLottoData()
    const sortedData = sortLottoDataByRoundDesc(lottoData)
    const { numberStatus } = calculateHotColdNumbers(sortedData)

    // 헤더 행
    const headers = [
      '번호',
      '상태',
      '5주내 출현횟수',
      '10주내 출현횟수',
      '마지막 출현 회차',
      '마지막 출현일',
    ]

    // 데이터 행들
    const rows: ExcelData = [headers]

    // 1~45번 모든 번호에 대해 데이터 추가
    for (let num = 1; num <= 45; num++) {
      const status = numberStatus[num]
      let statusText = '일반'
      if (status.status === 'hot') {
        statusText = '핫수'
      } else if (status.status === 'cold') {
        statusText = '콜드수'
      }

      const lastAppearanceRound = status.lastAppearance?.round || '-'
      const lastAppearanceDate = status.lastAppearance?.date
        ? formatDateForExcel(status.lastAppearance.date)
        : '-'

      rows.push([
        num,
        statusText,
        status.recent5WeeksCount,
        status.recent10WeeksCount,
        lastAppearanceRound,
        lastAppearanceDate,
      ])
    }

    return rows
  }

  getConfig(): ExcelConfig {
    return this.config
  }

  async generate(): Promise<void> {
    console.log('핫수/콜드수 엑셀 파일 생성 시작...')

    try {
      const data = await this.generateData()
      const { hotNumbers, coldNumbers } = calculateHotColdNumbers(
        sortLottoDataByRoundDesc(loadLottoData())
      )

      const columnWidths = [
        { wch: 8 }, // 번호
        { wch: 12 }, // 상태
        { wch: 15 }, // 5주내 출현횟수
        { wch: 15 }, // 10주내 출현횟수
        { wch: 18 }, // 마지막 출현 회차
        { wch: 18 }, // 마지막 출현일
      ]

      createExcelFile(data, this.config, columnWidths)

      console.log(
        `핫수/콜드수 엑셀 파일이 생성되었습니다: ${this.config.outputPath}`
      )
      console.log(`웹에서 접근 가능한 URL: /lotto/${this.config.filename}`)
      console.log(`핫수 개수: ${hotNumbers.length}개`)
      console.log(`콜드수 개수: ${coldNumbers.length}개`)
      console.log(`핫수: ${hotNumbers.join(', ')}`)
      console.log(`콜드수: ${coldNumbers.join(', ')}`)
    } catch (error) {
      console.error('핫수/콜드수 엑셀 파일 생성 중 오류가 발생했습니다:', error)
    }
  }
}

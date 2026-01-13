import { LottoACValueExcelGenerator } from './lotto-ac-value-excel'
import { LottoDataExcelGenerator } from './lotto-data-excel'
import { LottoHotColdExcelGenerator } from './lotto-hot-cold-excel'
import { LottoOddEvenExcelGenerator } from './lotto-odd-even-excel'
import { LottoRankingExcelGenerator } from './lotto-ranking-excel'

async function generateAllExcel() {
  console.log('🚀 모든 로또 엑셀 파일 생성 시작...\n')

  const generators = [
    new LottoDataExcelGenerator(),
    new LottoOddEvenExcelGenerator(),
    new LottoRankingExcelGenerator(),
    new LottoHotColdExcelGenerator(),
    new LottoACValueExcelGenerator(),
  ]

  for (const generator of generators) {
    await generator.generate()
    console.log('') // 빈 줄 추가
  }

  console.log('✅ 모든 엑셀 파일 생성이 완료되었습니다!')
}

// 스크립트 실행
generateAllExcel().catch(console.error)

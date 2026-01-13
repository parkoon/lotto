import { LottoDataExcelGenerator } from './lotto-data-excel'

async function generateLottoDataExcel() {
  const generator = new LottoDataExcelGenerator()
  await generator.generate()
}

// 스크립트 실행
generateLottoDataExcel().catch(console.error)

import { LottoOddEvenExcelGenerator } from './lotto-odd-even-excel'

async function generateLottoOddEvenExcel() {
  const generator = new LottoOddEvenExcelGenerator()
  await generator.generate()
}

// 스크립트 실행
generateLottoOddEvenExcel().catch(console.error)

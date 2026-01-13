import { LottoRankingExcelGenerator } from './lotto-ranking-excel'

async function generateLottoRankingExcel() {
  const generator = new LottoRankingExcelGenerator()
  await generator.generate()
}

// 스크립트 실행
generateLottoRankingExcel().catch(console.error)

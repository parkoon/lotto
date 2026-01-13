import { LottoACValueExcelGenerator } from './lotto-ac-value-excel'

async function main() {
  const generator = new LottoACValueExcelGenerator()
  await generator.generate()
}

main().catch(console.error)

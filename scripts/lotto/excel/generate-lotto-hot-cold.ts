import { LottoHotColdExcelGenerator } from './lotto-hot-cold-excel'

async function main() {
  const generator = new LottoHotColdExcelGenerator()
  await generator.generate()
}

main().catch(console.error)

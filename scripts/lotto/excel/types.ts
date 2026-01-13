export interface LottoData {
  round: number
  date: string
  numbers: number[]
  bonus: number
  totalSales: number
  firstPrizeAmount: number
  firstWinners: number
  prizes: {
    rank: number
    winners: number
    amount: number
  }[]
}

export interface ExcelConfig {
  filename: string
  outputPath: string
  sheetName: string
}

export interface OddEvenRatio {
  round: number
  date: string
  oddCount: number
  evenCount: number
  ratio: string
}

export type ExcelData = (string | number)[][]

export interface ExcelGenerator {
  generateData(): Promise<ExcelData>
  getConfig(): ExcelConfig
}

export type LottoDraw = {
  round: number
  date: string
  rank: number
  numbers: number[]
  bonus: number
  totalSales?: number
  firstPrizeAmount?: number
  firstWinners?: number
  prizes?: { rank: number; winners: number; amount: number }[]
}

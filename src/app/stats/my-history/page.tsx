'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { LottoDraw } from '@/app/_types'
import { LottoHistory } from '@/app/stats/my-history/_components/lotto-history'
import { MyHeader } from '@/app/stats/my-history/_components/my-header'
import { RankChart } from '@/app/stats/my-history/_components/rank-chart'
import { Screen } from '@/components/layouts/screen'
import { Card } from '@/components/ui/card'
import draws from '@/data/lotto.json'

import { LottoHistoryCheckForm } from '../../_components/lotto-history-check-form'
import { LottoMenu } from '../../_components/lotto-menu'

export default function CheckPage() {
  const searchParams = useSearchParams()
  const initialNumbers = searchParams.get('numbers')?.split(',') ?? []

  const [results, setResults] = useState<LottoDraw[]>([])
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>(
    initialNumbers.map(Number)
  )

  const handleConfirm = (numbers: number[]) => {
    setSelectedNumbers(numbers)

    const matches = draws
      .map((draw) => {
        const matchCount = numbers.filter((n) =>
          draw.numbers.includes(n)
        ).length
        const bonusMatch = numbers.includes(draw.bonus)

        let rank: number | null = null
        if (matchCount === 6) rank = 1
        else if (matchCount === 5 && bonusMatch) rank = 2
        else if (matchCount === 5) rank = 3
        else if (matchCount === 4) rank = 4
        else if (matchCount === 3) rank = 5

        return {
          round: draw.round,
          rank: rank ?? 0,
          matchCount,
          bonusMatch,
          date: draw.date,
          numbers: draw.numbers,
          bonus: draw.bonus,
        }
      })
      .filter((result) => result.rank && result.rank >= 1 && result.rank <= 5)

    setResults(matches)
  }

  const handleReset = () => {
    setSelectedNumbers([])
    setResults([])
  }

  // 등수별 통계 데이터 가공
  const rankStats =
    results.length > 0
      ? [1, 2, 3, 4, 5].map((rank) => ({
          rank,
          count: results.filter((r) => r.rank === rank).length,
        }))
      : []

  useEffect(() => {
    if (initialNumbers.length > 0) {
      handleConfirm(initialNumbers.map(Number))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Screen
      withSidePadding
      header={{
        action: <LottoMenu />,
        title: '내 번호 통계',
      }}
    >
      <MyHeader />
      <Card className="mb-6">
        <LottoHistoryCheckForm
          initialValue={initialNumbers}
          onConfirm={handleConfirm}
          onReset={handleReset}
        />
      </Card>
      <RankChart data={rankStats} />
      <LottoHistory myNumbers={selectedNumbers} items={results} />
    </Screen>
  )
}

'use client'

import { useMemo, useState } from 'react'
import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts'

import { getLottoColor, getLottoRankColor } from '@/app/_utils'
import { Screen } from '@/components/layouts/screen'
import { PageDescription } from '@/components/page-description'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { ToggleGroup } from '@/components/ui/toggle-group'
import lottoData from '@/data/lotto.json'

import { LottoMenu } from '../../_components/lotto-menu'

const chartConfig = {
  number: {
    label: '번호',
  },
  count: {
    label: '출현 횟수',
  },
} satisfies ChartConfig

interface LottoDraw {
  round: number
  date: string
  numbers: number[]
  bonus: number
}

export default function LottoStatsPage() {
  const numberStats = (() => {
    const stats: Record<number, number> = {}
    for (let i = 1; i <= 45; i++) stats[i] = 0
    ;(lottoData as LottoDraw[]).forEach((draw) => {
      draw.numbers.forEach((num) => {
        stats[num] += 1
      })
      stats[draw.bonus] += 1
    })
    return stats
  })()

  const [sortBy, setSortBy] = useState('number')

  const barData = useMemo(() => {
    const arr = Array.from({ length: 45 }, (_, i) => ({
      number: i + 1,
      count: numberStats[i + 1] || 0,
    }))
    if (sortBy === 'count') {
      return [...arr].sort((a, b) => b.count - a.count)
    }
    return arr
  }, [numberStats, sortBy])

  return (
    <Screen
      withSidePadding
      header={{
        action: <LottoMenu />,
        title: '번호 통계',
      }}
    >
      <PageDescription
        title="로또 1등, 자주 나온 번호는?"
        description={`가장 많이 등장한 번호는 무엇일까요?\n데이터로 확인하는 진짜 행운의 번호!`}
      />

      <ToggleGroup
        value={sortBy}
        onChange={setSortBy}
        items={[
          { label: '번호 순', value: 'number' },
          { label: '많이 나온 순', value: 'count' },
        ]}
      />

      <section className="card py-5">
        <ChartContainer
          config={chartConfig}
          responsiveContainerHeight={32 * barData.length}
        >
          <BarChart
            accessibilityLayer
            data={barData.map((item) => {
              return {
                number: item.number,
                count: item.count,
                fill: getLottoColor(item.number),
              }
            })}
            layout="vertical"
            margin={{
              right: 0,
              left: 0,
            }}
          >
            <YAxis
              dataKey="number"
              type="category"
              axisLine={false}
              width={32}
              fontSize={14}
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="count"
              layout="vertical"
              fill={getLottoRankColor(1)}
              radius={4}
            >
              <LabelList
                dataKey="count"
                position="insideBottomRight"
                offset={8}
                formatter={(value: number) => `${value}회`}
                fontSize={14}
                fontWeight={600}
                fill="#000"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </section>
    </Screen>
  )
}

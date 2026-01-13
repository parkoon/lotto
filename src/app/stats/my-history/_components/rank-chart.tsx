'use client'

import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from 'recharts'

import { getLottoRankColor } from '@/app/_utils'
import { EmptyCard } from '@/components/empty-card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

type RankChartProps = {
  data: {
    rank: number
    count: number
  }[]
}
export const RankChart = ({ data }: RankChartProps) => {
  return (
    <section className="mb-4">
      <h3 className="mb-2 text-lg font-semibold">등수별 당첨 통계</h3>
      {data.length === 0 ? (
        <EmptyCard
          description={'당첨 데이터가 없습니다.\n로또 번호를 확인해보세요.'}
        />
      ) : (
        <div className="nb-shadow min-h-[220px] rounded bg-white pt-6 pb-2">
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={data.map((item) => {
                return {
                  rank: item.rank,
                  count: item.count,
                  fill: getLottoRankColor(item.rank),
                }
              })}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="rank"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) =>
                  chartConfig[value as keyof typeof chartConfig]?.label
                }
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="count"
                strokeWidth={2}
                radius={4}
                activeBar={({ ...props }) => {
                  return (
                    <Rectangle
                      {...props}
                      fillOpacity={0.8}
                      stroke={props.payload.fill}
                      className="!stroke-4"
                    />
                  )
                }}
              />
            </BarChart>
          </ChartContainer>
        </div>
      )}
    </section>
  )
}

const chartConfig = {
  count: {
    label: '당첨수',
  },
  1: {
    label: '1등',
  },
  2: {
    label: '2등',
  },
  3: {
    label: '3등',
  },
  4: {
    label: '4등',
  },
  5: {
    label: '5등',
  },
} satisfies ChartConfig

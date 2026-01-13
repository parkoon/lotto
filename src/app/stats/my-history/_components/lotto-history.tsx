import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

import { LottoBall } from '@/app/_components/lotto-ball'
import { LottoDraw } from '@/app/_types'
import { EmptyCard } from '@/components/empty-card'
import { Button } from '@/components/ui/button'
import { Tag } from '@/components/ui/tag'

type LottoHistoryProps = {
  myNumbers: number[]
  items: LottoDraw[]
}
export const LottoHistory = ({ myNumbers, items }: LottoHistoryProps) => {
  const [showAll, setShowAll] = useState(false)
  const visibleItems = showAll ? items : items.slice(0, 3)

  return (
    <section>
      <h3 className="mb-2 text-lg font-semibold">당첨 목록</h3>

      {items.length === 0 ? (
        <EmptyCard
          description={'당첨 데이터가 없습니다.\n로또 번호를 확인해보세요.'}
        />
      ) : (
        <div className="flex flex-col gap-2">
          {visibleItems.map((item, index) => (
            <div
              key={index}
              className="nb-shadow flex rounded bg-white px-3 py-2"
            >
              <div className="flex w-full flex-col items-start justify-between">
                <Tag className="mb-6 bg-white text-black">
                  <span className="mr-1 text-lg">{item.rank}</span>등
                </Tag>

                <div className="mb-6 flex items-center gap-2">
                  {item.numbers.map((num) => (
                    <LottoBall
                      key={num}
                      num={num}
                      size="sm"
                      disabled={!myNumbers.includes(num)}
                    />
                  ))}
                  <span>+</span>
                  <LottoBall
                    num={item.bonus}
                    size="sm"
                    disabled={!myNumbers.includes(item.bonus ?? 0)}
                  />
                </div>

                <div className="flex w-full flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">추첨 회차</span>
                    <span>
                      {item.round}회차 ({item.date})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">
                      1등 당첨 인원 / 금액
                    </span>
                    <span>
                      {(item.firstWinners ?? 0)?.toLocaleString()}명 /{' '}
                      {(item.firstPrizeAmount ?? 0)?.toLocaleString()}원
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {items.length > 5 && !showAll && (
            <div className="flex justify-center">
              <Button
                className="flex w-fit items-center"
                size="sm"
                onClick={() => setShowAll(true)}
              >
                더보기 <ChevronDown />
              </Button>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

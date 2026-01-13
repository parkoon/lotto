'use client'

import { Screen } from '@/components/layouts/screen'
import { Barousel } from '@/components/ui/barousel'
import { Card } from '@/components/ui/card'
import draws from '@/data/lotto.json'

import { LottoBall } from '../_components/lotto-ball'
import { LottoHistoryCheckCard } from '../_components/lotto-hstory-check-card'
import { LottoMenu } from '../_components/lotto-menu'

const HomePage = () => {
  // 최근 당첨번호 데이터 (마지막 회차)
  const latestDraw = draws[draws.length - 1]

  // 당첨금 포맷팅
  const formatPrize = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount)
  }

  return (
    <Screen
      withBottomFixedButton
      withSidePadding
      header={{
        action: (
          <div className="flex items-center gap-2">
            <LottoMenu />
            <div className="flex flex-col">
              <span className="text-xs">어서오세요,</span>
              <h3 className="font-semibold">당신의 1등을 찾아드립니다.</h3>
            </div>
          </div>
        ),
      }}
    >
      <Barousel
        className="mb-6"
        items={[
          {
            title: '피드백을 들려주세요',
            description:
              '필요한 기능이나 문제가 있으면 알려주세요. 누구보다 빠르게 필요한걸 전달해드립니다.',
            backgroundColor: '#FEF3C7',
            onClick: () => {
              window.open(
                'https://cafe.naver.com/f-e/cafes/31521269/menus/2',
                '_blank'
              )
            },
          },
          {
            title: '완전 무료 서비스',
            description:
              '우리 서비스는 완전 공짜입니다! 대신 서버 유지를 위한 광고가 있을 수 있으니 이해해주세요.',
            backgroundColor: '#D1FAE5',
            onClick: () => {},
          },
        ]}
      />

      <div className="flex flex-col gap-4">
        <Card className="relative overflow-hidden">
          <h3 className="mb-1 font-normal">{latestDraw.round}회 당첨번호</h3>

          <div className="mb-8 flex items-center gap-2">
            {latestDraw.numbers.map((num, index) => (
              <LottoBall key={index} num={num} />
            ))}
            +
            <LottoBall num={latestDraw.bonus} />
          </div>

          <div className="flex flex-col">
            <span>1등 총 당첨금</span>
            <div className="flex items-end gap-1">
              <span className="text-xl font-bold">
                {formatPrize(latestDraw.firstPrizeAmount)}원
              </span>
              <span className="text-sm">({latestDraw.firstWinners}명)</span>
            </div>
          </div>

          <div className="absolute -right-10 -bottom-15 z-0 h-full w-1/2 opacity-10">
            <img
              src="/images/money-roll.png"
              className="h-full w-full object-contain grayscale-50"
              alt="money"
            />
          </div>
        </Card>

        <iframe
          src="https://ads-partners.coupang.com/widgets.html?id=892071&template=carousel&trackingCode=AF2621569&subId=&width=680&height=140&tsource="
          width="100%"
          height="80"
          referrerPolicy="unsafe-url"
          allow="browsing-topics"
          className="nb-shadow"
        />
        <LottoHistoryCheckCard />
      </div>
    </Screen>
  )
}

export default HomePage

'use client'

import { lottoExcelDownload, LottoExcelTarget } from '@/app/_utils'
import { Screen } from '@/components/layouts/screen'
import { BottomFixedArea } from '@/components/ui/bottom-fixed-area'
import {} from '@/components/ui/bottom-fixed-button'
import { Button } from '@/components/ui/button'

import { LottoMenu } from '../../_components/lotto-menu'

type ExcelPageTemplateProps = {
  name: string
  target: LottoExcelTarget
}
export const ExcelPageTemplate = ({ name, target }: ExcelPageTemplateProps) => {
  const handleClick = () => {
    // window.open(
    //   'https://link.coupang.com/a/cEWykR',
    //   '_blank',
    //   'noopener,noreferrer'
    // )

    setTimeout(() => {
      lottoExcelDownload(target, name.trim())
    }, 300)
  }

  return (
    <Screen
      className="relative"
      withSidePadding
      withBottomFixedButton
      header={{ title: '', action: <LottoMenu /> }}
    >
      <section className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">
          버튼 누르고 <br />{' '}
          <b className="bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text font-bold text-transparent">
            {name} 엑셀
          </b>{' '}
          파일 받아요
        </h1>
        <p className="text-sm text-neutral-500">
          로또 1회부터 최신 회차까지의 <br />
          {name} 정보를 엑셀로 정리해드려요
        </p>
      </section>

      <div className="absolute top-1/2 left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center px-5 pt-[82px]">
        <img
          src="/images/lotto-excel-robot.png"
          alt="로또 엑셀 로봇"
          className="w-[240px]"
        />
      </div>
      {/* <section
        className="fixed left-0 -mb-1 flex w-full items-center justify-center"
        style={{ bottom: BOTTOM_FIXED_BUTTON_HEIGHT }}
      >
        <p className="text-center text-[12px] text-neutral-500">
          쿠팡 파트너승 활동의 일환으로,
          <br /> 이에따른 일정액의 수수료를 제공받습니다.
        </p>
      </section> */}
      <BottomFixedArea>
        <Button onClick={handleClick}>엑셀 받기</Button>
      </BottomFixedArea>
    </Screen>
  )
}

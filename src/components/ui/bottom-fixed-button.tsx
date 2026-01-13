'use client'

import { MAX_MOBILE_SCREEN_WIDTH } from '@/config/constants'

import { Button } from './button'

export const BOTTOM_FIXED_BUTTON_HEIGHT = 86

export const BottomFixedButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick: () => void
}) => {
  return (
    <div
      className="bg-background fixed bottom-0 w-full p-4"
      style={{
        maxWidth: MAX_MOBILE_SCREEN_WIDTH,
        height: BOTTOM_FIXED_BUTTON_HEIGHT,
      }}
    >
      <Button onClick={onClick}>{children}</Button>
    </div>
  )
}

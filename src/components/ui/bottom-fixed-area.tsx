'use client'

import { MAX_MOBILE_SCREEN_WIDTH } from '@/config/constants'
import { cn } from '@/lib/utils'

export const BOTTOM_FIXED_BUTTON_HEIGHT = 80

type BottomFixedAreaProps = {
  children: React.ReactNode
  className?: string
}
export const BottomFixedArea = ({
  children,
  className,
}: BottomFixedAreaProps) => {
  return (
    <section
      className="fixed bottom-0 left-0 w-full"
      style={{
        height: BOTTOM_FIXED_BUTTON_HEIGHT,
      }}
    >
      <div
        className={cn('mx-auto p-4', className)}
        style={{
          maxWidth: MAX_MOBILE_SCREEN_WIDTH,
        }}
      >
        {children}
      </div>
    </section>
  )
}

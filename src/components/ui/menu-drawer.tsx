'use client'

import { X } from 'lucide-react'
import React from 'react'
import { Drawer } from 'vaul'

import { MAX_MOBILE_SCREEN_WIDTH } from '@/config/constants'
import { cn } from '@/lib/utils'

import { IconButton } from './icon-button'

type MenuDrawerProps = {
  className?: string
  children?: React.ReactNode
  open?: boolean
  maskClosable?: boolean
  hideCloseButton?: boolean
  onClose?(): void
}

const GUTTER = 16

export const MenuDrawer = ({
  className,
  open,
  children,
  onClose,
  maskClosable = true,
}: MenuDrawerProps) => {
  return (
    <Drawer.Root open={open} onClose={onClose} noBodyStyles direction="top">
      <Drawer.Portal>
        <Drawer.Overlay
          className="fixed inset-0 z-50 bg-black/30"
          onClick={maskClosable ? onClose : () => {}}
        />
        <Drawer.Content
          className={cn(
            'no-scrollbar nb-shadow fixed inset-x-0 z-50 mx-auto mt-24 overflow-hidden rounded bg-white outline-none',
            className
          )}
          style={{
            maxWidth: MAX_MOBILE_SCREEN_WIDTH - GUTTER * 2,
            width: `calc(100% - ${GUTTER * 2}px)`,
            height: `calc(100% - ${GUTTER * 2}px)`,
            bottom: GUTTER,
          }}
        >
          <div className="mx-auto w-full overflow-scroll pt-6">{children}</div>

          <div className="absolute top-4 right-4">
            <IconButton onClick={onClose}>
              <X />
            </IconButton>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

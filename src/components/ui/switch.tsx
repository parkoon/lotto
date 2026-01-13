'use client'

import * as SwitchPrimitive from '@radix-ui/react-switch'
import * as React from 'react'

import { cn } from '@/lib/utils'

type SwitchProps = {
  size?: 'sm' | 'md'
} & React.ComponentProps<typeof SwitchPrimitive.Root>

function Switch({ size = 'md', className, ...props }: SwitchProps) {
  const sizeClasses = {
    sm: {
      root: 'h-5 w-9',
      thumb:
        'h-3 w-3 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-1',
    },
    md: {
      root: 'h-6 w-12',
      thumb:
        'h-4 w-4 data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-1',
    },
  }

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'peer border-border bg-secondary-background focus-visible:ring-ring data-[state=checked]:bg-main data-[state=unchecked]:bg-secondary-background inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        sizeClasses[size].root,
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'border-border pointer-events-none block rounded-full border-2 bg-white ring-0 transition-transform',
          sizeClasses[size].thumb
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }

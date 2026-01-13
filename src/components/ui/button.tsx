'use client'

import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

export type ButtonProps = React.ComponentProps<typeof motion.button> & {
  size?: 'sm' | 'default'
  inline?: boolean
}
export const buttonWhileTapProps = {
  x: 2,
  y: 2,
  boxShadow: 'none',
  transition: { type: 'spring', stiffness: 400, damping: 20 },
} as const

export const Button = ({
  children,
  className,
  size = 'default',
  inline = false,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <motion.button
      whileTap={buttonWhileTapProps}
      className={cn(
        'flex items-center justify-center rounded border-1 border-black bg-[#FDC800] font-bold shadow-[2px_2px_0px_rgba(0,0,0,0.9)]',
        inline ? 'w-fit' : 'w-full',
        size === 'sm' ? 'h-[42px] px-3 text-sm' : 'h-[48px] px-4',
        disabled && 'opacity-50',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  )
}

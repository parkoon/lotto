'use client'

import { TbX } from 'react-icons/tb'

import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline'
  closable?: boolean
}

export const Badge = ({
  className,
  variant = 'default',
  children,
  closable,
  ...props
}: BadgeProps) => {
  const variantClasses = {
    default: 'border-gray-300 bg-white',
    secondary: 'border-blue-300 bg-blue-100',
    outline: 'border-gray-300 bg-transparent',
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded border px-2.5 py-0.5 text-xs font-semibold text-neutral-700',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
      {closable && <TbX size={16} className="-mr-1 cursor-pointer" />}
    </div>
  )
}

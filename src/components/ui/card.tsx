'use client'

import { cn } from '@/lib/utils'

type CardProps = {
  title?: string
  description?: string
} & React.HTMLAttributes<HTMLDivElement>

export const Card = ({
  className,
  children,
  title,
  description,
  ...props
}: CardProps) => {
  const hasHeader = title || description

  return (
    <div className={cn('card rounded bg-white p-4', className)} {...props}>
      {hasHeader && (
        <div className="mb-4 flex flex-col whitespace-pre-line">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-neutral-800">{description}</p>
        </div>
      )}

      {children}
    </div>
  )
}

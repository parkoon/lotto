import { cn } from '@/lib/utils'

type TagProps = {
  children: React.ReactNode
  className?: string
}

export const Tag = ({ children, className }: TagProps) => {
  return (
    <div
      className={cn(
        'nb-shadow bg-primary inline-block rounded px-3 py-1 text-sm font-semibold',
        className
      )}
    >
      {children}
    </div>
  )
}

import { cn } from '@/lib/utils'

type LottoBallProps = {
  size?: 'sm' | 'md'
  num?: number
  empty?: boolean
  emptyText?: React.ReactNode
  disabled?: boolean
  onClick?: () => void
}
export const LottoBall = ({
  num,
  empty,
  disabled,
  emptyText,
  onClick,
  size = 'md',
}: LottoBallProps) => {
  if (empty) {
    return (
      <span
        onClick={onClick}
        className={cn(
          'nb-shadow flex items-center justify-center rounded-full bg-neutral-50',
          size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'
        )}
      >
        {emptyText}
      </span>
    )
  }
  return (
    <span
      onClick={onClick}
      className={cn(
        'nb-shadow relative flex items-center justify-center rounded-full text-lg font-semibold',
        size === 'sm' ? 'h-8 w-8 text-sm' : 'h-10 w-10 text-lg',
        disabled && 'line-through opacity-10',
        getLottoColor(num!)
      )}
    >
      {num}
    </span>
  )
}

const getLottoColor = (num: number) => {
  if (num <= 10) return 'bg-[#ffe066] border-[#fbc400]'
  if (num <= 20) return 'bg-[#a5d8ff] border-[#69c8f2]'
  if (num <= 30) return 'bg-[#ffa8a8] border-[#ff7272]'
  if (num <= 40) return 'bg-[#dee2e6] border-[#aaa]'
  return 'bg-[#d8f5a2] border-[#b0d840]'
}

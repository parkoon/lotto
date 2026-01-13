import { cn } from '@/lib/utils'

type NotificationCardProps = {
  description: React.ReactNode
  className?: string
  action?: React.ReactNode
}
export const NotificationCard = ({
  description,
  action,
  className,
}: NotificationCardProps) => {
  return (
    <div className={cn('card flex items-center gap-2 p-4 pl-2', className)}>
      <img src="/images/bulb.png" alt="bulb" width={48} height={48} />
      <div className="flex-1 whitespace-pre-line">{description}</div>
      {action}
    </div>
  )
}

import { Tag } from '@/components/ui/tag'
import { cn } from '@/lib/utils'

type PageDescriptionProps = {
  tag?: string
  title: React.ReactNode
  description: React.ReactNode
  className?: string
  centered?: boolean
}
export const PageDescription = ({
  tag,
  title,
  description,
  className,
  centered,
}: PageDescriptionProps) => {
  return (
    <section
      className={cn(
        'mb-6 whitespace-pre-line',
        centered && 'text-center',
        className
      )}
    >
      {tag && <Tag className="mb-3">{tag}</Tag>}
      <h1 className="mb-1 text-2xl font-bold">{title}</h1>
      <p className="text-neutral-800">{description}</p>
    </section>
  )
}

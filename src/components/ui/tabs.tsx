import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@/lib/utils'

export type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root>
export const Tabs = ({ className, ...props }: TabsProps) => (
  <TabsPrimitive.Root className={className} {...props} />
)

export type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List>
export const TabsList = ({ className, ...props }: TabsListProps) => (
  <TabsPrimitive.List
    className={cn(
      'scrollbar-hide flex overflow-scroll border-b focus:outline-none',
      className
    )}
    {...props}
  />
)

export type TabsTriggerProps = React.ComponentProps<
  typeof TabsPrimitive.Trigger
>
export const TabsTrigger = ({ className, ...props }: TabsTriggerProps) => (
  <TabsPrimitive.Trigger
    className={cn(
      'flex h-10 flex-1 shrink-0 items-center justify-center border-b-1 border-transparent bg-white text-sm leading-none select-none focus:outline-none focus-visible:outline-none data-[state=active]:border-black data-[state=active]:font-semibold',
      className
    )}
    {...props}
  />
)

export type TabsContentProps = React.ComponentProps<
  typeof TabsPrimitive.Content
>
export const TabsContent = ({ className, ...props }: TabsContentProps) => (
  <TabsPrimitive.Content className={cn('pt-3', className)} {...props} />
)

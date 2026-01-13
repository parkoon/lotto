import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

type IconButtonProps = React.ComponentProps<typeof motion.button>
export const IconButton = ({
  children,
  className,
  ...props
}: IconButtonProps) => {
  return (
    <motion.button
      whileTap={{
        x: 2,
        y: 2,
        boxShadow: 'none',
        transition: { type: 'spring', stiffness: 400, damping: 20 },
      }}
      className={cn(
        'flex h-6 w-6 items-center justify-center rounded border-1 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.9)]',
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
}

'use client'

import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion'

import { MAX_MOBILE_SCREEN_WIDTH } from '@/config/constants'

type PageOverlayProps = {
  children: React.ReactNode
  footer?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  open?: boolean
} & HTMLMotionProps<'div'>

export const PageOverlay = ({
  children,
  footer,
  title,
  description,
  open = true,
  ...props
}: PageOverlayProps) => {
  const hasHeader = title || description
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="fixed top-0 left-1/2 z-[1300] h-full w-full -translate-x-1/2 bg-black/70 backdrop-blur-xs"
          style={{ maxWidth: MAX_MOBILE_SCREEN_WIDTH }}
          aria-hidden={!open}
          {...props}
        >
          {hasHeader && (
            <div className="mt-[72px] flex flex-col items-center justify-center gap-2 px-4 py-6 text-center whitespace-pre">
              <h2 className="text-3xl font-bold text-white">{title}</h2>
              <p className="text-xl text-neutral-200">{description}</p>
            </div>
          )}
          {children}
          {footer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="fixed bottom-0 left-1/2 w-full max-w-2xl -translate-x-1/2 px-6 py-4"
            >
              {footer}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

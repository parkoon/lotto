'use client'

import { Toaster as Sonner, ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position="top-center"
      style={{ fontFamily: 'inherit', overflowWrap: 'anywhere' }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'bg-background text-foreground  font-heading rounded text-[13px] flex items-center gap-2.5 p-4 w-[356px] [&:has(button)]:justify-between nb-shadow',
          description: 'font-base',
          actionButton:
            'font-base border-2 text-[12px] h-6 px-2 bg-main text-main-foreground border-border rounded-base shrink-0',
          cancelButton:
            'font-base border-2 text-[12px] h-6 px-2 bg-secondary-background text-foreground border-border rounded-base shrink-0',
          error: 'bg-red-400 text-white',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

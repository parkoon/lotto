import React from 'react'

import { cn } from '@/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  label?: React.ReactNode
  helpText?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, prefix, suffix, disabled, label, helpText, id, ...props },
    ref
  ) => {
    const reactId = React.useId()
    const inputId = id ?? reactId
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-1 block font-medium">
            {label}
          </label>
        )}
        <label
          className={cn(
            'relative flex h-[46px] items-center rounded border-1 bg-white px-2 transition',
            disabled
              ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
              : 'border-black',
            'focus-within:shadow-[2px_2px_0px_rgba(0,0,0,0.9)]',
            className
          )}
        >
          {prefix && <span className="mr-2 flex items-center">{prefix}</span>}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              'flex-1 bg-transparent py-1 outline-none',
              disabled && 'text-gray-400 placeholder:text-gray-300'
            )}
            {...props}
          />
          {suffix && <span className="ml-2 flex items-center">{suffix}</span>}
        </label>
        {helpText && (
          <div className="mt-1 text-sm text-neutral-600">{helpText}</div>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

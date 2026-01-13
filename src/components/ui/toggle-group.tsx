'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

import { cn } from '@/lib/utils'

type ToggleItem = {
  label: string
  value: string
}
type ToggleButtonProps = {
  value?: string
  onChange?: (value: string) => void
  items: ToggleItem[]
}
export const ToggleGroup = ({ items, value, onChange }: ToggleButtonProps) => {
  const [activeValue, setActiveValue] = useState(items[0].value)

  const _activeValue = value ?? activeValue
  const handleClick = (value: string) => {
    setActiveValue(value)
    onChange?.(value)
  }
  return (
    <div className="flex gap-1 py-2">
      {items.map(({ label, value }) => {
        const isActive = _activeValue === value
        return (
          <motion.button
            key={value}
            animate={isActive ? { x: 2, y: 2, boxShadow: 'none' } : {}}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className={cn(
              'card inline-flex border border-black px-3 py-1 text-sm font-bold',
              isActive ? 'bg-secondary text-white' : 'bg-white'
            )}
            onClick={() => handleClick(value)}
          >
            {label}
          </motion.button>
        )
      })}
    </div>
  )
}

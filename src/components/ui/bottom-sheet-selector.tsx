'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { TbCheck } from 'react-icons/tb'

import { cn } from '@/lib/utils'

import { BottomSheet } from './bottom-sheet'

type BottomSheetSelectorProps<T extends string> = {
  placeholder?: string
  value?: T
  onChange?: (value: T) => void
  items: {
    label: string
    value: T
  }[]
}
export const BottomSheetSelector = <T extends string>({
  value,
  onChange,
  items,
  placeholder = '선택해주세요',
}: BottomSheetSelectorProps<T>) => {
  const [selected, setSelected] = useState<T | null>(null)

  const _selected = value ?? selected
  const [isOpen, setIsOpen] = useState(false)
  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const handleChange = (value: T) => {
    setIsOpen(false)
    setSelected(value)
    onChange?.(value)
  }

  return (
    <div>
      <div
        className="relative flex h-[46px] items-center rounded border-1 bg-white px-2"
        onClick={handleClick}
      >
        <span
          className={cn(
            'text-sm',
            _selected ? 'text-neutral-900' : 'text-neutral-500'
          )}
        >
          {_selected
            ? items.find((item) => item.value === _selected)?.label
            : placeholder}
        </span>
      </div>

      <BottomSheet
        open={isOpen}
        onClose={() => setIsOpen(false)}
        maskClosable={true}
        hideCloseButton
      >
        <ul>
          {items.map((item) => (
            <SelectorItem
              key={item.value}
              selected={_selected === item.value}
              onClick={() => handleChange(item.value)}
            >
              {item.label}
            </SelectorItem>
          ))}
        </ul>
      </BottomSheet>
    </div>
  )
}

type SelectorItemProps = {
  children: React.ReactNode
  selected?: boolean
  onClick?: () => void
}
const SelectorItem = ({ children, selected, onClick }: SelectorItemProps) => {
  return (
    <motion.li
      whileTap={{ scale: 0.98 }}
      className="flex items-center justify-between gap-2 py-3"
      onClick={onClick}
    >
      {children}
      {selected && <TbCheck size={20} />}
    </motion.li>
  )
}

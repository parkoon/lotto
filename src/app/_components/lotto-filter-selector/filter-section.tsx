'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { ReactNode, useState } from 'react'
import { toast } from 'sonner'

import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

type FilterSectionProps = {
  title: string
  enabled: boolean
  onEnabledChange: (enabled: boolean) => void
  summary: string
  children: ReactNode
  defaultExpanded?: boolean
  className?: string
}

export const FilterSection = ({
  title,
  enabled,
  onEnabledChange,
  summary,
  children,
  defaultExpanded = false,
  className,
}: FilterSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  const handleToggle = () => {
    if (!enabled) {
      toast.info('필터를 활성화 해주세요')

      return
    }

    setIsExpanded(!isExpanded)
  }

  return (
    <div className={cn('nb-shadow rounded', className)}>
      {/* Header - 항상 표시 */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* 왼쪽: 타이틀과 상태 뱃지 */}
          <div className="flex items-center gap-2">
            <Switch
              size="sm"
              checked={enabled}
              onCheckedChange={onEnabledChange}
            />
            <h3
              className={cn(
                'font-semibold',
                enabled ? 'text-gray-900' : 'text-gray-400'
              )}
            >
              {title}
            </h3>
          </div>

          {/* 오른쪽: 스위치와 토글 버튼 */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggle}
              className="flex items-center gap-1 rounded py-1 pl-2 text-sm text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
            >
              {isExpanded ? (
                <>
                  <span>간략히 보기</span>
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  <span>자세히 보기</span>
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Summary - 접힌 상태에서만 표시 */}
        {!isExpanded && (
          <div className="mt-3 border-t border-gray-100 pt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">현재 설정</span>
              <span className="text-sm font-medium text-gray-900">
                {summary}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content - 펼쳐진 상태에서만 표시 */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
            className="overflow-hidden border-t border-gray-100"
          >
            <div className="p-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

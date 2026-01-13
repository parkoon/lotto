import React from 'react'

interface ProgressBarProps {
  value: number // 0~100
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  const percent = Math.round(value)
  return (
    <div className="relative h-5 w-full overflow-hidden rounded-full border-1 border-black bg-white shadow-[2px_2px_0px_rgba(0,0,0,0.7)]">
      {/* 진행 바 */}
      <div
        className="bg-secondary absolute top-0 left-0 h-full rounded-full transition-all duration-300"
        style={{ width: `${percent}%` }}
      />
      {/* 퍼센트 텍스트 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-semibold">{percent}%</span>
      </div>
    </div>
  )
}

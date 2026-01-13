import { motion } from 'framer-motion'

type SpeechBubbleProps = {
  text: string
  action?: React.ReactNode
  className?: string
}
export const SpeechBubble = ({ text, action }: SpeechBubbleProps) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 15,
        delay: 0.2,
      }}
    >
      <div className="nb-shadow relative w-fit max-w-[270px] rounded border border-gray-200 bg-white px-3 py-2 shadow-lg">
        <div className="flex gap-2">
          <p className="flex-1 text-sm font-medium break-keep text-gray-700">
            {text}
          </p>
          {action}
        </div>

        <svg
          width="20"
          height="10"
          className="absolute top-full left-1/2 -translate-x-1/2 rotate-180"
        >
          {/* 흰색 배경 삼각형 (stroke 없음) */}
          <polygon points="10,0 20,10 0,10" fill="white" stroke="none" />
          {/* 양쪽 변만 stroke */}
          <path d="M 10,0 L 0,10" fill="none" stroke="#000" strokeWidth="2" />
          <path d="M 10,0 L 20,10" fill="none" stroke="#000" strokeWidth="2" />
        </svg>
      </div>
    </motion.div>
  )
}

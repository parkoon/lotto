import { motion } from 'framer-motion'
import { Check, Link } from 'lucide-react'
import React, { useState } from 'react'

export type ShareCopyProps = {
  url?: string
}

export const ShareCopy: React.FC<ShareCopyProps> = ({ url }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url || window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      alert('복사에 실패했습니다.')
    }
  }

  return (
    <motion.button
      type="button"
      onClick={handleCopy}
      className="nb-shadow flex h-13 w-13 items-center justify-center overflow-hidden rounded-full bg-white"
    >
      {copied ? <Check /> : <Link />}
    </motion.button>
  )
}

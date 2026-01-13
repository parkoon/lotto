'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  TbChartAreaLine,
  TbDownload,
  TbHistory,
  TbHome,
  TbMenu2,
  TbSettings,
  TbStar,
  TbX,
} from 'react-icons/tb'

import { buttonWhileTapProps } from '@/components/ui/button'
import { Href } from '@/types'

type MenuItem = {
  icon: React.ReactNode
  label: string
  href: Href
  badge?: 'new' | 'hot'
}

type MenuSection = {
  title: string
  items: MenuItem[]
}

const menuSections: MenuSection[] = [
  {
    title: '',
    items: [
      {
        icon: <TbHome size={20} />,
        label: '홈',
        href: '/',
      },
    ],
  },
  {
    title: '번호 생성',
    items: [
      //   {
      //     icon: <TbCircleNumber7 size={20} />,
      //     label: 'AI 생성',
      //     href: '/lotto/generator/ai',
      //     badge: 'new',
      //   },
      {
        icon: <TbStar size={20} />,
        label: '전략 생성',
        href: '/generator/strategy',
        badge: 'hot',
      },
      {
        icon: <TbSettings size={20} />,
        label: '커스텀 생성',
        href: '/generator/custom',
      },
    ],
  },
  {
    title: '통계 및 분석',
    items: [
      {
        icon: <TbChartAreaLine size={20} />,
        label: '번호 통계',
        href: '/stats/number',
        badge: 'hot',
      },
      {
        icon: <TbHistory size={20} />,
        label: '내 히스토리',
        href: '/stats/my-history',
      },
    ],
  },
  {
    title: '엑셀 다운로드',
    items: [
      {
        icon: <TbDownload size={20} />,
        label: '최신 엑셀',
        href: '/excel/history',
      },
      {
        icon: <TbChartAreaLine size={20} />,
        label: 'AC값 엑셀',
        href: '/excel/stats/ac',
        badge: 'hot',
      },
      {
        icon: <TbChartAreaLine size={20} />,
        label: '핫수/콜드수 엑셀',
        href: '/excel/stats/hot-cold',
      },
      {
        icon: <TbChartAreaLine size={20} />,
        label: '홀짝 비율 엑셀',
        href: '/excel/stats/add-even',
      },
      {
        icon: <TbChartAreaLine size={20} />,
        label: '당첨 순위 엑셀',
        href: '/excel/stats/number-rank',
        badge: 'new',
      },
    ],
  },
]

// Framer Motion 애니메이션 variants
const drawerVariants = {
  closed: {
    x: '-100%',
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 30,
    },
  },
  open: {
    x: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 30,
    },
  },
}

const backdropVariants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
}

const sectionVariants = {
  closed: {
    opacity: 0,
  },
  open: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.1 + 0.3,
      duration: 0.3,
    },
  }),
}

const Badge = ({ badge }: { badge: MenuItem['badge'] }) => {
  if (!badge) return null

  if (badge === 'new') {
    return (
      <span className="rounded-full bg-blue-500 px-2 py-0.5 text-xs font-medium text-white">
        new
      </span>
    )
  }

  if (badge === 'hot') {
    return (
      <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
        hot
      </span>
    )
  }

  return null
}

export const LottoMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleMenuItemClick = (href: Href) => {
    setIsOpen(false)
    router.push(href)
  }

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="nb-shadow flex items-center justify-center rounded bg-white p-1"
        aria-label="메뉴 열기"
        whileTap={buttonWhileTapProps}
      >
        <TbMenu2 size={20} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 h-dvh bg-black/20"
            />

            <motion.nav
              variants={drawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 left-0 z-50 h-dvh w-80 bg-white shadow-lg"
            >
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                  <h2 className="text-lg font-semibold text-gray-900">
                    로또랩
                  </h2>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none"
                    aria-label="메뉴 닫기"
                  >
                    <TbX size={20} />
                  </button>
                </div>

                {/* Menu Sections */}
                <div className="flex-1 overflow-y-auto">
                  {menuSections.map((section, sectionIndex) => (
                    <motion.div
                      key={section.title || 'main'}
                      custom={sectionIndex}
                      variants={sectionVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className="px-3 py-2"
                    >
                      {/* Section Title */}
                      {section.title && (
                        <h3 className="mb-2 px-3 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                          {section.title}
                        </h3>
                      )}

                      {/* Menu Items */}
                      <div className="space-y-1">
                        {section.items.map((item) => (
                          <button
                            key={item.href}
                            onClick={() => handleMenuItemClick(item.href)}
                            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-inset"
                          >
                            <div className="flex items-center gap-3">
                              <div className="text-gray-600">{item.icon}</div>
                              <span className="text-sm font-medium text-gray-900">
                                {item.label}
                              </span>
                            </div>

                            <Badge badge={item.badge} />
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 p-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">© 2025 로또랩</p>
                  </div>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

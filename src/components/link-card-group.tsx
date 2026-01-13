'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { TbChevronRight } from 'react-icons/tb'

type LinkItem = {
  href: __next_route_internal_types__.RouteImpl<string>
  title: string
  description: string
}
type LinkCardProps = {
  items: LinkItem[]
}
export const LinkCardGroup = ({ items }: LinkCardProps) => {
  return (
    <div className="nb-shadow flex flex-col rounded bg-white">
      {items.map(({ href, title, description }, index) => (
        <motion.button
          key={index}
          className="w-full"
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href={href}
            className="flex items-center justify-start gap-2 p-4 text-left break-keep"
          >
            <div className="flex flex-1 flex-col items-start">
              <h4 className="font-semibold">{title}</h4>
              <span className="text-xs text-neutral-700">{description}</span>
            </div>

            <TbChevronRight color="#a9a7a7" size={20} />
          </Link>
        </motion.button>
      ))}
    </div>
  )
}

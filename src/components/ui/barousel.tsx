'use client'

import { EmblaCarouselType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

const DEFAULT_AUTO_PLAY_DELAY = 3200

type BarouselItem = {
  title: string
  description: string
  onClick?: () => void
  imageUrl?: string
  backgroundColor?: string
}

export type BarouselProps = {
  items: BarouselItem[]
  className?: string
}

export const Barousel = ({ items, className }: BarouselProps) => {
  const plugins = [
    Autoplay({ playOnInit: true, delay: DEFAULT_AUTO_PLAY_DELAY }),
  ]

  const [carouselRef, api] = useEmblaCarousel({ loop: true }, plugins)

  const [selectedIndex, setSelectedIndex] = useState(1)

  const onSelect = useCallback((api: EmblaCarouselType) => {
    if (!api) {
      return
    }

    setSelectedIndex(api.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!api) return

    onSelect(api)
    api.on('select', onSelect)

    return () => {
      api.off('select', onSelect)
    }
  }, [api, onSelect])

  return (
    <section
      className={cn(
        'nb-shadow relative w-full overflow-hidden rounded',
        className
      )}
    >
      <div className="overflow-hidden" ref={carouselRef}>
        <div className="flex">
          {items.map((item, index) => (
            <div
              key={index}
              role="button"
              className="shrink-0 grow-0 basis-full bg-white px-4 py-3"
              style={{ backgroundColor: item.backgroundColor }}
              onClick={item.onClick}
            >
              <article className="flex flex-col">
                <span className="text-sm font-semibold">{item.title}</span>
                <p className="text-xs text-neutral-600">{item.description}</p>
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-1 bottom-1 rounded bg-[rgba(0,0,0,0.2)] px-2 py-0.5 text-[11px]">
        <span className="text-white">{selectedIndex + 1}</span>
        <span className="text-white opacity-50"> / {items.length}</span>
      </div>
    </section>
  )
}

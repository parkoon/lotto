'use client'

import Lottie, { AnimationItem } from 'lottie-web'
import {
  forwardRef,
  Suspense,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

export type LottieRef = {
  goToAndStop: (value: number, isFrame?: boolean) => void
  play: () => void
  pause: () => void
  stop: () => void
}

type LottieProps<T extends Record<string, unknown>> = {
  /**
   * name 을 React Query 의 queryKey 로 사용합니다.
   * name 이 없을 시, 캐시된 다른 로띠가 사용될 수 있습니다.
   */
  name: string
  getAnimationData: () => Promise<T>
  height: number | string
  width: number | string
  onComplete?: () => void
} & Partial<Pick<AnimationItem, 'autoplay' | 'loop'>>

export const LottieContainer = forwardRef<
  LottieRef,
  LottieProps<Record<string, unknown>>
>(function LazyLottie<T extends Record<string, unknown>>(
  {
    name,
    height,
    width,
    loop,
    autoplay = true,
    getAnimationData,
    onComplete,
  }: LottieProps<T>,
  ref: React.ForwardedRef<LottieRef>
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lottieRef = useRef<AnimationItem | null>(null)
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 애니메이션 데이터 로드
  useEffect(() => {
    if (typeof window === 'undefined') return

    const loadAnimationData = async () => {
      try {
        setIsLoading(true)
        const animationData = await getAnimationData()
        setData(animationData)
      } catch (error) {
        console.error('Failed to load animation data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadAnimationData()
  }, [getAnimationData])

  useEffect(() => {
    if (!data || !containerRef.current) return

    const lottie = Lottie.loadAnimation({
      name,
      container: containerRef.current,
      renderer: 'svg',
      animationData: data,
      autoplay,
      loop,
    })

    lottieRef.current = lottie

    if (onComplete) {
      lottie.addEventListener('complete', onComplete)
    }

    return () => {
      if (onComplete) {
        lottie.removeEventListener('complete', onComplete)
      }
      lottieRef.current = null
      Lottie.destroy(name)
    }
  }, [data, autoplay, loop, name, onComplete])

  useImperativeHandle(
    ref,
    () => ({
      goToAndStop: (value: number, isFrame?: boolean) => {
        lottieRef.current?.goToAndStop(value, isFrame)
      },
      play: () => {
        lottieRef.current?.play()
      },
      pause: () => {
        lottieRef.current?.pause()
      },
      stop: () => {
        lottieRef.current?.stop()
      },
    }),
    []
  )

  if (isLoading || !data) {
    return <div style={{ height, width }} />
  }

  return (
    <Suspense fallback={<div style={{ height, width }} />}>
      <div ref={containerRef} style={{ height, width }} />
    </Suspense>
  )
})

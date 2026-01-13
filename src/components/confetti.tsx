import { LottieContainer } from './lottie-container'

export const Confetti = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -z-1 h-full w-full -translate-x-1/2 -translate-y-1/2">
      <LottieContainer
        loop={false}
        name="lotto-auto"
        getAnimationData={() => import('@/assets/confetti.json')}
        height="100%"
        width="100%"
      />
    </div>
  )
}

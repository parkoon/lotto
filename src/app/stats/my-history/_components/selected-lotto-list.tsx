import { LottoBall } from '@/app/_components/lotto-ball'

type SelectedLottoListProps = {
  items: number[]
}
export const SelectedLottoList = ({ items }: SelectedLottoListProps) => {
  // 6자리 배열로 변환 (입력 안 된 곳은 undefined)
  const balls = Array.from({ length: 6 }).map((_, i) => items[i])

  return (
    <div className="mb-8 flex h-12 items-center justify-center gap-2">
      {balls.map((num, idx) =>
        num ? <LottoBall key={idx} num={num} /> : <LottoBall key={idx} empty />
      )}
    </div>
  )
}

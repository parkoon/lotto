'use client'

import { useRouter } from 'next/navigation'

import { Card } from '@/components/ui/card'

import { LottoHistoryCheckForm } from './lotto-history-check-form'

export const LottoHistoryCheckCard = () => {
  const router = useRouter()

  const handleConfirm = (numbers: number[]) => {
    router.push(`/stats/my-history?numbers=${numbers.join(',')}`)
  }

  return (
    <Card title={'내가 이 번호로 샀다면,\n당첨됐을까?'}>
      <LottoHistoryCheckForm onConfirm={handleConfirm} />
    </Card>
  )
}

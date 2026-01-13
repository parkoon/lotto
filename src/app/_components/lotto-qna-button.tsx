'use client'

import { useState } from 'react'
import { TbQuestionMark } from 'react-icons/tb'

import { BottomSheet } from '@/components/ui/bottom-sheet'
import Segmented from '@/components/ui/segmented'

export const LottoQnaButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<'ai'>('ai')

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <TbQuestionMark size={24} />
      </button>
      <BottomSheet open={isOpen} onClose={() => setIsOpen(false)}>
        <Segmented
          options={[{ label: 'AI 자동 생성', value: 'ai' }]}
          value={selectedOption}
          onChange={(value) => setSelectedOption(value as 'ai')}
          className="mb-2"
        />
        <div>
          <div>
            <p className="mb-4 font-normal">
              로또는 완전한 확률 게임입니다. <br /> AI 분석은 과거 데이터를
              바탕으로 한 것이며, 당첨을 보장하지 않습니다.
            </p>
            <h3 className="mb-2 font-semibold text-gray-800">
              AI가 분석하는 항목들
            </h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• 과거 당첨 번호 패턴 분석</li>
              <li>• 인기번호 출현 빈도 분석</li>
              <li>• 홀짝 균형 최적화</li>
              <li>• 페어 조합 확률 계산</li>
              <li>• 연속번호 패턴 분석</li>
            </ul>
          </div>
        </div>
      </BottomSheet>
    </>
  )
}

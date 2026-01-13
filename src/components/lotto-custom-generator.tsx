'use client'

import { motion } from 'framer-motion'
import { Settings, Shuffle, TrendingUp, Zap } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

type ConditionData = {
  id: string
  name: string
  description: string
  weight: number
  data: number[] | number[][] | { odd: number; even: number } | number[]
  lastUpdated: string
}

type CustomGeneratorProps = {
  conditions: ConditionData[]
  onGenerate: (numbers: number[], orderedConditions: string[]) => void
  isGenerating: boolean
}

// 아이콘 매핑
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  'popular-numbers': TrendingUp,
  'pair-combinations': Zap,
  'odd-even-balance': Settings,
  'section-distribution': Settings,
  'recent-hot': TrendingUp,
}

/**
 * 조건 선택 카드 컴포넌트
 */
function ConditionCard({
  condition,
  isActive,
  onToggle,
}: {
  condition: ConditionData
  isActive: boolean
  onToggle: () => void
}) {
  const Icon = ICON_MAP[condition.id] || Settings

  return (
    <motion.div
      className={`rounded-lg border hover:shadow-md ${
        isActive ? 'bg-blue-50 ring-2 ring-blue-500' : 'bg-white'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      animate={{
        backgroundColor: isActive ? '#eff6ff' : '#ffffff',
        borderColor: isActive ? '#3b82f6' : '#e5e7eb',
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
      }}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* 아이콘과 내용 */}
          <div className="flex flex-1 items-start gap-3">
            <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-500" />
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-gray-900">{condition.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">
                {condition.description}
              </p>
            </div>
          </div>

          {/* 체크박스 */}
          <div className="flex-shrink-0">
            <input
              type="checkbox"
              checked={isActive}
              onChange={onToggle}
              className="h-5 w-5 rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/**
 * 가중치 바 컴포넌트
 */
function WeightBar({
  activeConditions,
  weights,
  onWeightChange,
}: {
  activeConditions: ConditionData[]
  weights: Record<string, number>
  onWeightChange: (weights: Record<string, number>) => void
}) {
  const barRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState<number | null>(null)
  const [initialWeights, setInitialWeights] = useState<Record<string, number>>(
    {}
  )

  // 색상 배열
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
  ]

  const handlePointerDown = (
    e: React.MouseEvent | React.TouchEvent,
    index: number
  ) => {
    if (index >= activeConditions.length - 1) return // 마지막 조건은 드래그 불가

    setIsDragging(index)
    setInitialWeights({ ...weights })
    e.preventDefault()
  }

  const handlePointerMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (isDragging === null || !barRef.current) return

      const barRect = barRef.current.getBoundingClientRect()
      const barWidth = barRect.width

      // 마우스 또는 터치 좌표 가져오기
      const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX
      if (clientX === undefined) return

      const currentX = clientX - barRect.left // 바 시작점 기준 현재 포인터 위치
      const currentPercent = Math.max(
        0,
        Math.min(100, (currentX / barWidth) * 100)
      )

      const newWeights = { ...initialWeights }
      const conditionIds = activeConditions.map((c) => c.id)

      // 왼쪽 조건들의 총 가중치 계산 (드래그하는 경계선까지)
      let leftTotalWeight = 0
      for (let i = 0; i <= isDragging; i++) {
        leftTotalWeight += initialWeights[conditionIds[i]]
      }

      // 새로운 경계선 위치에 따른 가중치 재분배
      const newLeftTotalWeight = currentPercent
      const weightDifference = newLeftTotalWeight - leftTotalWeight

      // 현재 드래그하는 경계선의 좌우 조건들의 가중치 조절
      const leftConditionId = conditionIds[isDragging]
      const rightConditionId = conditionIds[isDragging + 1]

      const leftWeight = initialWeights[leftConditionId] + weightDifference
      const rightWeight = initialWeights[rightConditionId] - weightDifference

      // 최소 5% 보장하면서 조정
      if (leftWeight >= 5 && rightWeight >= 5) {
        newWeights[leftConditionId] = leftWeight
        newWeights[rightConditionId] = rightWeight
        onWeightChange(newWeights)
      }
    },
    [isDragging, initialWeights, activeConditions, onWeightChange]
  )

  const handlePointerUp = useCallback(() => {
    setIsDragging(null)
    setInitialWeights({})
  }, [])

  useEffect(() => {
    if (isDragging !== null) {
      // 마우스 이벤트 등록
      document.addEventListener('mousemove', handlePointerMove)
      document.addEventListener('mouseup', handlePointerUp)

      // 터치 이벤트 등록
      document.addEventListener('touchmove', handlePointerMove, {
        passive: false,
      })
      document.addEventListener('touchend', handlePointerUp)

      return () => {
        document.removeEventListener('mousemove', handlePointerMove)
        document.removeEventListener('mouseup', handlePointerUp)
        document.removeEventListener('touchmove', handlePointerMove)
        document.removeEventListener('touchend', handlePointerUp)
      }
    }
  }, [isDragging, handlePointerMove, handlePointerUp])

  if (activeConditions.length === 0) {
    return (
      <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
        <p className="text-gray-500">조건을 선택해주세요</p>
      </div>
    )
  }

  let accumulatedWidth = 0

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <h3 className="font-semibold text-gray-900">가중치 설정</h3>

      {/* 가중치 바 */}
      <motion.div
        ref={barRef}
        className="relative h-12 overflow-hidden rounded-lg border bg-gray-100"
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {activeConditions.map((condition, index) => {
          const width = weights[condition.id] || 0
          const left = accumulatedWidth
          accumulatedWidth += width

          return (
            <div key={condition.id}>
              {/* 조건 바 */}
              <motion.div
                className={`absolute top-0 h-full ${colors[index % colors.length]}`}
                initial={{ left: `${left}%`, width: `${width}%` }}
                animate={{
                  left: `${left}%`,
                  width: `${width}%`,
                }}
                transition={{
                  type: isDragging !== null ? 'tween' : 'spring',
                  duration: isDragging !== null ? 0 : 0.3,
                  stiffness: 300,
                  damping: 30,
                }}
              >
                <div className="flex h-full items-center justify-center px-2">
                  <span className="truncate text-xs font-medium text-white">
                    {condition.name}
                  </span>
                </div>
              </motion.div>

              {/* 드래그 핸들 (마지막 조건 제외) */}
              {index < activeConditions.length - 1 && (
                <motion.div
                  className="absolute top-0 z-10 h-full w-2 cursor-col-resize border-r border-l border-gray-300 bg-white"
                  initial={{ left: `${accumulatedWidth - 1}%`, opacity: 0 }}
                  animate={{ left: `${accumulatedWidth - 1}%` }}
                  whileHover={{ opacity: 1 }}
                  transition={{
                    type: isDragging !== null ? 'tween' : 'spring',
                    duration: isDragging !== null ? 0 : 0.3,
                    stiffness: 300,
                    damping: 30,
                    opacity: { duration: 0.2 },
                  }}
                  onMouseDown={(e) => handlePointerDown(e, index)}
                  onTouchStart={(e) => handlePointerDown(e, index)}
                >
                  <motion.div
                    className="h-full w-full bg-gray-400"
                    whileHover={{ backgroundColor: '#4B5563' }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              )}
            </div>
          )
        })}
      </motion.div>

      {/* 가중치 수치 표시 */}
      <motion.div
        className="grid grid-cols-2 gap-2 sm:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        {activeConditions.map((condition, index) => (
          <motion.div
            key={condition.id}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <motion.div
              className={`h-3 w-3 rounded-full ${colors[index % colors.length]}`}
              whileHover={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            />
            <span className="text-sm text-gray-700">{condition.name}</span>
            <motion.span
              className="text-sm font-medium text-gray-900"
              key={weights[condition.id]} // 값이 변경될 때마다 애니메이션
              initial={{ scale: 1.2, color: '#3b82f6' }}
              animate={{ scale: 1, color: '#111827' }}
              transition={{ duration: 0.3 }}
            >
              {Math.round(weights[condition.id] || 0)}%
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default function LottoCustomGenerator({
  conditions,
  onGenerate,
  isGenerating,
}: CustomGeneratorProps) {
  const [activeConditions, setActiveConditions] = useState<string[]>([
    'popular-numbers',
    'odd-even-balance',
  ])
  const [weights, setWeights] = useState<Record<string, number>>({})

  // 활성 조건이 변경될 때 가중치를 균등하게 재분배
  useEffect(() => {
    if (activeConditions.length > 0) {
      const equalWeight = 100 / activeConditions.length
      const newWeights: Record<string, number> = {}
      activeConditions.forEach((conditionId) => {
        newWeights[conditionId] = equalWeight
      })
      setWeights(newWeights)
    } else {
      setWeights({})
    }
  }, [activeConditions])

  const handleConditionToggle = (conditionId: string) => {
    setActiveConditions((prev) => {
      if (prev.includes(conditionId)) {
        return prev.filter((id) => id !== conditionId)
      } else {
        return [...prev, conditionId]
      }
    })
  }

  const handleWeightChange = (newWeights: Record<string, number>) => {
    setWeights(newWeights)
  }

  const handleGenerate = () => {
    if (activeConditions.length === 0) {
      alert('최소 하나의 조건을 선택해주세요.')
      return
    }

    const activeConditionData = conditions.filter((c) =>
      activeConditions.includes(c.id)
    )
    const numbers = generateCustomLottoNumbers(activeConditionData, weights)
    onGenerate(numbers, activeConditions)
  }

  const activeConditionData = conditions.filter((c) =>
    activeConditions.includes(c.id)
  )

  return (
    <div className="space-y-6">
      {/* 조건 선택 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">조건 선택</h2>
        <div className="grid gap-3">
          {conditions.map((condition) => (
            <ConditionCard
              key={condition.id}
              condition={condition}
              isActive={activeConditions.includes(condition.id)}
              onToggle={() => handleConditionToggle(condition.id)}
            />
          ))}
        </div>
      </div>

      {/* 가중치 설정 바 */}
      {activeConditions.length > 0 && (
        <WeightBar
          activeConditions={activeConditionData}
          weights={weights}
          onWeightChange={handleWeightChange}
        />
      )}

      {/* 생성 버튼 */}
      <motion.button
        onClick={handleGenerate}
        disabled={isGenerating || activeConditions.length === 0}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-white disabled:bg-gray-400"
        whileHover={{
          scale: 1.02,
          backgroundColor: '#1d4ed8',
        }}
        whileTap={{ scale: 0.98 }}
        animate={{
          backgroundColor: isGenerating ? '#9ca3af' : '#2563eb',
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
        }}
      >
        <motion.div
          animate={{ rotate: isGenerating ? 360 : 0 }}
          transition={{
            duration: isGenerating ? 1 : 0,
            repeat: isGenerating ? Infinity : 0,
            ease: 'linear',
          }}
        >
          <Shuffle className="h-5 w-5" />
        </motion.div>
        {isGenerating ? '생성 중...' : '번호 생성'}
      </motion.button>

      {/* 선택된 조건 요약 */}
      {activeConditions.length > 0 && (
        <div className="rounded-lg bg-gray-50 p-4">
          <h3 className="mb-2 font-medium text-gray-900">선택된 조건</h3>
          <div className="space-y-1">
            {activeConditionData.map((condition) => (
              <div key={condition.id} className="flex justify-between text-sm">
                <span className="text-gray-700">{condition.name}</span>
                <span className="font-medium text-gray-900">
                  {Math.round(weights[condition.id] || 0)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// 가중치 기반 로또 번호 생성 함수
function generateCustomLottoNumbers(
  activeConditions: ConditionData[],
  weights: Record<string, number>
): number[] {
  const numberScores: Record<number, number> = {}

  // 1-45 모든 번호 초기화
  for (let i = 1; i <= 45; i++) {
    numberScores[i] = 0
  }

  // 각 조건별로 점수 계산
  activeConditions.forEach((condition) => {
    const weight = (weights[condition.id] || 0) / 100

    switch (condition.id) {
      case 'popular-numbers':
        if (Array.isArray(condition.data)) {
          const popularNumbers = condition.data as number[]
          popularNumbers.forEach((num, index) => {
            // 상위 번호일수록 높은 점수
            const score =
              (popularNumbers.length - index) / popularNumbers.length
            numberScores[num] += score * weight
          })
        }
        break

      case 'odd-even-balance':
        // 홀짝 균형을 위해 홀수/짝수에 적절한 점수 부여
        for (let i = 1; i <= 45; i++) {
          numberScores[i] += weight * 0.5 // 기본 점수
        }
        break

      case 'section-distribution':
        // 구간별 분산을 위해 각 구간에서 번호 선택 장려
        for (let i = 1; i <= 45; i++) {
          const section = Math.floor((i - 1) / 9) // 0-4 구간
          numberScores[i] += weight * (1 - section * 0.1) // 앞 구간에 약간 더 높은 점수
        }
        break

      case 'pair-combinations':
        if (
          Array.isArray(condition.data) &&
          condition.data.length > 0 &&
          Array.isArray(condition.data[0])
        ) {
          const pairs = condition.data as number[][]
          pairs.forEach((pair, index) => {
            const score = (pairs.length - index) / pairs.length
            pair.forEach((num) => {
              numberScores[num] += score * weight
            })
          })
        }
        break

      case 'recent-hot':
        if (Array.isArray(condition.data)) {
          const recentNumbers = condition.data as number[]
          recentNumbers.forEach((num, index) => {
            const score = (recentNumbers.length - index) / recentNumbers.length
            numberScores[num] += score * weight
          })
        }
        break
    }
  })

  // 점수 기반으로 확률적 선택
  const selectedNumbers: number[] = []
  const availableNumbers = Object.keys(numberScores).map(Number)

  for (let i = 0; i < 6; i++) {
    if (availableNumbers.length === 0) break

    // 점수에 비례한 확률로 선택
    const totalScore = availableNumbers.reduce(
      (sum, num) => sum + Math.max(numberScores[num], 0.1),
      0
    )
    let random = Math.random() * totalScore

    let selectedNumber = availableNumbers[0]
    for (const num of availableNumbers) {
      random -= Math.max(numberScores[num], 0.1)
      if (random <= 0) {
        selectedNumber = num
        break
      }
    }

    selectedNumbers.push(selectedNumber)
    availableNumbers.splice(availableNumbers.indexOf(selectedNumber), 1)
    delete numberScores[selectedNumber]
  }

  return selectedNumbers.sort((a, b) => a - b)
}

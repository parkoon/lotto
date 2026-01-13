import React from 'react'

interface LottoHistoryCardProps {
  round: number // 회차 번호
  date: string // 추첨일
  winningNumbers: number[] // 당첨 번호 6개 + 보너스(마지막)
  myNumbers: number[] // 사용자가 선택한 번호 6개
  matchedNumbers: number[] // 맞춘 번호
  rank: number | null // 등수 (1~5등, null은 미당첨)
  prize: number | null // 당첨금 (null은 미당첨)
  onDetail?: () => void // 상세 정보 콜백
}

// 네오브루탈리즘 스타일의 간단한 카드 UI
const LottoHistoryCard: React.FC<LottoHistoryCardProps> = ({
  round,
  date,
  winningNumbers,
  myNumbers,
  matchedNumbers,
  rank,
  prize,
  onDetail,
}) => {
  // 보너스 번호 분리
  const mainNumbers = winningNumbers.slice(0, 6)
  const bonusNumber = winningNumbers[6]

  // 등수 텍스트
  const rankText = rank ? `${rank}등` : '미당첨'
  // 당첨금 텍스트
  const prizeText = prize ? `${prize.toLocaleString()}원` : '-'

  return (
    <div
      style={{
        border: '3px solid #222',
        borderRadius: 16,
        boxShadow: '4px 4px 0 #222',
        background: '#fffbe7',
        padding: 20,
        marginBottom: 20,
        maxWidth: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 18 }}>제 {round}회</span>
        <span style={{ color: '#888', fontSize: 14 }}>{date}</span>
      </div>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>당첨 번호</div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {mainNumbers.map((num) => (
            <span
              key={num}
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: '#fff',
                border: '2px solid #222',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              {num}
            </span>
          ))}
          <span style={{ margin: '0 4px', fontWeight: 700 }}>+</span>
          <span
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: '#ffe066',
              border: '2px solid #222',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            {bonusNumber}
          </span>
        </div>
      </div>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>내 번호</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {myNumbers.map((num) => {
            const isMatched = matchedNumbers.includes(num)
            return (
              <span
                key={num}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: isMatched ? '#b2f2bb' : '#fff',
                  border: '2px solid #222',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 16,
                  color: isMatched ? '#1864ab' : '#222',
                  boxShadow: isMatched ? '2px 2px 0 #1864ab' : undefined,
                  transition: 'background 0.2s',
                }}
              >
                {num}
              </span>
            )
          })}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <span style={{ fontWeight: 700, fontSize: 16 }}>{rankText}</span>
          <span style={{ marginLeft: 8, color: '#888', fontSize: 15 }}>
            {prizeText}
          </span>
        </div>
        {onDetail && (
          <button
            onClick={onDetail}
            style={{
              border: '2px solid #222',
              background: '#fff',
              borderRadius: 8,
              padding: '4px 12px',
              fontWeight: 600,
              fontSize: 15,
              boxShadow: '2px 2px 0 #222',
              cursor: 'pointer',
            }}
          >
            상세 보기
          </button>
        )}
      </div>
    </div>
  )
}

export default LottoHistoryCard

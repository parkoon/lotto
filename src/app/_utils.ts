export const getLottoColor = (num: number) => {
  if (num <= 10) return '#ffe066'
  if (num <= 20) return '#a5d8ff'
  if (num <= 30) return '#ffa8a8'
  if (num <= 40) return '#dee2e6'
  return '#d8f5a2'
}

export const getLottoRankColor = (rank: number) => {
  if (rank === 1) return '#4f46e5'
  if (rank === 2) return '#dc2626'
  if (rank === 3) return '#16a34a'
  if (rank === 4) return '#0891b2'
  return '#7c3aed'
}

/**
 * 오늘 날짜를 YYYYMMDD 형식으로 반환
 */
const getTodayString = (): string => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}${month}${day}`
}

export type LottoExcelTarget =
  | 'lotto-data'
  | 'lotto-odd-even-ratio'
  | 'lotto-number-ranking'
  | 'lotto-hot-cold'
  | 'lotto-ac-value'
/**
 * 로또 엑셀 파일 다운로드
 * @param filename - 파일명 (예: 'lotto-data')
 */
export const lottoExcelDownload = (
  target: LottoExcelTarget,
  filename: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const dateString = getTodayString()
      const downloadFileName = `${filename}_${dateString}.xlsx`
      const filePath = `/lotto/${target}.xlsx`

      // 다운로드 링크 생성
      const link = document.createElement('a')
      link.href = filePath
      link.download = downloadFileName
      link.style.display = 'none'

      // 문서에 추가하고 클릭
      document.body.appendChild(link)
      link.click()

      // 정리
      document.body.removeChild(link)

      // 다운로드 통계 (optional)
      console.log(`엑셀 파일 다운로드 완료: ${downloadFileName}`)
      resolve()
    } catch (error) {
      console.error('다운로드 중 오류 발생:', error)
      reject(error)
    }
  })
}

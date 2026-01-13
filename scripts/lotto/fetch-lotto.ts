import axios from 'axios'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import fs from 'fs'
import path from 'path'

dayjs.extend(customParseFormat)

type LottoDrawFull = {
  round: number
  date: string
  numbers: number[]
  bonus: number
  totalSales: number
  firstPrizeAmount: number
  firstWinners: number
  prizes: {
    rank: number
    winners: number
    amount: number
  }[]
}

type ApiLottoItem = {
  ltEpsd: number
  tm1WnNo: number
  tm2WnNo: number
  tm3WnNo: number
  tm4WnNo: number
  tm5WnNo: number
  tm6WnNo: number
  bnsWnNo: number
  ltRflYmd: string
  rnk1WnNope: number
  rnk1WnAmt: number
  rnk2WnNope: number
  rnk2WnAmt: number
  rnk3WnNope: number
  rnk3WnAmt: number
  rnk4WnNope: number
  rnk4WnAmt: number
  rnk5WnNope: number
  rnk5WnAmt: number
  wholEpsdSumNtslAmt: number
}

const CACHE_PATH = path.join(process.cwd(), '.cache', 'cached-lotto.json')
const OUTPUT_PATH = path.join(process.cwd(), 'src', 'data', 'lotto.json')

// 전체 회차 데이터 가져오기
const fetchAllLottoData = async (): Promise<LottoDrawFull[]> => {
  const { data } = await axios.get(
    'https://www.dhlottery.co.kr/lt645/selectPstLt645Info.do?srchLtEpsd=all'
  )

  const list: ApiLottoItem[] = data.data.list

  return list.map((item) => {
    const dateStr = item.ltRflYmd
    const formattedDate = dayjs(dateStr, 'YYYYMMDD').format('YYYY년 MM월 DD일')

    return {
      round: item.ltEpsd,
      date: formattedDate,
      numbers: [
        item.tm1WnNo,
        item.tm2WnNo,
        item.tm3WnNo,
        item.tm4WnNo,
        item.tm5WnNo,
        item.tm6WnNo,
      ],
      bonus: item.bnsWnNo,
      totalSales: item.wholEpsdSumNtslAmt,
      firstPrizeAmount: item.rnk1WnAmt,
      firstWinners: item.rnk1WnNope,
      prizes: [
        { rank: 1, winners: item.rnk1WnNope, amount: item.rnk1WnAmt },
        { rank: 2, winners: item.rnk2WnNope, amount: item.rnk2WnAmt },
        { rank: 3, winners: item.rnk3WnNope, amount: item.rnk3WnAmt },
        { rank: 4, winners: item.rnk4WnNope, amount: item.rnk4WnAmt },
        { rank: 5, winners: item.rnk5WnNope, amount: item.rnk5WnAmt },
      ],
    }
  })
}

// 4. 캐시 로딩
const loadCache = (): LottoDrawFull[] => {
  if (!fs.existsSync(CACHE_PATH)) return []
  const raw = fs.readFileSync(CACHE_PATH, 'utf-8')
  return JSON.parse(raw)
}

// 5. 저장 함수
const saveJSON = (filepath: string, data: LottoDrawFull[]) => {
  fs.mkdirSync(path.dirname(filepath), { recursive: true })
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8')
}

// 메인 실행
const main = async () => {
  const cached = loadCache()
  const cachedRounds = new Set(cached.map((d) => d.round))

  console.log(`📦 캐시된 회차: ${cached.length}개`)

  const allData = await fetchAllLottoData()
  console.log(`🎯 API에서 가져온 회차: ${allData.length}개`)

  const newItems = allData.filter((item) => !cachedRounds.has(item.round))
  const updated = [...cached, ...newItems].sort((a, b) => a.round - b.round)

  // 저장
  saveJSON(CACHE_PATH, updated)
  saveJSON(OUTPUT_PATH, updated)

  console.log(`✅ 저장 완료: ${updated.length}개 회차`)
  if (newItems.length === 0) {
    console.log(`🟢 변경 없음. 최신 상태 유지 중.`)
  } else {
    console.log(`🆕 새로 추가된 회차: ${newItems.length}`)
  }
}

main()

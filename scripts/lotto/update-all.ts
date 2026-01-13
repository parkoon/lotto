#!/usr/bin/env tsx

import { exec } from 'child_process'
import { promisify } from 'util'

import { LottoDataExcelGenerator } from './excel/lotto-data-excel'
import { LottoOddEvenExcelGenerator } from './excel/lotto-odd-even-excel'
import { LottoRankingExcelGenerator } from './excel/lotto-ranking-excel'
import { generateAllFilters } from './filter/index.js'

const execAsync = promisify(exec)

/**
 * 로또 데이터, 필터, 엑셀 파일 전체 업데이트
 * 매주 토요일 로또 발표 후 실행하는 통합 스크립트
 */
async function updateAllLottoData(): Promise<void> {
  console.log('🎯 로또 데이터, 필터, 엑셀 파일 전체 업데이트 시작\n')

  try {
    // 1. 로또 데이터 fetch
    console.log('📥 1단계: 최신 로또 데이터 가져오기...')
    const { stdout: fetchOutput, stderr: fetchError } =
      await execAsync('yarn lotto:fetch')

    if (fetchError) {
      console.error('❌ 로또 데이터 fetch 중 오류:', fetchError)
    } else {
      console.log('✅ 로또 데이터 fetch 완료')
      if (fetchOutput) {
        console.log(fetchOutput)
      }
    }

    console.log('\n' + '='.repeat(50) + '\n')

    // 2. 필터 생성
    console.log('⚙️  2단계: 필터 데이터 업데이트...')
    await generateAllFilters()

    console.log('\n' + '='.repeat(50) + '\n')

    // 3. 엑셀 파일 생성
    console.log('📊 3단계: 엑셀 파일 생성...')
    const generators = [
      new LottoDataExcelGenerator(),
      new LottoOddEvenExcelGenerator(),
      new LottoRankingExcelGenerator(),
    ]

    for (const generator of generators) {
      await generator.generate()
    }

    console.log('\n' + '='.repeat(50) + '\n')

    // 4. 완료 메시지
    console.log('🎉 전체 업데이트 완료!')
    console.log('📊 업데이트된 데이터:')
    console.log('   • 로또 당첨 번호 데이터 (src/data/lotto.json)')
    console.log('   • 15개 필터 JSON 파일 (src/data/lotto/filter/)')
    console.log('   • 엑셀 파일 (public/lotto/)')
    console.log('')
    console.log('💡 다음 업데이트: 매주 토요일 로또 발표 후')
    console.log('🔧 실행 명령어: yarn lotto:update')
  } catch (error) {
    console.error('❌ 업데이트 중 오류가 발생했습니다:', error)
    process.exit(1)
  }
}

// 스크립트 실행
if (require.main === module) {
  updateAllLottoData().catch(console.error)
}

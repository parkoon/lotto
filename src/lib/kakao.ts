/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    Kakao: any
  }
}
export function loadKakaoSdk(appKey: string) {
  if (window.Kakao && window.Kakao.isInitialized()) {
    return
  }
  if (!window.Kakao && !document.getElementById('kakao-sdk')) {
    const script = document.createElement('script')
    script.id = 'kakao-sdk'
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.5.0/kakao.min.js'
    script.onload = () => {
      window.Kakao.init(appKey)
    }
    document.head.appendChild(script)
    return
  }

  if (window.Kakao && !window.Kakao.isInitialized()) {
    window.Kakao.init(appKey)
  }
}

<script setup>
import { computed, ref } from 'vue'
const props = defineProps({ locale: { type: String, default: 'ko' } })
const selected = ref(1)
const copied = ref(false)
const stageIconPaths = [
  'M10 13a5 5 0 0 0 7.07 0l3-3A5 5 0 0 0 13 2.93l-1.72 1.71M14 11a5 5 0 0 0-7.07 0l-3 3A5 5 0 0 0 11 21.07l1.71-1.71',
  'M12 16V3m-5 5 5-5 5 5M4 14v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5',
  'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3a17 17 0 0 1 0 18 17 17 0 0 1 0-18Z'
]
const koreanStages = [
  { title: '계정 연결', command: 'spine cloud auth login', lines: ['브라우저에서 일회용 코드를 승인합니다.', 'CLI와 Spine Cloud 계정을 연결합니다.'], result: '계정 연결' },
  { title: '앱 배포', command: 'spine deploy', lines: ['프로젝트 디렉터리에서 실행합니다.', '앱을 빌드하고 배포를 요청합니다.', '실행 상태와 연결을 확인합니다.'], result: '배포 완료' },
  { title: '주소 확인', command: 'spine deploy', lines: ['성공한 배포의 공개 주소를 확인합니다.', '대시보드에서 배포 이력을 살펴봅니다.'], result: '공개 주소 확인' }
]
const localizedStages = {
  en: [{title:'Connect',lines:['Approve the one-time code in your browser.','Connect the CLI to your account.'],result:'Account connected'}, {title:'Deploy',lines:['Run from your project directory.','Build and request deployment.','Check the app and connection.'],result:'Deployment complete'}, {title:'Address',lines:['Find the public address of a successful deployment.','Review deployment history in the dashboard.'],result:'Public address'}],
  ja: [{title:'連携',lines:['ブラウザでワンタイムコードを承認します。','CLIとアカウントを連携します。'],result:'連携完了'}, {title:'デプロイ',lines:['プロジェクトディレクトリから実行します。','ビルドしてデプロイを依頼します。','実行状態と接続を確認します。'],result:'デプロイ完了'}, {title:'アドレス',lines:['成功したデプロイの公開アドレスを確認します。','ダッシュボードで履歴を確認します。'],result:'公開アドレス'}],
  'zh-Hans': [{title:'连接账户',lines:['在浏览器批准一次性代码。','连接 CLI 和账户。'],result:'账户已连接'}, {title:'部署应用',lines:['在项目目录中运行。','构建并请求部署。','检查运行状态和连接。'],result:'部署完成'}, {title:'查看地址',lines:['查看成功部署的公开地址。','在控制台查看部署历史。'],result:'公开地址'}],
  'zh-Hant': [{title:'連結帳戶',lines:['在瀏覽器核准一次性代碼。','連結 CLI 和帳戶。'],result:'帳戶已連結'}, {title:'部署應用',lines:['在專案目錄中執行。','建置並提出部署請求。','檢查執行狀態和連線。'],result:'部署完成'}, {title:'查看網址',lines:['查看成功部署的公開網址。','在控制台查看部署歷程。'],result:'公開網址'}]
}
const demoText = { ko:['배포 흐름 시연','명령어 복사','명령어 복사 완료','복사','복사됨','배포 과정','배포하려면 Spine CLI preview를 먼저 설치하세요.'], en:['Deployment demo','Copy command','Command copied','Copy','Copied','Deployment stages','Install Spine CLI preview before deploying.'], ja:['デプロイのデモ','コマンドをコピー','コピーしました','コピー','コピー済み','デプロイの流れ','デプロイするには、まず Spine CLI preview をインストールしてください。'], 'zh-Hans':['部署演示','复制命令','命令已复制','复制','已复制','部署流程','部署前请先安装 Spine CLI preview。'], 'zh-Hant':['部署示範','複製命令','命令已複製','複製','已複製','部署流程','部署前請先安裝 Spine CLI preview。'] }
const guideLabels = { ko: 'CLI 설치부터 배포까지 안내 보기', en: 'Guide from CLI installation to deployment', ja: 'CLI のインストールからデプロイまでのガイド', 'zh-Hans': '查看 CLI 安装到部署指南', 'zh-Hant': '查看 CLI 安裝到部署指南' }
const guideLabel = computed(() => guideLabels[props.locale] || guideLabels.ko)
const text = computed(() => demoText[props.locale] || demoText.ko)
const stages = computed(() => props.locale === 'ko' ? koreanStages : localizedStages[props.locale].map((stage, i) => ({ ...stage, command: koreanStages[i].command })))
const current = computed(() => stages.value[selected.value])
function selectStage(index) { selected.value = index; copied.value = false }
function onKey(event) {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
  event.preventDefault()
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (selected.value + (event.key === 'ArrowRight' ? 1 : 2)) % 3
  selectStage(next)
  document.getElementById(`demo-tab-${next}`)?.focus()
}
async function copyCommand() {
  try { await navigator.clipboard.writeText(current.value.command); copied.value = true }
  catch { copied.value = false }
}
</script>

<template>
  <div class="deploy-demo" data-ui>
    <div class="demo-bar"><span>cloud-example</span><span class="demo-context">{{ text[0] }}</span></div>
    <div class="demo-terminal">
      <div class="terminal-command"><pre><code><span class="prompt">&gt;</span> {{ current.command }}</code></pre><button class="copy-command" type="button" @click="copyCommand" :aria-label="copied ? text[2] : text[1]">{{ copied ? text[4] : text[3] }}</button></div>
      <Transition name="crossfade" mode="out-in">
        <div :key="selected" id="demo-panel" class="terminal-content" role="tabpanel" :aria-labelledby="`demo-tab-${selected}`" tabindex="0">
          <div class="terminal-lines"><p v-for="line in current.lines" :key="line"><span class="terminal-check" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="m2 6 2.5 2.5L10 3" stroke="currentColor" stroke-width="1.5" /></svg></span>{{ line }}</p></div>
          <div class="terminal-result"><span class="success-dot"></span>{{ current.result }}</div>
          <div v-if="selected !== 0" class="result-address"><span>https://</span>example.spinecloud.dev<span class="result-arrow" aria-hidden="true">↗</span></div>
        </div>
      </Transition>
    </div>
    <div class="demo-bottom"><div class="demo-tabs" role="tablist" :aria-label="text[5]" @keydown="onKey"><button v-for="(stage, i) in stages" :id="`demo-tab-${i}`" :key="stage.title" type="button" role="tab" :aria-selected="selected === i" aria-controls="demo-panel" :tabindex="selected === i ? 0 : -1" @click="selectStage(i)">
      <svg class="demo-tab-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path :d="stageIconPaths[i]" /></svg>
      <span>{{ stage.title }}</span>
    </button></div><p>{{ text[6] }} <a class="demo-guide-link" href="/open-beta">{{ guideLabel }} <span aria-hidden="true">↗</span></a></p></div>
  </div>
</template>

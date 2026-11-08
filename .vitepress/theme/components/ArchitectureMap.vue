<script setup>
import { onMounted, ref } from 'vue'
import { useData } from 'vitepress'
const { lang } = useData()
const labels = { 'ko-KR': ['배포','앱 관리','관리 API','인증과 저장소','실행 에이전트','HTTPS 작업 조회','애플리케이션','방문자','Portal 릴레이','터널'], en: ['Deploy','Manage apps','Management API','Identity and storage','Execution agent','HTTPS polling','Application','Visitor','Portal relay','Tunnel'], ja: ['デプロイ','アプリ管理','管理 API','認証とストレージ','実行エージェント','HTTPS ポーリング','アプリケーション','訪問者','Portal リレー','トンネル'], 'zh-CN': ['部署','管理应用','管理 API','身份与存储','执行代理','HTTPS 轮询','应用','访客','Portal 中继','隧道'], 'zh-TW': ['部署','管理應用程式','管理 API','身分與儲存','執行代理程式','HTTPS 輪詢','應用程式','訪客','Portal 中繼','通道'] }
const dashboard = { 'ko-KR': '대시보드', en: 'Dashboard', ja: 'ダッシュボード', 'zh-CN': '控制台', 'zh-TW': '控制台' }
const diagramLabel = { 'ko-KR': '배포와 애플리케이션 요청 경로', en: 'Deployment and application request paths', ja: 'デプロイとアプリへのリクエスト経路', 'zh-CN': '部署和应用请求路径', 'zh-TW': '部署和應用程式請求路徑' }
const svg = ref('')
const failed = ref(false)
onMounted(async () => {
  try {
    const { default: mermaid } = await import('mermaid')
    mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: 'neutral', flowchart: { useMaxWidth: true } })
    const l = labels[lang.value] || labels.en
    const result = await mermaid.render('spine-cloud-architecture', `flowchart LR
      CLI["Spine CLI"] -->|"${l[0]}"| API["${l[2]}"]
      Dashboard["${dashboard[lang.value] || dashboard.en}"] -->|"${l[1]}"| API
      API --> Store["${l[3]}"]
      Agent["${l[4]}"] -->|"${l[5]}"| API
      Agent --> App["${l[6]}"]
      Visitor["${l[7]}"] -->|"HTTPS"| Relay["${l[8]}"]
      Relay --> Tunnel["${l[9]}"]
      Tunnel --> App`)
    svg.value = result.svg
  } catch { failed.value = true }
})
</script>
<template>
  <figure class="architecture-map">
    <div v-if="svg" role="img" :aria-label="diagramLabel[lang] || diagramLabel.en" v-html="svg"></div>
    <pre v-else>CLI → Management API ← Dashboard
Execution agent → Management API → Identity and storage
Execution agent → Application
Visitor → Portal relay → Tunnel → Application</pre>
  </figure>
</template>
<style scoped>
.architecture-map { margin: 28px 0; padding: 20px; background: #f5f5f5; overflow-x: auto; border-radius: 8px; }
.architecture-map :deep(svg) { min-width: 600px; height: auto; }
.architecture-map pre { overflow-x: auto; }
</style>

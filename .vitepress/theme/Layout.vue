<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'
import BrandMark from './components/BrandMark.vue'
import DeployDemo from './components/DeployDemo.vue'
const { page } = useData()
const questions = [
  ['오픈 베타에서는 무엇을 할 수 있나요?', 'Spine 앱을 CLI로 배포하고 대시보드에서 배포 결과를 확인하는 경험을 준비하고 있습니다. 이용 범위와 조건은 오픈 베타 시작에 맞춰 안내합니다.'],
  ['어떤 앱을 배포하나요?', 'Go로 작성한 Spine 앱을 대상으로 합니다. 이 페이지의 배포 시연은 Preview 기반 개발 CLI의 흐름을 보여줍니다.'],
  ['명령어를 실행하면 바로 배포되나요?', '이 페이지는 설명용 시연입니다. 실제 배포에는 지원 CLI, 승인된 계정과 배포 대상이 필요합니다.'],
  ['요금과 이용 조건은 어떻게 되나요?', '오픈 베타의 요금과 이용 조건은 확정 후 안내합니다.'],
  ['Spine도 유료 서비스인가요?', 'Spine 프레임워크는 MIT 라이선스로 공개되어 있습니다. Spine Cloud는 앱 배포와 운영을 위한 별도 서비스입니다.']
]
function changeLocale(event) { const value = event.target.value; window.location.assign(value === 'ko' ? '/' : `/${value}/`) }
let observer
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.classList.add('reveal-in')
      observer.unobserve(entry.target)
    }
  }, { threshold: .15 })
  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el))
})
onUnmounted(() => observer?.disconnect())
</script>

<template>
  <a class="skip-link" href="#main">본문으로 바로가기</a>
  <header class="site-header frame">
    <a class="brand" href="/" aria-label="Spine Cloud 홈"><BrandMark /><span>spine<span class="brand-cloud">cloud</span></span></a>
    <nav aria-label="주 메뉴"><a href="/#workflow">제품 소개</a><a href="/technical/">기술 문서</a><a href="/#faq">FAQ</a></nav>
    <div class="header-controls"><a class="dashboard-link" href="https://spinecloud.dev/">대시보드</a><select class="locale-switch" aria-label="언어 선택" value="ko" @change="changeLocale"><option value="ko">한국어</option><option value="en">English</option><option value="ja">日本語</option><option value="zh-Hans">简体中文</option><option value="zh-Hant">繁體中文</option></select></div>
  </header>
  <main v-if="page.isNotFound" id="main" class="not-found frame"><h1>페이지를 찾을 수 없습니다</h1><a class="home-button" href="/">홈으로 돌아가기</a></main>
  <main v-else id="main">
    <section class="hero frame" aria-labelledby="hero-title">
      <div class="hero-copy">
        <h1 id="hero-title" data-reveal>그냥 미쳤습니다</h1>
        <p class="hero-description" data-reveal>Spine Cloud는 Go로 만든 Spine 앱을<br class="desktop-break"> CLI에서 배포하고, 웹에서 관리하는 클라우드입니다.</p>
        <div class="hero-actions" data-reveal><a class="home-button" href="#workflow">배포 흐름 보기 <span aria-hidden="true">↗</span></a><a class="text-link" href="/technical/">믿지 못하시겠다고요? 기술문서 확인하기</a></div>
        <p class="pilot-note" data-reveal>Spine Cloud 오픈 베타</p>
      </div>
      <div class="hero-product reveal-image" data-reveal><DeployDemo /></div>
      <div class="hero-baseline" data-reveal><span>Built for Spine. Written in Go.</span><span>로컬 프로젝트에서 공개 주소까지</span></div>
    </section>

    <section id="workflow" class="workflow frame" aria-labelledby="workflow-title">
      <div class="workflow-heading"><h2 id="workflow-title" data-reveal>개발하던<br> 흐름 그대로.</h2><p data-reveal>터미널에서 계정을 연결하고 앱을 배포하세요.<br> 배포가 완료되면 공개 주소에서 앱을 확인합니다.</p><p class="secondary-note" data-reveal>사용 가능한 CLI 버전과 이용 조건은 오픈 베타 안내를 확인해 주세요.</p></div>
      <div class="workflow-list">
        <div class="workflow-item" data-reveal><h3>계정을 연결하고</h3><p>브라우저에서 일회용 코드를 승인합니다.<br> 비밀번호를 CLI에 입력할 필요가 없습니다.</p><pre><code>spine cloud auth login</code></pre></div>
        <div class="workflow-item" data-reveal><h3>터미널에서 배포하면</h3><p>앱을 선택하고 배포를 요청합니다.<br> 진행 상태도 같은 터미널에서 확인합니다.</p><pre><code>spine deploy</code></pre></div>
        <div class="workflow-item" data-reveal><h3>앱에 주소가 생깁니다</h3><p>성공한 배포의 공개 주소를 확인하세요.<br> 배포 결과는 대시보드에도 남습니다.</p></div>
      </div>
    </section>

    <section id="features" class="features frame" aria-labelledby="features-title">
      <div class="section-head"><h2 id="features-title" data-reveal>앱을 올린 다음까지.</h2><p data-reveal>Spine Cloud에서 만드는 배포와 관리 경험을 살펴보세요.<br> 아래 화면은 기능을 설명하기 위한 예시입니다.</p></div>
      <article class="feature-primary">
        <div class="feature-copy"><h3 data-reveal>앱 목록에서<br> 배포 결과까지 한곳에.</h3><p data-reveal>어떤 앱을 배포했는지, 결과는 어땠는지.<br> 앱의 배포 이력과 성공한 배포의<br> 공개 주소를 확인합니다.</p></div>
        <div class="apps-fragment reveal-image" data-ui data-reveal>
          <div class="fragment-heading"><span><BrandMark /> Spine Cloud</span><span>예시 화면</span></div>
          <div class="app-summary"><div><p>내 앱</p><strong>cloud-example</strong></div><span class="status-label"><i></i>배포 완료</span></div>
          <div class="app-address"><span>공개 주소</span><p>example.spinecloud.dev</p></div>
          <div class="deploy-history"><span>배포 이력</span><div><span>cloud-example</span><span>완료</span></div><div><span>cloud-example</span><span>이전 배포</span></div></div>
        </div>
      </article>
      <div class="feature-secondary">
        <article class="feature-auth"><div class="auth-fragment reveal-image" data-ui data-reveal><div class="fragment-heading"><span>CLI 계정 연결</span><span>예시</span></div><p>브라우저에서 코드 승인</p><div class="device-code" aria-label="설명용 승인 코드"><span>ABCD2345</span><span>EFGH6789</span></div><div class="auth-status"><span class="success-dot"></span>승인한 계정으로 연결</div></div><h3 data-reveal>계정은 브라우저로 연결.</h3><p data-reveal>일회용 코드를 승인해 CLI를 계정에 연결합니다.<br> 웹과 CLI의 로그인 세션은 별도로 발급됩니다.</p></article>
        <article class="feature-secrets"><h3 data-reveal>설정은 코드와 따로.</h3><p data-reveal>앱에 필요한 환경 변수를 관리합니다.<br> 저장한 값은 다시 표시하지 않습니다.</p><div class="secrets-fragment reveal-image" data-ui data-reveal><div class="fragment-heading"><span>환경 변수</span><span>예시</span></div><div class="secret-row"><code>DATABASE_URL</code><span>값 숨김</span></div><div class="secret-row"><code>API_KEY</code><span>값 숨김</span></div><p>등록된 이름만 확인할 수 있습니다.</p></div></article>
      </div>
    </section>

    <section id="pilot" class="pilot-section" aria-labelledby="pilot-title"><div class="frame pilot-inner"><div><h2 id="pilot-title" data-reveal>어떻게 운영하는지<br> 문서로 공개합니다.</h2><a class="text-link" href="/technical/" data-reveal>기술 문서 보기</a></div><div class="pilot-details"><p data-reveal>아키텍처부터 보안과 복구까지,<br> 선택한 방식과 그 한계를 설명합니다.</p><p data-reveal>검증된 결과와 아직 확인이 필요한 항목을 구분해 기록합니다. 운영 구성이 바뀌면 문서도 함께 갱신합니다.</p><dl data-reveal><div><dt>아키텍처</dt><dd>구성 요소와 배포 흐름</dd></div><div><dt>신뢰와 보안</dt><dd>보호 범위와 남은 과제</dd></div></dl></div></div></section>

    <section id="faq" class="faq frame" aria-labelledby="faq-title"><h2 id="faq-title" data-reveal>자주 묻는 질문</h2><div class="faq-list"><details v-for="(question, i) in questions" :key="question[0]" :open="i === 0" data-reveal><summary>{{ question[0] }}<span aria-hidden="true">+</span></summary><p>{{ question[1] }}</p></details></div></section>
    <section class="closing frame" aria-labelledby="closing-title"><div><h2 id="closing-title" data-reveal>다음 앱은 Spine으로.</h2><p data-reveal>프로젝트를 만들고 API를 작성하는 방법부터 살펴보세요.</p></div><a class="home-button" href="https://spine.na2ru2.me/ko/" data-reveal>Spine 문서 보기 <span aria-hidden="true">↗</span></a></section>
  </main>
  <footer class="site-footer frame"><a class="brand" href="/" aria-label="Spine Cloud 홈"><BrandMark /><span>spine<span class="brand-cloud">cloud</span></span></a><div><a href="https://spine.na2ru2.me/ko/">Spine</a><a href="https://github.com/NARUBROWN/spine">GitHub</a><a href="/technical/">기술 문서</a><a href="/sitemap">사이트맵</a></div><span>© {{ new Date().getFullYear() }} Spine Cloud</span></footer>
</template>

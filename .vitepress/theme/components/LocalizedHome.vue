<script setup>
import { computed, onMounted } from 'vue'
import { useData } from 'vitepress'
import messages from '../locales.json'
import BrandLogo from './BrandLogo.vue'
import DeployDemo from './DeployDemo.vue'
import ProductDemo from './ProductDemo.vue'
import DocsIcon from './DocsIcon.vue'
import WorkflowIcon from './WorkflowIcon.vue'
import FeaturesIcon from './FeaturesIcon.vue'
const { page } = useData()
const locale = computed(() => page.value.relativePath.split('/')[0])
const m = computed(() => messages[locale.value])
const base = computed(() => `/${locale.value}/`)
function changeLocale(event) { const value = event.target.value; window.location.assign(value ? `/${value}/` : '/') }
const languages = [{code:'',label:'한국어'},{code:'en',label:'English'},{code:'ja',label:'日本語'},{code:'zh-Hans',label:'简体中文'},{code:'zh-Hant',label:'繁體中文'}]
onMounted(() => { if (window.location.hash === '#faq') window.location.replace(`${base.value}faq`) })
</script>
<template>
  <div v-if="m" class="localized-home">
    <header class="site-header frame"><a class="brand" :href="base"><BrandLogo /></a><nav :aria-label="m.product"><a href="#workflow">{{ m.product }}</a><a :href="`${base}technical/`">{{ m.docs }}</a><a :href="`${base}faq`">{{ m.faq }}</a></nav><div class="header-controls"><a class="dashboard-link" href="https://spinecloud.dev/">{{ m.dashboard }}</a><select class="locale-switch" :aria-label="m.label" :value="locale" @change="changeLocale"><option v-for="item in languages" :key="item.code" :value="item.code">{{ item.label }}</option></select></div></header>
    <main>
      <section class="hero frame"><div class="hero-copy"><h1>{{ m.hero }}</h1><p class="hero-description">{{ m.desc }}</p><div class="hero-actions"><a class="home-button" href="#workflow">{{ m.action }} <span aria-hidden="true">↗</span></a><a class="text-link" :href="`${base}technical/`">{{ m.doccta }}</a></div><p class="pilot-note">{{ m.status }}</p></div><div class="hero-product"><DeployDemo :locale="locale" /></div><div class="hero-baseline"><span>{{ m.flow }}</span></div></section>
      <section id="workflow" class="workflow frame"><div class="workflow-heading"><WorkflowIcon /><h2>{{ m.flow }}</h2><p>{{ m.desc }}</p></div><div class="workflow-list"><div v-for="(step,i) in m.steps" :key="step" class="workflow-item"><h3>{{ step }}</h3><p>{{ m.details[i] }}</p><pre v-if="i < 3"><code>{{ i === 0 ? 'go install github.com/NARUBROWN/spine-cli/cmd/spine@preview' : i === 1 ? 'spine cloud auth login' : 'spine deploy' }}</code></pre></div></div></section>
      <section id="features" class="features frame"><div class="section-head"><div><FeaturesIcon /><h2>{{ m.features }}</h2></div><p>{{ m.featuretext }}</p></div><div class="localized-features"><article v-for="(title,i) in m.featureNames" :key="title"><h3>{{ title }}</h3><p>{{ m.featureDetails[i] }}</p><ProductDemo :kind="['dashboard', 'cli', 'environment'][i]" :locale="locale" /></article></div></section>
      <section class="pilot-section"><div class="frame pilot-inner"><div><DocsIcon /><h2>{{ m.trust }}</h2><a class="text-link" :href="`${base}technical/`">{{ m.doccta }}</a></div><div class="pilot-details"><p>{{ m.trusttext }}</p><p v-for="key in ['arch','sec','ops']" :key="key"><a :href="`${base}technical/${key === 'arch' ? 'architecture' : key === 'sec' ? 'security' : 'operations'}`">{{ m[key] }} →</a></p></div></div></section>
      <section class="closing frame"><div><h2>{{ m.closing }}</h2><p>{{ m.trusttext }}</p></div><a class="home-button" :href="`${base}technical/`">{{ m.doccta }}</a></section>
    </main>
    <footer class="site-footer frame"><a class="brand" :href="base"><BrandLogo /></a><div><a :href="`${base}technical/`">{{ m.docs }}</a><a :href="`${base}faq`">{{ m.faq }}</a><a :href="`${base}sitemap`">{{ m.map }}</a><a :href="`https://spine.na2ru2.me/${locale}/`">{{ m.spine }}</a></div><span>© {{ new Date().getFullYear() }} Spine Cloud</span></footer>
  </div>
</template>
<style scoped>.localized-home :is(h1,h2,h3,p) { word-break: normal; overflow-wrap: anywhere; } .localized-home :is(.workflow-heading,.workflow-list,.hero-copy) { min-width: 0; } .localized-features { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:32px; padding-bottom:10px; } .localized-features > article:first-child { grid-column: 1 / -1; } .localized-features p { margin-top:16px; } .localized-features :deep(.product-demo) { margin-top:24px; } @media(max-width:580px){.localized-features { grid-template-columns:1fr; gap:28px; }.site-header nav{display:none}.hero h1{font-size:clamp(36px,9vw,52px)}}
@media (max-width: 360px) {
  .site-header { gap: 8px; }
  .site-header .brand { font-size: 19px; }
  .site-header .brand :deep(svg) { width: 20px; }
  .site-header .dashboard-link { padding-inline: 8px; }
  .site-header .locale-switch { padding-inline: 7px 25px; background-position: right 6px center; }
}
</style>

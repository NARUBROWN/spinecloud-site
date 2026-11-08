<script setup>
import { computed, onMounted } from 'vue'
import { useData } from 'vitepress'
import messages from '../locales.json'
import BrandMark from './BrandMark.vue'
import DeployDemo from './DeployDemo.vue'
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
    <header class="site-header frame"><a class="brand" :href="base"><BrandMark /><span>spine<span class="brand-cloud">cloud</span></span></a><nav :aria-label="m.product"><a href="#workflow">{{ m.product }}</a><a :href="`${base}technical/`">{{ m.docs }}</a><a :href="`${base}faq`">{{ m.faq }}</a></nav><div class="header-controls"><a class="dashboard-link" href="https://spinecloud.dev/">{{ m.dashboard }}</a><select class="locale-switch" :aria-label="m.label" :value="locale" @change="changeLocale"><option v-for="item in languages" :key="item.code" :value="item.code">{{ item.label }}</option></select></div></header>
    <main>
      <section class="hero frame"><div class="hero-copy"><h1>{{ m.hero }}</h1><p class="hero-description">{{ m.desc }}</p><div class="hero-actions"><a class="home-button" href="#workflow">{{ m.action }} <span aria-hidden="true">↗</span></a><a class="text-link" :href="`${base}technical/`">{{ m.doccta }}</a></div><p class="pilot-note">{{ m.status }}</p></div><div class="hero-product"><DeployDemo :locale="locale" /></div><div class="hero-baseline"><span>Built for Spine. Written in Go.</span><span>{{ m.flow }}</span></div></section>
      <section id="workflow" class="workflow frame"><div class="workflow-heading"><h2>{{ m.flow }}</h2><p>{{ m.desc }}</p></div><div class="workflow-list"><div v-for="(step,i) in m.steps" :key="step" class="workflow-item"><h3>{{ step }}</h3><p>{{ m.details[i] }}</p><pre v-if="i < 2"><code>{{ i === 0 ? 'spine cloud auth login' : 'spine deploy' }}</code></pre></div></div></section>
      <section id="features" class="features frame"><div class="section-head"><h2>{{ m.features }}</h2><p>{{ m.featuretext }}</p></div><div class="localized-features"><article v-for="(title,i) in m.featureNames" :key="title"><h3>{{ title }}</h3><p>{{ m.featureDetails[i] }}</p></article></div></section>
      <section class="pilot-section"><div class="frame pilot-inner"><div><h2>{{ m.trust }}</h2><a class="text-link" :href="`${base}technical/`">{{ m.doccta }}</a></div><div class="pilot-details"><p>{{ m.trusttext }}</p><p v-for="key in ['arch','sec','ops']" :key="key"><a :href="`${base}technical/${key === 'arch' ? 'architecture' : key === 'sec' ? 'security' : 'operations'}`">{{ m[key] }} →</a></p></div></div></section>
      <section class="closing frame"><div><h2>{{ m.closing }}</h2><p>{{ m.trusttext }}</p></div><a class="home-button" :href="`${base}technical/`">{{ m.doccta }}</a></section>
    </main>
    <footer class="site-footer frame"><a class="brand" :href="base"><BrandMark /><span>spine<span class="brand-cloud">cloud</span></span></a><div><a :href="`${base}technical/`">{{ m.docs }}</a><a :href="`${base}faq`">{{ m.faq }}</a><a :href="`${base}sitemap`">{{ m.map }}</a><a :href="`https://spine.na2ru2.me/${locale}/`">{{ m.spine }}</a></div><span>© {{ new Date().getFullYear() }} Spine Cloud</span></footer>
  </div>
</template>
<style scoped>.localized-home :is(h1,h2,h3,p) { word-break: normal; overflow-wrap: anywhere; } .localized-home :is(.workflow-heading,.workflow-list,.hero-copy) { min-width: 0; } .localized-features { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:32px; padding-bottom:10px; } .localized-features p { margin-top:16px; } @media(max-width:580px){.localized-features { grid-template-columns:1fr; gap:28px; }.site-header nav{display:none}.hero h1{font-size:clamp(36px,9vw,52px)}} </style>

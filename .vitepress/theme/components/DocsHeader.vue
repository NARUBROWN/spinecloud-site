<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import BrandLogo from './BrandLogo.vue'
import messages from '../locales.json'

const { page } = useData()
const languages = [{ code: '', label: '한국어' }, { code: 'en', label: 'English' }, { code: 'ja', label: '日本語' }, { code: 'zh-Hans', label: '简体中文' }, { code: 'zh-Hant', label: '繁體中文' }]
const locale = computed(() => languages.find(({ code }) => code && page.value.relativePath.startsWith(`${code}/`))?.code || '')
const base = computed(() => locale.value ? `/${locale.value}/` : '/')
const labels = computed(() => locale.value ? messages[locale.value] : { product: '제품 소개', docs: '기술 문서', faq: 'FAQ', dashboard: '대시보드' })
const languageLabel = computed(() => ({ '': '언어 선택', en: 'Language', ja: '言語', 'zh-Hans': '选择语言', 'zh-Hant': '選擇語言' })[locale.value])
function changeLocale(event) {
  const relative = page.value.relativePath.replace(/^(en|ja|zh-Hans|zh-Hant)\//, '').replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
  const prefix = event.target.value ? `/${event.target.value}/` : '/'
  window.location.assign(prefix + relative)
}
</script>

<template>
  <div class="docs-header"><header class="site-header frame">
    <a class="brand" :href="base"><BrandLogo /></a>
    <nav :aria-label="labels.product"><a :href="`${base}#workflow`">{{ labels.product }}</a><a :href="`${base}technical/`">{{ labels.docs }}</a><a :href="`${base}faq`">{{ labels.faq }}</a></nav>
    <div class="header-controls"><a class="dashboard-link" href="https://spinecloud.dev/">{{ labels.dashboard }}</a><select class="locale-switch" :aria-label="languageLabel" :value="locale" @change="changeLocale"><option v-for="item in languages" :key="item.code" :value="item.code">{{ item.label }}</option></select></div>
  </header></div>
</template>

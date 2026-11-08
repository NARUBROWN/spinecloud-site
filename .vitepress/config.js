import { defineConfig } from 'vitepress'
import messages from './theme/locales.json' with { type: 'json' }

const ko = { label: '한국어', lang: 'ko-KR', home: '홈', docs: '기술 문서', map: '사이트맵', intro: '기술 문서 소개', arch: '아키텍처와 제공자', sec: '보안과 데이터', ops: '운영과 복구', dashboard: '대시보드' }
const ui = { '/': ['언어 선택', '이 페이지에서', '이전 문서', '다음 문서'], '/en/': ['Languages', 'On this page', 'Previous page', 'Next page'], '/ja/': ['言語', 'このページ', '前のページ', '次のページ'], '/zh-Hans/': ['选择语言', '本页内容', '上一页', '下一页'], '/zh-Hant/': ['選擇語言', '本頁內容', '上一頁', '下一頁'] }
function localeConfig(m, base) {
  const [language, outline, prev, next] = ui[base]
  const skip = { '/': '본문으로 바로가기', '/en/': 'Skip to content', '/ja/': '本文へ移動', '/zh-Hans/': '跳至内容', '/zh-Hant/': '跳至內容' }[base]
  return {
    label: m.label,
    lang: m.lang,
    description: m.desc || 'Spine 애플리케이션을 위한 관리형 배포 서비스',
    link: base,
    themeConfig: {
      langMenuLabel: language,
      skipToContentLabel: skip,
      outline: { label: outline },
      docFooter: { prev, next },
      nav: [{ text: m.home, link: base }, { text: m.docs, link: `${base}technical/` }, { text: m.map, link: `${base}sitemap` }, { text: m.dashboard, link: 'https://spinecloud.dev/' }],
      sidebar: { [`${base}technical/`]: [{ text: m.docs, items: [
        { text: m.intro, link: `${base}technical/` },
        { text: m.arch, link: `${base}technical/architecture` },
        { text: m.sec, link: `${base}technical/security` },
        { text: m.ops, link: `${base}technical/operations` }
      ] }] }
    }
  }
}
export default defineConfig({
  lang: 'ko-KR',
  title: 'Spine Cloud',
  description: 'Spine 애플리케이션을 위한 관리형 배포 서비스',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }]
  ],
  cleanUrls: true,
  srcExclude: ['README.md', 'output/**'],
  sitemap: { hostname: 'https://home.spinecloud.dev' },
  locales: {
    root: localeConfig(ko, '/'),
    ...Object.fromEntries(Object.entries(messages).map(([code, m]) => [code, localeConfig(m, `/${code}/`)]))
  },
  themeConfig: { outline: { label: 'On this page' } }
})

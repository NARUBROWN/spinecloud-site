import { h } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import HomeLayout from './Layout.vue'
import LocalizedHome from './components/LocalizedHome.vue'
import DocsHeader from './components/DocsHeader.vue'
import './style.css'
import ArchitectureMap from './components/ArchitectureMap.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) { app.component('ArchitectureMap', ArchitectureMap) },
  Layout() {
    const { page } = useData()
    return page.value.relativePath === 'index.md' ? h(HomeLayout) : /^(en|ja|zh-Hans|zh-Hant)\/index\.md$/.test(page.value.relativePath) ? h(LocalizedHome) : h(DefaultTheme.Layout, null, { 'layout-top': () => h(DocsHeader) })
  }
}

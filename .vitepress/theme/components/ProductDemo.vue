<script setup>
import { computed, nextTick, ref, useId } from 'vue'
import messages from '../product-demo-locales.json'
const props = defineProps({ kind: { type: String, required: true }, locale: { type: String, default: 'ko' } })
const t = computed(() => messages[props.locale] || messages.ko)
const active = ref(0)
const selectedApp = ref('cloud-example')
const id = useId()
const tabs = computed(() => [t.value.apps, t.value.deployments])
function selectTab(index) { active.value = index }
function onTabKey(event) {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
  event.preventDefault()
  active.value = event.key === 'Home' ? 0 : event.key === 'End' ? 1 : 1 - active.value
  document.getElementById(`${id}-tab-${active.value}`)?.focus()
}
async function openApp(name) {
  selectedApp.value = name
  active.value = 1
  await nextTick()
  document.getElementById(`${id}-panel`)?.focus()
}
</script>

<template>
  <section class="product-demo" :class="`product-demo--${kind}`" :aria-label="t.preview">
    <template v-if="kind === 'dashboard'">
      <div class="product-tabs" role="tablist" :aria-label="t.tabsLabel" @keydown="onTabKey">
        <button v-for="(label, index) in tabs" :id="`${id}-tab-${index}`" :key="index" type="button" role="tab" :aria-selected="active === index" :aria-controls="`${id}-panel`" :tabindex="active === index ? 0 : -1" @click="selectTab(index)">{{ label }}</button>
      </div>
      <div :id="`${id}-panel`" class="dashboard-panel" role="tabpanel" :aria-labelledby="`${id}-tab-${active}`" tabindex="0">
        <template v-if="active === 0">
          <div class="demo-heading"><h4>{{ t.myApps }}</h4><span class="demo-count">2</span></div>
          <p class="demo-muted">{{ t.appDescription }}</p>
          <div class="demo-apps">
            <h5>{{ t.applications }}</h5>
            <button v-for="name in ['cloud-example', 'cloud-api']" :key="name" type="button" class="demo-app-row" @click="openApp(name)">
              <span class="demo-app-name">{{ name }}<small>{{ name }}.spinecloud.dev</small></span>
              <span class="demo-status"><i aria-hidden="true"></i>{{ t.live }} <span aria-hidden="true">→</span></span>
            </button>
          </div>
        </template>
        <template v-else>
          <div class="demo-heading"><h4>{{ selectedApp }}</h4><span class="demo-status"><i aria-hidden="true"></i>{{ t.running }}</span></div>
          <div class="demo-address"><span>{{ t.publicAddress }}</span><code>{{ selectedApp }}.spinecloud.dev</code></div>
          <div class="demo-apps">
            <h5>{{ t.deploymentHistory }}</h5>
            <div v-for="(version, index) in ['v0.2.0', 'v0.1.0']" :key="version" class="demo-history-row"><div><strong>{{ t.live }}</strong><small>{{ index === 0 ? t.latest : t.previous }} <code>{{ version }}</code></small></div><span class="demo-status"><i aria-hidden="true"></i>{{ t.live }}</span></div>
          </div>
        </template>
      </div>
    </template>
    <template v-else-if="kind === 'cli'">
      <div class="demo-heading"><h4>{{ t.cliTitle }}</h4><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m10 8-4 4 4 4m4-8 4 4-4 4" /></svg></div>
      <p class="demo-muted">{{ t.cliDescription }}</p>
      <label class="demo-field"><span>{{ t.code }}</span><input value="ABCD-EFGH-JKLM-NPQR" readonly :aria-describedby="`${id}-code-help`" /></label>
      <p :id="`${id}-code-help`" class="demo-help">{{ t.codeHelp }}</p>
      <button class="demo-primary" type="button" disabled>{{ t.approve }}</button>
    </template>
    <template v-else-if="kind === 'environment'">
      <div class="demo-heading"><h4>{{ t.environment }}</h4><span class="demo-count">2</span></div>
      <p class="demo-muted">{{ t.envDescription }}</p>
      <dl class="demo-variables" :aria-label="t.registered"><div v-for="name in ['DATABASE_URL', 'API_KEY']" :key="name"><dt><code>{{ name }}</code></dt><dd>{{ t.hidden }}</dd></div></dl>
      <div class="demo-fields"><label class="demo-field"><span>{{ t.name }}</span><input value="API_KEY" readonly /></label><label class="demo-field"><span>{{ t.value }}</span><input :value="t.hidden" readonly /></label></div>
      <button class="demo-primary" type="button" disabled>{{ t.save }}</button>
    </template>
    <p class="demo-example">{{ t.exampleLabel }}</p>
  </section>
</template>

<style scoped>
.product-demo { container-type: inline-size; min-width: 0; padding: 24px; color: var(--ink); background: var(--paper); border: 1px solid #29292e; border-radius: var(--radius); text-align: left; }
.product-demo :is(h4,h5,p) { margin: 0; }
.product-demo h4 { font-size: 18px; line-height: 1.5; font-weight: 600; letter-spacing: -.03em; }
.product-demo h5 { padding-bottom: 16px; border-bottom: 1px solid var(--line); font-size: 13px; font-weight: 600; }
.demo-heading { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 10px; flex-wrap: wrap; }
.demo-heading svg { color: var(--muted); }
.product-demo .demo-muted { color: var(--muted); font-size: 13px; line-height: 1.7; }
.demo-count { color: var(--muted); font-size: 12px; }
.product-tabs { display: flex; gap: 24px; margin-bottom: 24px; border-bottom: 1px solid var(--line); }
.product-tabs button { min-height: 44px; padding: 0 0 12px; color: var(--muted); background: transparent; border: 0; border-bottom: 1px solid transparent; font-size: 13px; }
.product-tabs button[aria-selected='true'] { color: var(--ink); border-bottom-color: #84b4ef; }
.dashboard-panel { min-height: 280px; }
.demo-apps { margin-top: 24px; padding: 18px; background: #171719; border: 1px solid var(--line); }
.demo-app-row { display: flex; align-items: center; justify-content: space-between; gap: 14px; width: 100%; min-height: 80px; padding: 16px 0; background: transparent; color: inherit; border: 0; border-bottom: 1px solid var(--line); text-align: left; font-size: 13px; }
.demo-app-row:last-child, .demo-history-row:last-child { border-bottom: 0; padding-bottom: 0; }
.demo-app-row:hover .demo-app-name { color: #84b4ef; }
.demo-app-name { min-width: 0; font-weight: 600; overflow-wrap: anywhere; }
.product-demo small { display: block; margin-top: 7px; color: var(--muted); font-size: 11px; font-weight: 400; overflow-wrap: anywhere; }
.demo-status { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; color: #b5b5bc; flex-shrink: 0; }
.demo-status i { width: 6px; height: 6px; border-radius: 50%; background: var(--positive); flex-shrink: 0; }
.demo-address { display: grid; gap: 8px; margin-top: 18px; color: var(--muted); font-size: 12px; }
.demo-address code { color: #d7e5f5; overflow-wrap: anywhere; }
.demo-history-row { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 16px 0; border-bottom: 1px solid var(--line); font-size: 12px; }
.demo-history-row strong { font-weight: 500; }
.demo-field { display: grid; gap: 9px; margin-top: 22px; color: #dedee1; font-size: 12px; min-width: 0; }
.demo-field input { width: 100%; min-width: 0; height: 43px; padding: 0 12px; border: 1px solid #45454a; border-radius: 3px; color: var(--ink); background: #1e1e21; font: 13px ui-monospace, monospace; }
.product-demo--cli input { letter-spacing: .04em; }
.product-demo .demo-help { margin-top: 10px; color: var(--muted); font-size: 12px; line-height: 1.7; }
.demo-primary { min-height: 43px; margin-top: 20px; padding: 10px 18px; background: #f2f2f3; color: #171719; border: 0; border-radius: 3px; font-size: 13px; font-weight: 700; }
.demo-primary:disabled { opacity: .55; cursor: default; }
.product-demo--cli .demo-primary { width: 100%; }
.demo-variables { margin: 22px 0 0; }
.demo-variables > div { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 15px 0; border-bottom: 1px solid var(--line); font-size: 12px; }
.demo-variables dt { min-width: 0; overflow-wrap: anywhere; }
.demo-variables dd { margin: 0; color: var(--muted); }
.demo-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.product-demo .demo-example { margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--line); color: var(--muted); font-size: 11px; line-height: 1.6; }
@container (max-width: 380px) { .demo-app-row { align-items: flex-start; flex-direction: column; gap: 10px; } }
@media (max-width: 1100px) { .product-demo { padding: 18px; } }
@media (max-width: 580px) { .product-demo { padding: 20px; } .demo-apps { padding: 14px; } .demo-fields { grid-template-columns: 1fr; gap: 0; } }
</style>

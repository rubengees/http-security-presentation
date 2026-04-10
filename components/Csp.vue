<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-2 text-sm">
      <span>CSP:</span>
      <button
        class="rounded px-2 py-0.5 text-xs font-semibold transition-colors"
        :class="cspEnabled ? 'bg-green-800 text-green-200' : 'bg-red-900 text-red-200'"
        @click="cspEnabled = !cspEnabled"
      >
        {{ cspEnabled ? "✓ Aktiviert" : "✗ Deaktiviert" }}
      </button>
      <code v-if="cspEnabled" class="text-xs text-slate-400">script-src 'self'</code>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <CspSection title="XSS – Inline Script" @run="showInlineXss">
        &lt;script&gt; alert('Hacked!') &lt;/script&gt;
      </CspSection>

      <CspSection title="XSS – eval()" @run="showEvalXss"> eval("alert('Hacked!')")</CspSection>
    </div>

    <iframe v-if="iframeSrc" :src="iframeSrc" class="h-56 w-full rounded border border-slate-700" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import CspSection from "./CspSection.vue"

const cspEnabled = ref(false)
const iframeSrc = ref("")

function showInlineXss() {
  iframeSrc.value = import.meta.env.BASE_URL + (cspEnabled.value ? "/inline-xss-csp.html" : "/inline-xss.html")
}

function showEvalXss() {
  iframeSrc.value =
    import.meta.env.BASE_URL +
    (cspEnabled.value ? "/eval-xss-csp.html" : "/eval-xss.html") +
    "?query=" +
    encodeURIComponent("'); alert('Hacked!")
}
</script>

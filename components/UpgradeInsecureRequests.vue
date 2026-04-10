<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-2 text-sm">
      <span>CSP:</span>
      <button
        class="rounded px-2 py-0.5 text-xs font-semibold transition-colors"
        :class="enabled ? 'bg-green-800 text-green-200' : 'bg-red-900 text-red-200'"
        @click="enabled = !enabled"
      >
        {{ enabled ? "✓ Aktiviert" : "✗ Deaktiviert" }}
      </button>
      <code v-if="enabled" class="text-xs text-slate-400">upgrade-insecure-requests</code>
    </div>

    <iframe :src="iframeUrl" class="h-84 w-full rounded border border-slate-700" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"

const enabled = ref(false)

const iframeSrc = computed(() => (enabled.value ? "/upgrade-insecure-csp.html" : "/upgrade-insecure.html"))
const iframeUrl = computed(() => import.meta.env.BASE_URL + iframeSrc.value)
</script>

<template>
  <section class="flex flex-col gap-1.5">
    <h3 class="text-sm font-semibold tracking-wide">{{ title }}</h3>
    <pre class="rounded bg-slate-700 p-2 text-xs whitespace-pre-line">
      <slot />
    </pre>
    <button
      class="flex w-fit items-center gap-2 rounded bg-slate-700 px-2 py-1 text-xs font-medium text-white transition-colors hover:bg-slate-500 disabled:cursor-not-allowed disabled:opacity-40"
      :disabled="loading"
      @click="$emit('run')"
    >
      <svg v-if="loading" class="h-3 w-3 animate-spin" viewBox="0 0 24 24" fill="none">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      <span> {{ loading ? "Läuft…" : "Ausführen" }}</span>
    </button>
  </section>
</template>

<script setup lang="ts">
defineProps<{ title: string; loading: boolean }>()
defineEmits<{ run: [] }>()
</script>

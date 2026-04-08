<template>
  <section class="flex flex-col gap-1.5">
    <h3 class="text-sm font-semibold tracking-wide">{{ title }}</h3>
    <pre class="rounded bg-slate-700 p-2 text-xs whitespace-pre-line">
      <slot />
    </pre>
    <button
      class="flex w-fit items-center gap-2 rounded bg-slate-700 px-2 py-1 text-xs font-medium text-white transition-colors hover:bg-slate-500"
      @click="$emit('run')"
    >
      Ausführen
    </button>
  </section>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
defineEmits<{ run: [] }>()
</script>

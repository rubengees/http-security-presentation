<template>
  <div class="flex flex-col gap-6">
    <div class="grid grid-cols-2 gap-4">
      <CorsSection title="Fehlerhafter Aufruf" :loading="loading" @run="runFailing">
        fetch("https://google.com")
      </CorsSection>

      <CorsSection title="Funktionsfähiger Aufruf" :loading="loading" @run="runWorking">
        fetch("https://jsonplaceholder.typicode.com/posts/1")
      </CorsSection>

      <CorsSection title="Funktionsfähiger Aufruf (Pre-Flight)" :loading="loading" @run="runPreflight">
        fetch("https://jsonplaceholder.typicode.com/posts/1", { method: "PUT", headers: { "Content-Type":
        "application/json" }, body: JSON.stringify({ id: 1, title: "foo", body: "bar", userId: 1 }) })
      </CorsSection>

      <CorsSection title="Funktionsfähiger Aufruf (Proxy)" :loading="loading" @run="runProxy">
        fetch("/api/proxy") -> fetch("https://google.com")
      </CorsSection>
    </div>

    <pre
      v-if="result !== null"
      class="max-h-32 overflow-auto rounded bg-slate-700 p-2 text-xs whitespace-pre-line"
      :class="result.error ? 'text-red-400' : 'text-green-300'"
    >
      {{ result.error ?? result.value }}
    </pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import CorsSection from "./CorsSection.vue"

const loading = ref(false)
const result = ref<{ error?: string; value?: string } | null>(null)

async function runFailing() {
  loading.value = true
  result.value = null

  try {
    await fetch("https://google.com")
  } catch (err) {
    result.value = { error: String(err) }
  } finally {
    loading.value = false
  }
}

async function runWorking() {
  loading.value = true
  result.value = null

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1")

    result.value = { value: JSON.stringify(await response.json(), undefined, 2) }
  } finally {
    loading.value = false
  }
}

async function runPreflight() {
  loading.value = true
  result.value = null

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: 1, title: "foo", body: "bar", userId: 1 }),
    })

    result.value = { value: JSON.stringify(await response.json(), undefined, 2) }
  } finally {
    loading.value = false
  }
}

async function runProxy() {
  loading.value = true
  result.value = null

  try {
    const response = await fetch("/api/proxy")

    result.value = { value: await response.text() }
  } finally {
    loading.value = false
  }
}
</script>

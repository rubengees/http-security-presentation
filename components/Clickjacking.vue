<template>
  <iframe :src="iframeSrc" height="86" style="margin-bottom: 12px"></iframe>
</template>

<script setup lang="ts">
import { baseUrl } from "../utils/baseUrl"

const iframeSrc = baseUrl("clickjacking.html").href
</script>

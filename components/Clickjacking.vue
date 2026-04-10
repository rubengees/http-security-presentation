<template>
  <iframe :src="iframeSrc" height="86" style="margin-bottom: 12px"></iframe>
</template>

<script setup lang="ts">
const iframeSrc = import.meta.env.BASE_URL + "/clickjacking.html"
</script>

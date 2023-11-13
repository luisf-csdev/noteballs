<template>
  <TheNavigation />
  <div class="container is-max-desktop px-2 py-4">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import TheNavigation from '@/components/common/TheNavigation.vue'
</script>

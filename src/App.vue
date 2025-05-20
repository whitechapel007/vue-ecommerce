<template>
  <div class="min-h-screen flex flex-col">
    <the-header />
    <main class="flex-1">
      <router-view />
    </main>
    <the-footer />
  </div>
</template>

<script setup lang="ts">
import TheHeader from "./components/layout/TheHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue";
</script>

<style>
/* Global styles */
</style>

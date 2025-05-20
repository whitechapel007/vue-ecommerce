<template>
  <div class="min-h-[70vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="text-center">
      <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl">404</h1>
      <p class="mt-2 text-2xl font-bold text-gray-900">Page not found</p>
      <p class="mt-2 text-base text-gray-500">Sorry, we couldn't find the page you're looking for.</p>
      <div class="mt-6">
        <router-link to="/" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
          Go back home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional logic needed
</script>

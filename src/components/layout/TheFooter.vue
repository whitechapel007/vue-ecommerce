<template>
  <footer class="bg-gray-900 text-gray-300">
    <div class="max-w-7xl mx-auto px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <!-- Branding -->
        <div>
          <h3 class="text-xl font-bold text-white mb-4">Vue E-Commerce</h3>
          <p class="text-sm leading-relaxed">
            A modern demo e-commerce site built with Vue 3, TypeScript, Pinia,
            and Tailwind CSS.
          </p>
        </div>

        <!-- Navigation -->
        <div>
          <h3 class="text-xl font-bold text-white mb-4">Explore</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <router-link to="/" class="hover:text-white transition-colors"
                >Home</router-link
              >
            </li>
            <li>
              <router-link
                to="/products"
                class="hover:text-white transition-colors"
                >Products</router-link
              >
            </li>
            <li>
              <router-link to="/cart" class="hover:text-white transition-colors"
                >Cart</router-link
              >
            </li>
          </ul>
        </div>

        <!-- Contact / Info -->
        <div>
          <h3 class="text-xl font-bold text-white mb-4">About</h3>
          <p class="text-sm leading-relaxed">
            <a
              href="https://github.com/whitechapel007/vue-ecommerce"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-400 hover:text-blue-300"
            >
              GitHub </a
            >.
          </p>
        </div>
      </div>

      <div
        class="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500"
      >
        &copy; {{ new Date().getFullYear() }} Vue E-Commerce. All rights
        reserved.
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// No script logic required
</script>

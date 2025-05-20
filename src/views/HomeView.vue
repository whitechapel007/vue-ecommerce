<template>
  <div>
    <!-- Hero Section -->
    <section
      class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20"
    >
      <div class="max-w-7xl mx-auto px-6 text-center">
        <h1 class="text-4xl md:text-5xl font-extrabold">
          Shop Smart. Live Better.
        </h1>
        <p class="mt-4 text-xl">Top-quality products at unbeatable prices</p>
        <div class="mt-8">
          <router-link
            to="/products"
            class="px-6 py-3 text-blue-600 bg-white rounded-md font-semibold hover:bg-blue-50 transition"
          >
            Start Shopping
          </router-link>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-bold">Featured Products</h2>
          <router-link
            to="/products"
            class="text-blue-600 hover:underline font-medium"
          >
            View all
          </router-link>
        </div>

        <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <product-card
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </section>

    <!-- Shop by Category -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-2xl font-bold mb-6">Shop by Category</h2>
        <div class="grid gap-4 grid-cols-2 md:grid-cols-4">
          <router-link
            v-for="category in categories"
            :key="category"
            :to="`/products?category=${category}`"
            class="p-6 bg-white shadow rounded-lg hover:shadow-md transition text-center"
          >
            <span class="text-lg font-medium text-gray-700 capitalize">{{
              category
            }}</span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-20 bg-white border-t border-gray-100">
      <div class="max-w-6xl mx-auto px-6 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-10">
          What Our Customers Say
        </h2>

        <div class="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="n in 3"
            :key="n"
            class="bg-gray-50 p-6 rounded-xl shadow-sm flex flex-col items-center"
          >
            <!-- Avatar (placeholder) -->
            <div
              class="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 mb-4 text-lg font-semibold"
            >
              <User class="w-6 h-6" />
            </div>

            <!-- Quote -->
            <p class="text-gray-700 text-sm italic max-w-xs">
              "Absolutely love the products. Fast delivery, top quality, and
              great support!"
            </p>

            <!-- Rating -->
            <div class="mt-4 flex items-center justify-center gap-1">
              <div v-for="i in 5" :key="i" class="relative">
                <!-- Background star (gray) -->
                <Star class="w-4 h-4 text-gray-300" />

                <!-- Filled star (yellow) with width based on rating -->
                <div
                  class="absolute top-0 left-0 overflow-hidden"
                  :style="{ width: '100%' }"
                >
                  <Star class="w-4 h-4 text-yellow-400" />
                </div>
              </div>
            </div>

            <!-- Name -->
            <div class="mt-2 text-sm font-medium text-gray-800">Jane Doe</div>
            <div class="text-xs text-gray-500">Verified Buyer</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useProductStore } from "../stores/productStore";
import ProductCard from "../components/product/ProductCard.vue";

import { User, Star } from "lucide-vue-next";

const productStore = useProductStore();

const featuredProducts = computed(() =>
  [...productStore.allProducts]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 4)
);

const categories = computed(() => productStore.categories);
</script>

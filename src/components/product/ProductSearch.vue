<template>
  <div class="relative">
    <!-- Search Icon -->
    <div
      class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
    >
      <Search class="w-5 h-5 text-gray-500" aria-hidden="true" />
    </div>

    <!-- Search Input -->
    <input
      type="search"
      class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
      placeholder="Search products..."
      v-model="searchInput"
    />

    <!-- Clear Button -->
    <button
      v-if="searchInput"
      @click="clearSearch"
      class="absolute right-2.5 bottom-2.5 text-gray-500 hover:text-gray-700"
      aria-label="Clear search"
    ></button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useProductStore } from "../../stores/productStore";
import { Search } from "lucide-vue-next";

const productStore = useProductStore();
const searchInput = ref("");
let debounceTimeout: number | null = null;

// Sync store -> input
watch(
  () => productStore.searchQuery,
  (newQuery) => {
    searchInput.value = newQuery;
  },
  { immediate: true }
);

// Debounced input -> store
watch(searchInput, (newValue) => {
  if (debounceTimeout) clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    productStore.setSearchQuery(newValue);
  }, 300) as unknown as number;
});

// Clear search
const clearSearch = () => {
  searchInput.value = "";
  productStore.setSearchQuery("");
};
</script>

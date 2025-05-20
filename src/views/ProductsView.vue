<template>
  <div class="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Products</h1>

    <!-- Search Bar -->
    <product-search class="mb-6" />

    <div class="flex flex-col md:flex-row gap-6">
      <!-- Filter Sidebar -->
      <aside class="w-full md:w-64 flex-shrink-0">
        <product-filter />
      </aside>

      <!-- Product Grid + Pagination -->
      <main class="flex-1">
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center h-64">
          <div
            class="animate-spin h-12 w-12 rounded-full border-t-2 border-b-2 border-blue-500"
          />
        </div>

        <!-- Error State -->
        <div
          v-else-if="error"
          class="bg-red-100 text-red-700 border border-red-400 px-4 py-3 rounded"
        >
          {{ error }}
        </div>

        <!-- No Results -->
        <div
          v-else-if="paginatedProducts.length === 0"
          class="text-center py-12"
        >
          <h3 class="text-lg font-medium text-gray-900">No products found</h3>
          <p class="mt-2 text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>

        <!-- Product Results -->
        <div v-else>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <product-card
              v-for="product in paginatedProducts"
              :key="product.id"
              :product="product"
            />
          </div>

          <!-- Pagination -->
          <div class="mt-8">
            <product-pagination
              :current-page="currentPage"
              :total-pages="totalPages"
              :total-items="filteredProducts.length"
              :items-per-page="itemsPerPage"
              @page-change="handlePageChange"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "../stores/productStore";
import { SortOption } from "../types/product";

import ProductCard from "../components/product/ProductCard.vue";
import ProductFilter from "../components/product/ProductFilter.vue";
import ProductSearch from "../components/product/ProductSearch.vue";
import ProductPagination from "../components/product/ProductPagination.vue";

const route = useRoute();
const router = useRouter();
const store = useProductStore();

// State mappings
const loading = computed(() => store.loading);
const error = computed(() => store.error);
const filteredProducts = computed(() => store.filteredProducts);
const paginatedProducts = computed(() => store.paginatedProducts);
const currentPage = computed(() => store.currentPage);
const totalPages = computed(() => store.totalPages);
const itemsPerPage = computed(() => store.itemsPerPage);

// Pagination handler
const handlePageChange = (page: number) => {
  store.setPage(page);
  router.push({ query: { ...route.query, page: page.toString() } });
};

// Initialize filters from URL query
onMounted(() => {
  const { category, minPrice, maxPrice, sort, page, search } = route.query;

  if (category) store.setFilter({ category: category as string });
  if (minPrice) store.setFilter({ minPrice: parseFloat(minPrice as string) });
  if (maxPrice) store.setFilter({ maxPrice: parseFloat(maxPrice as string) });
  if (sort) store.setSortBy(sort as SortOption);
  if (page) store.setPage(parseInt(page as string));
  if (search) store.setSearchQuery(search as string);
});

// Sync filter changes to URL
watch(
  () => store.filter,
  (filter) => {
    const query = { ...route.query };
    if (filter.category) query.category = filter.category;
    else delete query.category;

    if (filter.minPrice !== undefined)
      query.minPrice = filter.minPrice.toString();
    else delete query.minPrice;

    if (filter.maxPrice !== undefined)
      query.maxPrice = filter.maxPrice.toString();
    else delete query.maxPrice;

    router.push({ query });
  },
  { deep: true }
);

// Sync sort to URL
watch(
  () => store.sortBy,
  (sort) => {
    router.push({ query: { ...route.query, sort } });
  }
);

// Sync search to URL
watch(
  () => store.searchQuery,
  (search) => {
    const query = { ...route.query };
    if (search) query.search = search;
    else delete query.search;
    router.push({ query });
  }
);
</script>

<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
      <Filter class="w-5 h-5 text-gray-500" />
      Filters
    </h3>

    <!-- Category -->
    <div class="mb-4">
      <h4 class="font-medium text-gray-700 mb-2 flex items-center gap-1">
        <List class="w-4 h-4 text-gray-400" />
        Category
      </h4>
      <base-select
        v-model="selectedCategory"
        :options="categoryOptions"
        placeholder="All Categories"
      />
    </div>

    <!-- Price Range -->
    <div class="mb-4">
      <h4 class="font-medium text-gray-700 mb-2 flex items-center gap-1">
        <BadgeDollarSign class="w-4 h-4 text-gray-400" />
        Price Range
      </h4>
      <div class="grid grid-cols-2 gap-2">
        <base-input
          v-model="minPrice"
          type="number"
          placeholder="Min"
          min="0"
        />
        <base-input
          v-model="maxPrice"
          type="number"
          placeholder="Max"
          min="0"
        />
      </div>
    </div>

    <!-- Sort By -->
    <div class="mb-4">
      <h4 class="font-medium text-gray-700 mb-2 flex items-center gap-1">
        <SortAsc class="w-4 h-4 text-gray-400" />
        Sort By
      </h4>
      <base-select v-model="selectedSort" :options="sortOptions" />
    </div>

    <!-- Actions -->
    <div class="flex space-x-2">
      <base-button variant="primary" class="flex-1" @click="applyFilters">
        Apply Filters
      </base-button>
      <base-button variant="outline" class="flex-1" @click="resetFilters">
        Reset
      </base-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useProductStore } from "../../stores/productStore";
import type { SortOption } from "../../types/product";

import { Filter, List, SortAsc, BadgeDollarSign } from "lucide-vue-next";

import BaseSelect from "../ui/BaseSelect.vue";
import BaseInput from "../ui/BaseInput.vue";
import BaseButton from "../ui/BaseButton.vue";

const store = useProductStore();

// Form state
const selectedCategory = ref<string>("");
const minPrice = ref<string>("");
const maxPrice = ref<string>("");
const selectedSort = ref<SortOption>("newest");

// Category options
const categoryOptions = computed(() =>
  store.categories.map((c) => ({
    value: c,
    label: c.charAt(0).toUpperCase() + c.slice(1),
  }))
);

// Sort options
const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
];

// Sync from store
watch(
  () => store.filter,
  (filter) => {
    selectedCategory.value = filter.category || "";
    minPrice.value = filter.minPrice?.toString() || "";
    maxPrice.value = filter.maxPrice?.toString() || "";
  },
  { immediate: true }
);

watch(
  () => store.sortBy,
  (sort) => {
    selectedSort.value = sort;
  },
  { immediate: true }
);

// Apply filters
const applyFilters = () => {
  store.setFilter({
    category: selectedCategory.value || undefined,
    minPrice: minPrice.value ? parseFloat(minPrice.value) : undefined,
    maxPrice: maxPrice.value ? parseFloat(maxPrice.value) : undefined,
  });

  store.setSortBy(selectedSort.value);
};

// Reset filters
const resetFilters = () => {
  selectedCategory.value = "";
  minPrice.value = "";
  maxPrice.value = "";
  selectedSort.value = "newest";

  store.setFilter({});
  store.setSortBy("newest");
};
</script>

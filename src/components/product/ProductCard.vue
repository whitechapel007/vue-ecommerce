<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]"
    role="group"
    aria-label="Product card"
  >
    <!-- Product Image -->
    <router-link
      :to="`/product/${product.id}`"
      class="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <div class="h-40 bg-gray-100 flex items-center justify-center">
        <img
          :src="product.thumbnail"
          :alt="`${product.title} thumbnail`"
          class="object-contain max-h-36"
          loading="lazy"
        />
      </div>
    </router-link>

    <!-- Product Info -->
    <div class="p-4 space-y-3">
      <!-- Title & Stock Status -->
      <div class="flex justify-between items-start">
        <router-link :to="`/product/${product.id}`">
          <h3
            class="text-sm font-semibold text-gray-900 hover:text-blue-600 truncate"
          >
            {{ product.title }}
          </h3>
        </router-link>
        <span
          class="text-[10px] font-medium px-2 py-1 rounded-full whitespace-nowrap"
          :class="stockStatusClass"
        >
          {{ stockStatus }}
        </span>
      </div>

      <!-- Description -->
      <p class="text-sm text-gray-500 line-clamp-2">
        {{ product.description }}
      </p>

      <!-- Rating -->
      <div class="flex items-center space-x-1 text-sm text-gray-600">
        <div class="flex items-center">
          <div v-for="i in 5" :key="i" class="relative">
            <!-- Background star (gray) -->
            <Star class="w-4 h-4 text-gray-300" />

            <!-- Filled star (yellow) with width based on rating -->
            <div
              class="absolute top-0 left-0 overflow-hidden"
              :style="{ width: getStarWidth(i) + '%' }"
            >
              <Star class="w-4 h-4 text-yellow-400" />
            </div>
          </div>
        </div>
        <span class="ml-1">({{ product.rating || 0 }})</span>
      </div>

      <!-- Price & Add to Cart -->
      <div class="flex justify-between items-center">
        <!-- Price -->
        <div>
          <span
            v-if="product.discountPercentage"
            class="text-sm text-gray-500 line-through"
          >
            ${{ product.price.toFixed(2) }}
          </span>
          <span class="text-sm font-bold text-gray-900 ml-1">
            ${{ discountedPrice }}
          </span>
          <span
            v-if="product.discountPercentage"
            class="ml-2 text-sm font-medium text-green-600"
          >
            {{ product.discountPercentage }}% off
          </span>
        </div>

        <!-- Add to Cart Button -->
        <base-button
          size="sm"
          :disabled="product.stock === 0"
          @click.prevent="addToCart"
          aria-label="Add product to cart"
        >
          <ShoppingCart class="w-4 h-4 mr-1" />
          Add
        </base-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCartStore } from "../../stores/cartStore";
import { Product } from "../../types/product";
import BaseButton from "../ui/BaseButton.vue";

// Lucide Icons
import { Star, ShoppingCart } from "lucide-vue-next";

const props = defineProps<{ product: Product }>();

const cartStore = useCartStore();

const discountedPrice = computed(() => {
  const { price, discountPercentage } = props.product;
  return discountPercentage
    ? (price * (1 - discountPercentage / 100)).toFixed(2)
    : price.toFixed(2);
});

const stockStatus = computed(() => {
  const stock = props.product.stock;
  return stock === 0 ? "Out of Stock" : stock < 10 ? "Low Stock" : "In Stock";
});

const stockStatusClass = computed(() => {
  const stock = props.product.stock;
  return stock === 0
    ? "bg-red-100 text-red-800"
    : stock < 10
    ? "bg-yellow-100 text-yellow-800"
    : "bg-green-100 text-green-800";
});

const getStarWidth = (position: number) => {
  const rating = props.product.rating || 0;

  // If the rating is greater than or equal to the position, return 100% (full star)
  if (rating >= position) {
    return 100;
  }

  // If the rating is less than position-1, return 0% (empty star)
  if (rating < position - 1) {
    return 0;
  }

  // For partial stars, calculate the percentage
  return (rating - (position - 1)) * 100;
};

const addToCart = () => {
  if (props.product.stock > 0) {
    cartStore.addToCart(props.product, 1);
  }
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
}
</style>

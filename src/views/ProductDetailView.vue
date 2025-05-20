<template>
  <div class="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
      ></div>
    </div>

    <div
      v-else-if="error"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
    >
      {{ error }}
    </div>

    <div v-else-if="!product" class="text-center py-12">
      <h3 class="text-lg font-medium text-gray-900">Product not found</h3>
      <p class="mt-2 text-gray-500">
        The product you're looking for doesn't exist or has been removed.
      </p>
      <router-link
        to="/products"
        class="mt-4 inline-flex items-center text-blue-600 hover:text-blue-500"
      >
        <ArrowLeft class="w-4 h-4 mr-1" />
        Back to Products
      </router-link>
    </div>

    <div v-else>
      <!-- Breadcrumbs -->
      <nav class="flex mb-6" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <router-link to="/" class="text-gray-600 hover:text-gray-900"
              >Home</router-link
            >
          </li>
          <li>
            <div class="flex items-center">
              <ChevronRight class="w-4 h-4 text-gray-400" />
              <router-link
                to="/products"
                class="ml-1 text-gray-600 hover:text-gray-900 md:ml-2"
                >Products</router-link
              >
            </div>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <ChevronRight class="w-4 h-4 text-gray-400" />
              <span class="ml-1 text-gray-500 md:ml-2 line-clamp-1">{{
                product.title
              }}</span>
            </div>
          </li>
        </ol>
      </nav>

      <!-- Product Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Images -->
        <div>
          <div
            class="w-full h-80 overflow-hidden rounded-lg bg-gray-200 mb-4 flex items-center justify-center"
          >
            <img
              :src="currentImage"
              :alt="product.title"
              class="max-w-full max-h-72 object-cover"
            />
          </div>
          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="(image, index) in product.images"
              :key="index"
              @click="currentImage = image"
              class="aspect-w-1 aspect-h-1 overflow-hidden rounded-md"
              :class="{ 'ring-2 ring-blue-500': currentImage === image }"
            >
              <div class="h-16 flex items-center justify-center">
                <img
                  :src="image"
                  :alt="`${product.title} thumbnail ${index + 1}`"
                  class="max-h-14 max-w-full object-contain"
                />
              </div>
            </button>
          </div>
        </div>

        <!-- Product Info -->
        <div>
          <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">
            {{ product.title }}
          </h1>

          <div class="mt-2 flex items-center">
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
              <span class="ml-1 text-sm text-gray-600"
                >({{ product.rating || 0 }})</span
              >
            </div>
          </div>

          <div class="mt-4 flex items-center">
            <p class="text-2xl font-bold text-gray-900">
              ${{ discountedPrice }}
            </p>
            <p
              v-if="product.discountPercentage"
              class="ml-2 text-base text-gray-500 line-through"
            >
              ${{ product.price.toFixed(2) }}
            </p>
            <p
              v-if="product.discountPercentage"
              class="ml-2 text-sm font-medium text-green-600"
            >
              {{ product.discountPercentage }}% off
            </p>
          </div>

          <div class="mt-4">
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              :class="stockStatusClass"
            >
              {{ stockStatus }}
            </span>
          </div>

          <div class="mt-6">
            <h3 class="text-sm font-medium text-gray-900">Description</h3>
            <p class="mt-2 text-base text-gray-700">
              {{ product.description }}
            </p>
          </div>

          <div class="mt-6">
            <div class="flex items-center">
              <h3 class="text-sm font-medium text-gray-900">Brand:</h3>
              <p class="ml-2 text-sm text-gray-700">{{ product.brand }}</p>
            </div>
            <div class="flex items-center mt-2">
              <h3 class="text-sm font-medium text-gray-900">Category:</h3>
              <p class="ml-2 text-sm text-gray-700">{{ product.category }}</p>
            </div>
          </div>

          <div class="mt-8">
            <div class="flex items-center">
              <div class="mr-4">
                <label
                  for="quantity"
                  class="block text-sm font-medium text-gray-700"
                  >Quantity</label
                >
                <div class="mt-1 flex rounded-md shadow-sm">
                  <button
                    @click="decrementQuantity"
                    :disabled="quantity <= 1"
                    class="inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
                  >
                    <Minus class="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    v-model="quantity"
                    min="1"
                    :max="product.stock"
                    class="block w-16 min-w-0 rounded-none border-gray-300 text-center focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  <button
                    @click="incrementQuantity"
                    :disabled="quantity >= product.stock"
                    class="inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
                  >
                    <Plus class="h-4 w-4" />
                  </button>
                </div>
              </div>

              <base-button
                variant="primary"
                size="lg"
                class="flex-1"
                :disabled="product.stock === 0"
                @click="addToCart"
              >
                Add to Cart
              </base-button>
            </div>
          </div>

          <p v-if="cartError" class="mt-2 text-sm text-red-600">
            {{ cartError }}
          </p>
        </div>
      </div>

      <!-- Related Products -->
      <div class="mt-16">
        <h2 class="text-xl font-bold text-gray-900 mb-6">Related Products</h2>
        <div v-if="relatedProducts.length === 0" class="text-center py-6">
          <p class="text-gray-500">No related products found</p>
        </div>
        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <product-card
            v-for="relatedProduct in relatedProducts"
            :key="relatedProduct.id"
            :product="relatedProduct"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "../stores/productStore";
import { useCartStore } from "../stores/cartStore";
import ProductCard from "../components/product/ProductCard.vue";
import BaseButton from "../components/ui/BaseButton.vue";
import { ArrowLeft, ChevronRight, Minus, Plus, Star } from "lucide-vue-next";

const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();

const loading = ref(false);
const error = ref<string | null>(null);
const quantity = ref(1);
const currentImage = ref("");

const productId = computed(() => parseInt(route.params.id as string));
const product = computed(() => productStore.getProductById(productId.value));
const relatedProducts = computed(() =>
  product.value ? productStore.getRelatedProducts(product.value) : []
);

const discountedPrice = computed(() => {
  if (product.value?.discountPercentage) {
    return (
      product.value.price *
      (1 - product.value.discountPercentage / 100)
    ).toFixed(2);
  }
  return product.value?.price.toFixed(2) || "0.00";
});

const stockStatus = computed(() => {
  if (!product.value) return "";
  if (product.value.stock === 0) return "Out of Stock";
  if (product.value.stock < 10) return "Low Stock";
  return "In Stock";
});

const stockStatusClass = computed(() => {
  if (!product.value) return "";
  if (product.value.stock === 0) return "bg-red-100 text-red-800";
  if (product.value.stock < 10) return "bg-yellow-100 text-yellow-800";
  return "bg-green-100 text-green-800";
});

const cartError = computed(() => cartStore.error);

const incrementQuantity = () => {
  if (product.value && quantity.value < product.value.stock) quantity.value++;
};

const decrementQuantity = () => {
  if (quantity.value > 1) quantity.value--;
};

const getStarWidth = (position: number) => {
  const rating = product.value?.rating || 0;

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
  if (product.value) cartStore.addToCart(product.value, quantity.value);
};

watch(
  () => product.value,
  (newProduct) => {
    if (newProduct && newProduct.images.length > 0) {
      currentImage.value = newProduct.thumbnail;
    }
    quantity.value = 1;
  },
  { immediate: true }
);

onMounted(() => {
  if (product.value) {
    document.title = `${product.value.title} | Vue E-Commerce`;
  }
});
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

<template>
  <section class="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <Loader2 class="w-10 h-10 text-blue-500 animate-spin" />
    </div>

    <!-- Empty Cart -->
    <div
      v-else-if="items.length === 0"
      class="flex flex-col items-center justify-center bg-white rounded-lg shadow p-10 text-center"
    >
      <ShoppingCart class="w-12 h-12 text-gray-400 mb-4" />
      <h2 class="text-xl font-semibold text-gray-800">Your cart is empty</h2>
      <p class="text-gray-500 mt-2">Add items to get started</p>
      <router-link
        to="/products"
        class="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition"
      >
        <ArrowLeft class="w-4 h-4" />
        Continue Shopping
      </router-link>
    </div>

    <!-- Cart with Items -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Item List -->
      <section class="lg:col-span-2 space-y-6">
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <header class="p-6 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900">
              Items in Cart ({{ totalItems }})
            </h2>
          </header>

          <div class="divide-y divide-gray-100">
            <CartItem
              v-for="item in items"
              :key="item.product.id"
              :item="item"
            />
          </div>

          <footer
            class="flex justify-between items-center p-6 border-t border-gray-200"
          >
            <router-link
              to="/products"
              class="text-blue-600 hover:text-blue-500 font-medium"
            >
              <ArrowLeft class="inline w-4 h-4 mr-1" /> Keep Shopping
            </router-link>
            <BaseButton variant="outline" @click="clearCart">
              <Trash class="w-4 h-4 mr-1" /> Clear Cart
            </BaseButton>
          </footer>
        </div>
      </section>

      <!-- Summary -->
      <aside>
        <CartSummary />
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCartStore } from "../stores/cartStore";
import CartItem from "../components/cart/CartItem.vue";
import CartSummary from "../components/cart/CartSummary.vue";
import BaseButton from "../components/ui/BaseButton.vue";

import { ShoppingCart, Loader2, ArrowLeft, Trash } from "lucide-vue-next";

const cartStore = useCartStore();

const items = computed(() => cartStore.items);
const loading = computed(() => cartStore.loading);
const totalItems = computed(() => cartStore.totalItems);

const clearCart = () => {
  if (confirm("Are you sure you want to clear your cart?")) {
    cartStore.clearCart();
  }
};
</script>

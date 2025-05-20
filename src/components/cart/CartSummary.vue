<template>
  <aside class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
    <div class="flex items-center gap-2 text-xl font-semibold text-gray-900">
      <Receipt class="w-5 h-5 text-gray-500" />
      <h2>Order Summary</h2>
    </div>

    <div class="mt-6 space-y-4 text-sm text-gray-700">
      <div class="flex justify-between items-center">
        <span class="flex items-center gap-1">
          <DollarSign class="w-4 h-4 text-gray-400" /> Subtotal
        </span>
        <span class="font-medium text-gray-900"
          >${{ subtotal.toFixed(2) }}</span
        >
      </div>

      <div class="flex justify-between items-center">
        <span class="flex items-center gap-1">
          <Truck class="w-4 h-4 text-gray-400" /> Shipping
        </span>
        <span class="font-medium text-gray-900"
          >${{ shipping.toFixed(2) }}</span
        >
      </div>

      <div class="flex justify-between items-center">
        <span class="flex items-center gap-1">
          <Percent class="w-4 h-4 text-gray-400" /> Tax (8%)
        </span>
        <span class="font-medium text-gray-900">${{ tax.toFixed(2) }}</span>
      </div>

      <div
        class="border-t border-gray-200 pt-4 flex justify-between items-center text-base font-semibold text-gray-900"
      >
        <span class="flex items-center gap-1">
          <Wallet class="w-5 h-5 text-gray-500" /> Total
        </span>
        <span>${{ total.toFixed(2) }}</span>
      </div>
    </div>

    <div class="mt-6">
      <base-button
        class="w-full"
        size="lg"
        :disabled="!hasItems"
        variant="primary"
      >
        Proceed to Checkout
      </base-button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCartStore } from "../../stores/cartStore";
import BaseButton from "../ui/BaseButton.vue";

// Lucide Icons
import { DollarSign, Truck, Percent, Wallet, Receipt } from "lucide-vue-next";

const cartStore = useCartStore();

const subtotal = computed(() => cartStore.totalPrice);
const shipping = computed(() => (subtotal.value > 100 ? 0 : 10));
const tax = computed(() => subtotal.value * 0.08);
const total = computed(() => subtotal.value + shipping.value + tax.value);
const hasItems = computed(() => cartStore.totalItems > 0);
</script>

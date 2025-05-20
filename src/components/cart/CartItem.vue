<template>
  <div class="flex items-center py-6 border-b border-gray-100 px-2">
    <!-- Product Image -->
    <div
      class="h-24 w-24 flex-shrink-0 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center"
    >
      <img
        :src="item.product.thumbnail"
        :alt="item.product.title"
        class="max-h-20 object-contain"
      />
    </div>

    <!-- Details -->
    <div class="ml-6 flex-1">
      <!-- Title and Price -->
      <div class="flex justify-between items-start mb-2">
        <div>
          <router-link
            :to="`/product/${item.product.id}`"
            class="text-base font-medium text-gray-900 hover:underline"
          >
            {{ item.product.title }}
          </router-link>
          <p class="text-sm text-gray-500">{{ item.product.brand }}</p>
        </div>
        <p class="text-base font-semibold text-gray-900">
          ${{ totalPrice.toFixed(2) }}
        </p>
      </div>

      <!-- Quantity Controls & Remove -->
      <div class="flex justify-between items-center">
        <!-- Quantity -->
        <div class="flex items-center">
          <span class="mr-2 text-sm text-gray-500">Qty</span>
          <div
            class="flex items-center border border-gray-300 rounded-md overflow-hidden"
          >
            <button
              @click="decrementQuantity"
              class="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-40"
              :disabled="item.quantity <= 1"
            >
              <Minus class="w-4 h-4" />
            </button>
            <input
              :id="`quantity-${item.product.id}`"
              type="number"
              :value="item.quantity"
              min="1"
              :max="item.product.stock"
              class="w-12 border-x border-gray-300 text-center py-1 text-sm"
              @change="onInputChange"
              aria-label="Quantity"
            />
            <button
              @click="incrementQuantity"
              class="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-40"
              :disabled="item.quantity >= item.product.stock"
            >
              <Plus class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Remove -->
        <button
          class="text-sm font-medium text-red-600 hover:text-red-500 flex items-center gap-1"
          @click="removeItem"
        >
          <Trash2 class="w-4 h-4" /> Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { CartItem } from "../../types/cart";
import { useCartStore } from "../../stores/cartStore";
import { Minus, Plus, Trash2 } from "lucide-vue-next";

const props = defineProps<{ item: CartItem }>();

const cartStore = useCartStore();

const unitPrice = computed(() => {
  const { price, discountPercentage } = props.item.product;
  return discountPercentage ? price * (1 - discountPercentage / 100) : price;
});

const totalPrice = computed(() => unitPrice.value * props.item.quantity);

const updateQuantity = (quantity: number) => {
  const { id, stock } = props.item.product;
  if (quantity >= 1 && quantity <= stock) {
    cartStore.updateQuantity(id, quantity);
  }
};

const incrementQuantity = () => {
  updateQuantity(props.item.quantity + 1);
};

const decrementQuantity = () => {
  updateQuantity(props.item.quantity - 1);
};

const onInputChange = (e: Event) => {
  const value = parseInt((e.target as HTMLInputElement).value);
  if (!isNaN(value)) updateQuantity(value);
};

const removeItem = () => {
  cartStore.removeFromCart(props.item.product.id);
};
</script>

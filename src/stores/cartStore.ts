import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { CartItem } from '../types/cart';
import { Product } from '../types/product';

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref<CartItem[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  
  // Getters
  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0);
  });
  
  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => {
      const price = item.product.discountPercentage 
        ? item.product.price * (1 - item.product.discountPercentage / 100) 
        : item.product.price;
      return total + (price * item.quantity);
    }, 0);
  });
  
  const isInCart = computed(() => {
    return (productId: number) => items.value.some(item => item.product.id === productId);
  });
  
  // Actions
  function addToCart(product: Product, quantity: number = 1) {
    const existingItem = items.value.find(item => item.product.id === product.id);
    
    if (existingItem) {
      // Check if adding more would exceed stock
      if (existingItem.quantity + quantity > product.stock) {
        error.value = `Cannot add more than ${product.stock} items to cart`;
        return false;
      }
      existingItem.quantity += quantity;
    } else {
      // Check if initial quantity would exceed stock
      if (quantity > product.stock) {
        error.value = `Cannot add more than ${product.stock} items to cart`;
        return false;
      }
      items.value.push({ product, quantity });
    }
    
    // Save cart to localStorage
    saveCart();
    return true;
  }
  
  function removeFromCart(productId: number) {
    const index = items.value.findIndex(item => item.product.id === productId);
    if (index !== -1) {
      items.value.splice(index, 1);
      saveCart();
    }
  }
  
  function updateQuantity(productId: number, quantity: number) {
    const item = items.value.find(item => item.product.id === productId);
    if (item) {
      // Check if new quantity would exceed stock
      if (quantity > item.product.stock) {
        error.value = `Cannot add more than ${item.product.stock} items to cart`;
        return false;
      }
      
      if (quantity <= 0) {
        removeFromCart(productId);
      } else {
        item.quantity = quantity;
        saveCart();
      }
      return true;
    }
    return false;
  }
  
  function clearCart() {
    items.value = [];
    saveCart();
  }
  
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(items.value));
  }
  
  function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        items.value = JSON.parse(savedCart);
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    }
  }
  
  // Initialize cart from localStorage
  loadCart();
  
  return {
    // State
    items,
    loading,
    error,
    
    // Getters
    totalItems,
    totalPrice,
    isInCart,
    
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loadCart
  };
});

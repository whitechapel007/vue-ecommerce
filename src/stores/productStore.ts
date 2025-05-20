import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { Product, ProductFilter, SortOption } from "../types/product";
import { products, getCategories } from "../mocks/products";

export const useProductStore = defineStore("products", () => {
  // State
  const allProducts = ref<Product[]>(products);
  const categories = ref<string[]>(getCategories());
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const filter = ref<ProductFilter>({});
  const sortBy = ref<SortOption>("newest");
  const currentPage = ref<number>(1);
  const itemsPerPage = ref<number>(8);
  const searchQuery = ref<string>("");

  // Getters
  const filteredProducts = computed(() => {
    let result = [...allProducts.value];

    // Apply category filter
    if (filter.value.category) {
      result = result.filter(
        (product) => product.category === filter.value.category
      );
    }

    // Apply price range filter
    if (filter.value.minPrice !== undefined) {
      result = result.filter(
        (product) => product.price >= (filter.value.minPrice || 0)
      );
    }

    if (filter.value.maxPrice !== undefined) {
      result = result.filter(
        (product) => product.price <= (filter.value.maxPrice || Infinity)
      );
    }

    // Apply search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (sortBy.value) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    return result;
  });

  const paginatedProducts = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value;
    return filteredProducts.value.slice(
      startIndex,
      startIndex + itemsPerPage.value
    );
  });

  const totalPages = computed(() => {
    return Math.ceil(filteredProducts.value.length / itemsPerPage.value);
  });

  // Actions
  function setFilter(newFilter: ProductFilter) {
    filter.value = { ...filter.value, ...newFilter };
    currentPage.value = 1; // Reset to first page when filter changes
  }

  function setSortBy(option: SortOption) {
    sortBy.value = option;
  }

  function setPage(page: number) {
    currentPage.value = page;
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query;
    currentPage.value = 1; // Reset to first page when search changes
  }

  function getProductById(id: number): Product | undefined {
    return allProducts.value.find((product) => product.id === id);
  }

  function getRelatedProducts(product: Product, limit: number = 4): Product[] {
    return allProducts.value
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, limit);
  }

  return {
    // State
    allProducts,
    categories,
    loading,
    error,
    filter,
    sortBy,
    currentPage,
    itemsPerPage,
    searchQuery,

    // Getters
    filteredProducts,
    paginatedProducts,
    totalPages,

    // Actions
    setFilter,
    setSortBy,
    setPage,
    setSearchQuery,
    getProductById,
    getRelatedProducts,
  };
});

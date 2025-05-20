<template>
  <div
    class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
  >
    <!-- Mobile Pagination -->
    <div class="flex flex-1 justify-between sm:hidden">
      <base-button
        variant="outline"
        :disabled="currentPage === 1"
        @click="onPageChange(currentPage - 1)"
      >
        Previous
      </base-button>
      <base-button
        variant="outline"
        :disabled="currentPage === totalPages"
        @click="onPageChange(currentPage + 1)"
      >
        Next
      </base-button>
    </div>

    <!-- Desktop Pagination -->
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <p class="text-sm text-gray-700">
        Showing
        <span class="font-medium">{{ startItem }}</span>
        to
        <span class="font-medium">{{ endItem }}</span>
        of
        <span class="font-medium">{{ totalItems }}</span>
        results
      </p>

      <div v-if="totalPages > 1">
        <nav
          class="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <!-- Previous -->
          <button
            @click="onPageChange(currentPage - 1)"
            :disabled="currentPage === 1"
            class="inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
          >
            <span class="sr-only">Previous</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <!-- Page Numbers -->
          <template v-for="page in displayedPages" :key="page">
            <button
              v-if="page !== '...'"
              @click="onPageChange(Number(page))"
              :class="[
                Number(page) === currentPage
                  ? 'z-10 bg-blue-600 text-white'
                  : 'text-gray-900 hover:bg-gray-50',
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20',
              ]"
            >
              {{ page }}
            </button>
            <span
              v-else
              class="inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300"
            >
              ...
            </span>
          </template>

          <!-- Next -->
          <button
            @click="onPageChange(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
          >
            <span class="sr-only">Next</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import BaseButton from "../ui/BaseButton.vue";

const props = defineProps<{
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}>();

const emit = defineEmits<{
  (e: "page-change", page: number): void;
}>();

const startItem = computed(
  () => (props.currentPage - 1) * props.itemsPerPage + 1
);
const endItem = computed(() =>
  Math.min(props.currentPage * props.itemsPerPage, props.totalItems)
);

const displayedPages = computed(() => {
  const pages: (number | string)[] = [];
  if (props.totalPages <= 7) {
    for (let i = 1; i <= props.totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    let start = Math.max(2, props.currentPage - 1);
    let end = Math.min(props.totalPages - 1, props.currentPage + 1);
    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < props.totalPages - 1) pages.push("...");
    pages.push(props.totalPages);
  }
  return pages;
});

const onPageChange = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit("page-change", page);
  }
};
</script>

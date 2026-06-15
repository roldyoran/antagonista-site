<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  searchTerm: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update:searchTerm', value: string): void;
}>();

const hasText = computed(() => props.searchTerm.length > 0);

const clearSearch = () => {
  emit('update:searchTerm', '');
};
</script>

<template>
  <div class="relative w-full max-w-md">
    <input
      id="search"
      type="text"
      :value="searchTerm"
      @input="emit('update:searchTerm', ($event.target as HTMLInputElement).value)"
      placeholder="Buscar personaje..."
      class="w-full py-3 pl-11 pr-10 border-2 rounded-xl
        transition-all duration-300 outline-none
        bg-surface/40 border-surface-light
        placeholder:text-text-muted/40 placeholder:tracking-wider
        focus:border-accent focus:bg-surface/80
        focus:shadow-lg focus:shadow-red-600/10
        font-body font-medium tracking-wider text-sm"
    />

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="absolute left-3.5 top-1/2 -translate-y-1/2
        text-text-muted/50 w-5 h-5 pointer-events-none
        transition-colors duration-300"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
      <path d="M21 21l-6 -6" />
    </svg>

    <button
      v-if="hasText"
      @click="clearSearch"
      class="absolute right-3 top-1/2 -translate-y-1/2
        text-text-muted/50 hover:text-accent
        transition-colors duration-200 p-1"
      aria-label="Limpiar búsqueda"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M18 6 6 18" /><path d="m6 6 12 12" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
// Configuración del componente de búsqueda
// Maneja el término de búsqueda y emite cambios al componente padre

interface Props {
  searchTerm: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update:searchTerm', value: string): void;
}>();
</script>

// Template con el campo de búsqueda estilizado y un ícono de lupa
<template>
  <div class="relative w-full max-w-4xl">
    <input
      id="search"
      type="text"
      :value="searchTerm"
      @input="emit('update:searchTerm', ($event.target as HTMLInputElement).value)"
      placeholder="Buscar personaje..."
      class="w-full py-2.5 px-10 border-2 rounded-md
        transition-all duration-300 outline-none
        bg-white/80 border-purple-500/70 
        placeholder:text-neutral-500
        focus:border-purple-600 focus:bg-white
        focus:shadow-lg focus:shadow-purple-500/20
        dark:bg-neutral-900/80 dark:border-purple-600/70
        dark:placeholder:text-neutral-400 dark:text-white
        dark:focus:bg-neutral-900 dark:focus:border-purple-500
        dark:focus:shadow-purple-900/30"
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
      class="absolute left-3 top-1/2 -translate-y-1/2
        text-purple-600/70 dark:text-purple-400/70
        w-5 h-5 pointer-events-none"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
      <path d="M21 21l-6 -6" />
    </svg>
  </div>
</template>

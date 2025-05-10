<script setup lang="ts">
// Definición de props y emisiones para el toggle de filtrado
// Permite alternar entre mostrar todos los personajes o solo los votados


interface Props {
  showOnlyVotes: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update:showOnlyVotes', value: boolean): void;
}>();
</script>

// Template con el botón de alternancia que cambia de color según el estado
<template>
  <button
    @click="emit('update:showOnlyVotes', !showOnlyVotes)"
    class="relative group font-bold px-6 py-2.5 border-2 rounded-md 
      transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
    :class="[
      showOnlyVotes
        ? 'bg-cyan-900/20 border-cyan-500 text-cyan-500 hover:text-cyan-400 dark:text-cyan-400 dark:border-cyan-400'
        : 'bg-purple-900/20 border-purple-500 text-purple-500 hover:text-purple-400 dark:text-purple-400 dark:border-purple-400'
    ]"
  >
    <span class="inline-block uppercase">
      {{ showOnlyVotes ? 'Mostrar Todos' : 'Mostrar mis votos' }}
    </span>
    <span 
      class="absolute inset-0 -z-10 rounded-md transition-opacity opacity-0 group-hover:opacity-100 blur-xl"
      :class="[
        showOnlyVotes
          ? 'bg-cyan-500/20'
          : 'bg-purple-500/20'
      ]"
    ></span>
  </button>
</template>

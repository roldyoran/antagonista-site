<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface Props {
  showOnlyVotes: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update:showOnlyVotes', value: boolean): void;
}>();
</script>

<template>
  <button
    @click="emit('update:showOnlyVotes', !showOnlyVotes)"
    class="relative group font-bold px-6 py-2.5 border-2 rounded-md 
      transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
      "
    :class="[
      showOnlyVotes
        ? 'bg-cyan-500/10 border-cyan-500 text-cyan-700 hover:bg-cyan-500/20 dark:text-cyan-400 dark:border-cyan-600 dark:hover:shadow-lg dark:hover:shadow-cyan-600/30'
        : 'bg-purple-500/10 border-purple-500 text-purple-700 hover:bg-purple-500/20 dark:text-purple-400 dark:border-purple-600 dark:hover:shadow-lg dark:hover:shadow-purple-600/30'
    ]"
  >
    <span class=" inline-block uppercase">
      {{ showOnlyVotes ? 'Mostrar Todos' : 'Mostrar mis votos' }}
    </span>
    <span 
      class="absolute inset-0 -z-10 rounded-md transition-opacity opacity-0 group-hover:opacity-100"
      :class="[
        showOnlyVotes
          ? 'bg-cyan-400/10 dark:bg-cyan-400/5 blur-lg'
          : 'bg-purple-400/10 dark:bg-purple-400/5 blur-lg'
      ]"
    ></span>
  </button>
</template>

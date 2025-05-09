<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface Props {
  voteStatus: 'idle' | 'loading' | 'success' | 'error';
  selectedCount: number;
  errorMessage?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'submit'): void;
}>();
</script>

<template>
  <div class="flex justify-center min-w-screen mt-20 mb-4">
    <button
      v-if="voteStatus !== 'success'"
      @click="emit('submit')"
      class="relative group text-xl md:text-2xl uppercase font-bold px-9 py-3.5 
        border-2 rounded-md transition-all duration-300
        transform md:skew-x-[-15deg] hover:scale-[1.02] active:scale-[0.98]"
      :class="[
        voteStatus === 'error'
          ? 'bg-red-500/10 border-red-500 text-red-700 cursor-not-allowed dark:text-red-400'
          : voteStatus === 'loading'
            ? 'animate-pulse bg-purple-500/10 border-purple-500 text-purple-700 cursor-wait dark:text-purple-400'
            : selectedCount === 3
              ? 'bg-lime-500/10 border-lime-500 text-lime-700 hover:bg-lime-500/20 dark:text-lime-400 dark:border-lime-600 dark:hover:shadow-lg dark:hover:shadow-lime-600/30'
              : 'bg-neutral-500/10 border-neutral-400 text-neutral-600 cursor-not-allowed dark:text-neutral-400'
      ]"
      :disabled="voteStatus === 'loading' || voteStatus === 'error' || selectedCount !== 3"
    >
      <span class="md:transform md:skew-x-[15deg] inline-block">
        <template v-if="voteStatus === 'loading'">
          Enviando...
        </template>
        <template v-else-if="voteStatus === 'error'">
          {{ errorMessage }}
        </template>
        <template v-else>
          Enviar mis Votos {{ selectedCount }}/3
        </template>
      </span>
      <span 
        v-if="selectedCount === 3 && voteStatus === 'idle'"
        class="absolute inset-0 -z-10 bg-lime-400/10 dark:bg-lime-400/5 
          rounded-md blur-lg transition-opacity opacity-0 group-hover:opacity-100"
      ></span>
    </button>
    
    <div 
      v-else 
      class="relative group text-2xl md:text-3xl border-2 mx-auto px-12 py-6 
        text-center font-bold uppercase rounded-md transition-all duration-300
        transform md:skew-x-[-15deg]
        bg-lime-500/10 border-lime-500 text-lime-700
        dark:text-lime-400 dark:border-lime-600"
    >
      <span class="md:transform md:skew-x-[15deg] inline-block">
        ¡Votos Enviados Exitosamente!
      </span>
      <span 
        class="absolute inset-0 -z-10 bg-lime-400/10 dark:bg-lime-400/5 
          rounded-md blur-lg"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">

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
        rounded-md transition-all duration-300
        transform md:skew-x-[-15deg] hover:scale-105"
      :class="[
        voteStatus === 'error'
          ? 'bg-red-900/20 border-2 border-red-500 text-red-500 dark:text-red-400 dark:border-red-400 hover:text-red-400'
          : voteStatus === 'loading'
            ? 'bg-purple-900/20 border-2 border-purple-500 text-purple-500 dark:text-purple-400 dark:border-purple-400 animate-pulse'
            : selectedCount === 3
              ? 'bg-lime-900/20 border-2 border-lime-500 text-lime-500 dark:text-lime-400 dark:border-lime-400 hover:text-lime-400'
              : 'bg-neutral-900/20 border-2 border-neutral-500 text-neutral-500 dark:text-neutral-400 dark:border-neutral-400 cursor-not-allowed opacity-50'
      ]"
      :disabled="voteStatus === 'loading' || voteStatus === 'error' || selectedCount !== 3"
    >
      <span class="md:transform md:skew-x-[15deg] inline-block relative">
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
        class="absolute inset-0 -z-10 rounded-md transition-opacity opacity-0 group-hover:opacity-100 blur-xl"
        :class="[
          'bg-lime-500/20'
        ]"
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
        class="absolute inset-0 -z-10 rounded-md transition-opacity opacity-0 group-hover:opacity-100
          bg-lime-400/10 dark:bg-lime-400/5 blur-lg"
      ></span>
    </div>
  </div>
</template>

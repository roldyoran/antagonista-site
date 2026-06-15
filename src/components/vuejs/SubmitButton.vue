<script setup lang="ts">

interface Props {
  voteStatus: 'idle' | 'loading' | 'success' | 'error';
  selectedCount: number;
  errorMessage?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'submit'): void;
  (e: 'reset'): void;
}>();
</script>

<template>
  <div class="flex justify-center mt-8 mb-4">
    <button
      v-if="voteStatus !== 'success'"
      @click="emit('submit')"
      class="relative group text-xl md:text-2xl uppercase font-display px-9 py-3.5 
        rounded-lg transition-all duration-300 tracking-wider
        transform md:skew-x-[-15deg] hover:scale-105"
      :class="[
        voteStatus === 'error'
          ? 'bg-red-600/10 border-2 border-red-600 text-red-500'
          : voteStatus === 'loading'
            ? 'bg-accent/10 border-2 border-accent text-accent animate-pulse'
            : selectedCount === 3
              ? 'bg-accent/10 border-2 border-accent text-accent hover:text-accent-glow hover:bg-accent/15'
              : 'bg-surface/20 border-2 border-surface-light text-text-muted cursor-not-allowed opacity-50'
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
    </button>
    
    <div 
      v-else 
      class="flex flex-col items-center gap-4"
    >
      <div 
        class="text-2xl md:text-3xl border-2 mx-auto px-12 py-6 
          text-center font-display uppercase rounded-lg transition-all duration-300
          transform md:skew-x-[-15deg]
          bg-accent/10 border-accent text-accent-glow"
      >
        <span class="md:transform md:skew-x-[15deg] inline-block">
          ¡Votos Enviados!
        </span>
      </div>
      <button
        @click="emit('reset')"
        class="text-sm uppercase tracking-wider text-text-muted hover:text-accent transition-colors font-body font-semibold"
      >
        Votar de nuevo
      </button>
    </div>
  </div>
</template>

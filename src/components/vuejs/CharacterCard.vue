<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  id: number;
  name: string;
  image: string;
  isSelected: boolean;
  rank?: number;
  delay: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'vote'): void;
}>();

// Clases computadas para el estilo de la tarjeta
const cardClasses = computed(() => {
  // Calcula las clases CSS según el estado de selección
  return `group overflow-hidden relative cursor-pointer border-2 rounded-lg
    transition-colors duration-300
    ${props.isSelected
      ? 'bg-purple-500/10 border-purple-500 shadow-lg shadow-purple-500/20 dark:shadow-purple-900/30'
      : 'bg-white/80 border-neutral-200 hover:border-purple-500/70 dark:bg-neutral-900/80 dark:border-neutral-800 dark:hover:border-purple-500'
    }`;
});
</script>

// Template que muestra la tarjeta del personaje con su imagen y ranking
<template>
  <li :class="cardClasses" :id="`CardCharacter${id}`" @click="emit('vote')">
    <div>
      <template v-if="isSelected && rank">
        <span 
          class="absolute top-3 left-3 z-10
            bg-gradient-to-r from-purple-600 to-purple-700
            border border-white/20 text-white font-bold
            text-sm py-1 px-2 rounded-full uppercase tracking-wider
            shadow-lg shadow-purple-500/20
            md:px-3 md:py-1.5 backdrop-blur-sm"
        >
          #{{ rank }} ➜ {{ 4 - rank }}pts
        </span>
      </template>
    </div>
    
    <div class="relative overflow-hidden">
      <img
        :src="image"
        :alt="name"
        width="250"
        height="250"
        loading="lazy"
        :class="`w-full h-56 md:h-72 object-cover transition-[filter] duration-300
          ${isSelected 
            ? 'brightness-110'
            : 'grayscale hover:grayscale-0'
          }`"
      />
      <div 
        class="absolute inset-0 pointer-events-none"
        :class="[ 
          isSelected
            ? 'bg-gradient-to-t from-purple-500/20 to-transparent'
            : 'bg-gradient-to-t from-neutral-900/20 to-transparent opacity-0'
        ]"
      ></div>
    </div>
  </li>
</template>

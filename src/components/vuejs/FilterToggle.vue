<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  showOnlyVotes: boolean;
  selectedCount?: number;
}

const props = withDefaults(defineProps<Props>(), {
  selectedCount: 0
});
const emit = defineEmits<{
  (e: 'update:showOnlyVotes', value: boolean): void;
}>();

const buttonClasses = computed(() => {
  return `relative group px-5 py-3 rounded-xl border-2
    transition-all duration-300 active:scale-[0.97]
    font-body font-semibold tracking-wider text-sm
    flex items-center gap-2
    ${props.showOnlyVotes
      ? 'border-accent/50 bg-accent/10 text-accent-glow shadow-lg shadow-accent/10'
      : 'border-surface-light bg-surface/30 text-text-muted hover:border-accent/30 hover:text-accent hover:bg-accent/5'
    }`;
});
</script>

<template>
  <button
    @click="emit('update:showOnlyVotes', !showOnlyVotes)"
    :class="buttonClasses"
  >
    <svg
      v-if="showOnlyVotes"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="shrink-0"
    >
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="shrink-0"
    >
      <path d="M3 12h1m8-9v1m8 8h1M5.6 5.6l.7.7m12.1-.7-.7.7" />
      <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
    <span class="uppercase whitespace-nowrap">
      {{ showOnlyVotes ? 'Todos' : 'Mis votos' }}
    </span>
    <span
      v-if="selectedCount > 0 && !showOnlyVotes"
      class="ml-1 px-1.5 py-0.5 text-xs rounded-md bg-accent/20 text-accent-glow"
    >
      {{ selectedCount }}
    </span>
  </button>
</template>

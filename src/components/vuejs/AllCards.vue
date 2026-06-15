<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { characters } from '@data/characters';
import CharacterCard from './CharacterCard.vue';
import SearchBar from './SearchBar.vue';
import FilterToggle from './FilterToggle.vue';

interface SelectedCharacter {
  id: number;
  rank: number;
}

const searchTerm = ref('');
const selectedCharacters = ref<SelectedCharacter[]>([]);
const showOnlyVotes = ref(false);
const cardsGrid = ref<HTMLElement | null>(null);

onMounted(() => {
  const storedVotes = localStorage.getItem('selectedCharacters');
  if (storedVotes) {
    selectedCharacters.value = JSON.parse(storedVotes);
  }
});

watch(selectedCharacters, (newValue) => {
  if (newValue.length > 0) {
    localStorage.setItem('selectedCharacters', JSON.stringify(newValue));
  } else {
    localStorage.removeItem('selectedCharacters');
  }
}, { deep: true });

watch(showOnlyVotes, (val) => {
  if (val && cardsGrid.value) {
    cardsGrid.value.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});

const filteredCharacters = computed(() => {
  return characters.filter((character) => {
    const matchesSearch = character.name.toLowerCase().includes(searchTerm.value.toLowerCase());
    const isSelected = selectedCharacters.value.some((c) => c.id === character.id);
    return matchesSearch && (!showOnlyVotes.value || isSelected);
  });
});

const selectionCount = computed(() => selectedCharacters.value.length);

const handleVote = (id: number) => {
  const existingSelection = selectedCharacters.value.find((c) => c.id === id);

  if (existingSelection) {
    selectedCharacters.value = selectedCharacters.value
      .filter((c) => c.id !== id)
      .map((c) => ({
        ...c,
        rank: c.rank > existingSelection.rank ? c.rank - 1 : c.rank
      }));
  } else if (selectedCharacters.value.length < 3) {
    selectedCharacters.value.push({
      id,
      rank: selectedCharacters.value.length + 1
    });
  }
};

const clearSelection = () => {
  selectedCharacters.value = [];
};
</script>

<template>
  <div class="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pb-6">
      <SearchBar v-model:searchTerm="searchTerm" />
      <FilterToggle v-model:showOnlyVotes="showOnlyVotes" :selected-count="selectionCount" />
    </div>

    <div class="flex items-center justify-center gap-4 pb-8">
      <div class="flex items-center gap-2 text-sm font-body tracking-wider">
        <span class="text-text-muted">Seleccionados:</span>
        <span :class="selectionCount === 3 ? 'text-accent-glow' : 'text-accent'" class="font-bold">
          {{ selectionCount }}/3
        </span>
      </div>
      <button
        v-if="selectionCount > 0"
        @click="clearSelection"
        class="text-xs uppercase tracking-wider text-text-muted hover:text-accent transition-colors font-body font-semibold"
      >
        Limpiar
      </button>
    </div>

    <div ref="cardsGrid">
      <transition-group
        tag="ul"
        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        name="character-list"
      >
        <CharacterCard
          v-for="character in filteredCharacters"
          :key="character.id"
          :id="character.id"
          :name="character.name"
          :image="character.image"
          :is-selected="!!selectedCharacters.find(c => c.id === character.id)"
          :rank="selectedCharacters.find(c => c.id === character.id)?.rank"
          @vote="handleVote(character.id)"
        />
      </transition-group>
    </div>
  </div>
</template>

<style>
.character-list-move,
.character-list-enter-active,
.character-list-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.character-list-enter-from,
.character-list-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.character-list-leave-active {
  position: absolute;
  width: calc(25% - 12px);
}

@media (max-width: 1023px) {
  .character-list-leave-active {
    width: calc(33.333% - 11px);
  }
}

@media (max-width: 639px) {
  .character-list-leave-active {
    width: calc(50% - 8px);
  }
}
</style>

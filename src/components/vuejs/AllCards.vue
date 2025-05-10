<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { characters } from '@data/characters';
import CharacterCard from './CharacterCard.vue';
import SearchBar from './SearchBar.vue';
import FilterToggle from './FilterToggle.vue';
import SubmitButton from './SubmitButton.vue';
import confetti from 'canvas-confetti';

interface SelectedCharacter {
  id: number;
  rank: number;
}

// Estado para manejar la búsqueda y selección de personajes
const searchTerm = ref(''); // Término de búsqueda para filtrar personajes
const selectedCharacters = ref<SelectedCharacter[]>([]); // Array para almacenar los personajes seleccionados
const showOnlyVotes = ref(false); // Bandera para mostrar solo los votos realizados
const voteStatus = ref<'idle' | 'loading' | 'success' | 'error'>('idle'); // Estado del proceso de votación
const errorMessage = ref(''); // Mensaje de error para mostrar al usuario

// Carga los votos guardados al montar el componente
onMounted(() => {
  const storedVotes = localStorage.getItem('selectedCharacters');
  if (storedVotes) {
    const parsedVotes = JSON.parse(storedVotes);
    console.log('Votos cargados del localStorage:', parsedVotes);
    selectedCharacters.value = parsedVotes;
  }
});

// Guarda los votos en localStorage cuando cambian
watch(selectedCharacters, (newValue) => {
  if (newValue.length > 0) {
    console.log('Guardando votos en localStorage:', newValue);
    localStorage.setItem('selectedCharacters', JSON.stringify(newValue));
  } else {
    console.log('Eliminando votos del localStorage');
    localStorage.removeItem('selectedCharacters');
  }
}, { deep: true });

// Propiedad computada para filtrar los personajes según la búsqueda
const filteredCharacters = computed(() => {
  return characters.filter((character) => {
    const matchesSearch = character.name.toLowerCase().includes(searchTerm.value.toLowerCase());
    const isSelected = selectedCharacters.value.some((c) => c.id === character.id);
    return matchesSearch && (!showOnlyVotes.value || isSelected);
  });
});

// Maneja la lógica de votación
const handleVote = (id: number) => {
  const existingSelection = selectedCharacters.value.find((character) => character.id === id);

  if (existingSelection) {
    // If already selected, deselect it and adjust ranks
    selectedCharacters.value = selectedCharacters.value
      .filter((character) => character.id !== id)
      .map((character) => ({
        ...character,
        rank: character.rank > existingSelection.rank ? character.rank - 1 : character.rank
      }));
  } else if (selectedCharacters.value.length < 3) {
    // If not selected and less than 3 selections, add it
    selectedCharacters.value.push({
      id,
      rank: selectedCharacters.value.length + 1
    });
  }
};

// Maneja el envío de votos al servidor
const handleSubmitVotes = async () => {
  if (selectedCharacters.value.length !== 3) return;
  
  voteStatus.value = 'loading';
  try {
    const response = await fetch('/api/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ votes: selectedCharacters.value }),
    });

    if (!response.ok) {
      if (response.status === 302) {
        errorMessage.value = 'Solo puedes votar una vez';
        voteStatus.value = 'error';
      } else {
        errorMessage.value = 'Error al enviar los votos, intenta más tarde';
        voteStatus.value = 'error';
      }
      return;
    }
    
    voteStatus.value = 'success';
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  } catch (error) {
    voteStatus.value = 'error';
    errorMessage.value = 'Error al enviar los votos, intenta más tarde';
  }
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pb-8">
      <SearchBar
        v-model:searchTerm="searchTerm"
      />
      <FilterToggle
        v-model:showOnlyVotes="showOnlyVotes"
      />
    </div>

    <transition-group
      tag="ul"
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-16"
      name="character-list"
    >
      <CharacterCard
        v-for="(character, index) in filteredCharacters"
        :key="character.id"
        :id="character.id"
        :name="character.name"
        :image="character.image"
        :is-selected="!!selectedCharacters.find(c => c.id === character.id)"
        :rank="selectedCharacters.find(c => c.id === character.id)?.rank"
        :delay="index * 0.06"
        @vote="handleVote(character.id)"
      />
    </transition-group>

    <!-- <SubmitButton
      :vote-status="voteStatus"
      :selected-count="selectedCharacters.length"
      :error-message="errorMessage"
      @submit="handleSubmitVotes"
    /> -->
  </div>
</template>

<style>
.character-list-move,
.character-list-enter-active,
.character-list-leave-active {
  transition: all 0.5s ease;
}

.character-list-enter-from,
.character-list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.character-list-leave-active {
  position: absolute;
}
</style>

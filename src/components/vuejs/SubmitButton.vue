<script setup lang="ts">
interface Props {
	voteStatus: 'idle' | 'loading' | 'success' | 'error'
	selectedCount: number
	errorMessage?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
	(e: 'submit'): void
	(e: 'reset'): void
}>()
</script>

<template>
	<div class="mt-8 mb-4 flex justify-center">
		<button
			v-if="voteStatus !== 'success'"
			@click="emit('submit')"
			class="group font-display relative transform rounded-lg px-9 py-3.5 text-xl tracking-wider uppercase transition-all duration-300 hover:scale-105 md:skew-x-[-15deg] md:text-2xl"
			:class="[
				voteStatus === 'error'
					? 'border-2 border-red-600 bg-red-600/10 text-red-500'
					: voteStatus === 'loading'
						? 'bg-accent/10 border-accent text-accent animate-pulse border-2'
						: selectedCount === 3
							? 'bg-accent/10 border-accent text-accent hover:text-accent-glow hover:bg-accent/15 border-2'
							: 'bg-surface/20 border-surface-light text-text-muted cursor-not-allowed border-2 opacity-50'
			]"
			:disabled="voteStatus === 'loading' || voteStatus === 'error' || selectedCount !== 3"
		>
			<span class="relative inline-block md:skew-x-[15deg] md:transform">
				<template v-if="voteStatus === 'loading'"> Enviando... </template>
				<template v-else-if="voteStatus === 'error'">
					{{ errorMessage }}
				</template>
				<template v-else> Enviar mis Votos {{ selectedCount }}/3 </template>
			</span>
		</button>

		<div v-else class="flex flex-col items-center gap-4">
			<div
				class="font-display bg-accent/10 border-accent text-accent-glow mx-auto transform rounded-lg border-2 px-12 py-6 text-center text-2xl uppercase transition-all duration-300 md:skew-x-[-15deg] md:text-3xl"
			>
				<span class="inline-block md:skew-x-[15deg] md:transform"> ¡Votos Enviados! </span>
			</div>
			<button
				@click="emit('reset')"
				class="text-text-muted hover:text-accent font-body text-sm font-semibold tracking-wider uppercase transition-colors"
			>
				Votar de nuevo
			</button>
		</div>
	</div>
</template>

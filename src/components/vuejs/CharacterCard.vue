<script setup lang="ts">
import { computed } from 'vue'

interface Props {
	id: number
	name: string
	image: string
	isSelected: boolean
	rank?: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
	(e: 'vote'): void
}>()

const cardClasses = computed(() => {
	return `group overflow-hidden relative cursor-pointer border-2 rounded-xl
    transition-all duration-300 aspect-square
    ${
		props.isSelected
			? 'border-accent/60 shadow-lg shadow-red-600/20 ring-2 ring-accent/30'
			: 'border-surface-light hover:border-accent/40 hover:shadow-lg hover:shadow-red-600/10'
	}`
})

const badgeClasses = computed(() => {
	if (!props.isSelected || !props.rank) return ''
	const colors = [
		'bg-accent border-accent-glow text-white',
		'bg-accent/80 border-accent text-white',
		'bg-accent/60 border-accent/80 text-white'
	]
	return colors[props.rank - 1] || 'bg-surface border-surface-light text-text-muted'
})
</script>

<template>
	<li :class="cardClasses" :id="`CardCharacter${id}`" @click="emit('vote')">
		<div class="relative h-full w-full overflow-hidden rounded-xl">
			<img
				:src="image"
				:alt="name"
				width="250"
				height="250"
				loading="lazy"
				:class="`h-full w-full object-cover transition-all duration-500 ${
					isSelected
						? 'scale-110 brightness-100 grayscale-0'
						: 'brightness-50 grayscale group-hover:scale-105 group-hover:brightness-100 group-hover:grayscale-0'
				}`"
			/>

			<div
				class="pointer-events-none absolute inset-0 transition-all duration-300"
				:style="[
					isSelected
						? 'background: linear-gradient(to top, rgba(220, 38, 38, 0.4) 0%, transparent 50%);'
						: 'background: linear-gradient(to top, rgba(10, 10, 10, 0.8) 0%, rgba(10, 10, 10, 0.2) 40%, transparent 60%);'
				]"
			></div>

			<template v-if="isSelected && rank">
				<div class="absolute top-2 left-2 z-10">
					<span
						:class="`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-bold tracking-wider uppercase shadow-lg backdrop-blur-sm ${badgeClasses}`"
					>
						<span class="text-sm leading-none">#{{ rank }}</span>
						<span class="opacity-80">+{{ 4 - rank }}pts</span>
					</span>
				</div>
			</template>

			<div v-if="rank && isSelected" class="absolute top-2 right-2 z-10">
				<span
					class="bg-accent border-accent-glow flex h-7 w-7 items-center justify-center rounded-lg border text-white shadow-lg backdrop-blur-sm"
				>
					<svg
						v-if="rank === 1"
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="currentColor"
						stroke="none"
					>
						<path
							d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
						/>
					</svg>
					<svg
						v-else-if="rank === 2"
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<circle cx="12" cy="12" r="10" />
						<path d="m9 12 2 2 4-4" />
					</svg>
					<svg
						v-else
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path
							d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"
						/>
					</svg>
				</span>
			</div>
		</div>
	</li>
</template>

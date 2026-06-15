<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDarkMode = ref(false)

onMounted(() => {
	const savedTheme = localStorage.getItem('theme')
	if (savedTheme) {
		const isDark = savedTheme === 'dark'
		isDarkMode.value = isDark
		document.documentElement.classList.toggle('dark', isDark)
	} else {
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
		isDarkMode.value = prefersDark
		document.documentElement.classList.toggle('dark', prefersDark)
	}
})

const toggleTheme = () => {
	const newTheme = isDarkMode.value ? 'light' : 'dark'
	isDarkMode.value = !isDarkMode.value
	document.documentElement.classList.toggle('dark', newTheme === 'dark')
	localStorage.setItem('theme', newTheme)
}
</script>

<template>
	<button
		type="button"
		aria-label="Cambiar Tema"
		@click="toggleTheme"
		class="group relative rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
	>
		<svg
			v-if="isDarkMode"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="text-white transition-colors hover:text-amber-400"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
			<path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
		</svg>
		<svg
			v-else
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="text-white transition-colors hover:text-amber-300 dark:text-white"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
		</svg>

		<span
			class="absolute inset-0 -z-10 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
			:class="[isDarkMode ? 'bg-amber-400/20 blur-lg' : 'bg-white/10 blur-lg']"
		></span>
	</button>
</template>

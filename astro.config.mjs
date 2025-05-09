import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

// Configuración principal de Astro
export default defineConfig({
  // Integraciones con Vue.js y Tailwind CSS
  integrations: [vue(), tailwind()],
  // Configuración para renderizado en el servidor
  output: 'server',
  // Adaptador para despliegue en Vercel
  adapter: vercel(),
});
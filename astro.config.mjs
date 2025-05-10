import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import clerk from "@clerk/astro";
import vercel from '@astrojs/vercel';

import { dark } from '@clerk/themes'
import { esMX } from '@clerk/localizations'

// Configuración principal de Astro
export default defineConfig({
  // Integraciones con Vue.js y Tailwind CSS y Clerk
  integrations: [vue(), tailwind(), clerk({
    appearance: {
      baseTheme: [dark],
    },
    localization: esMX,
  })],
  // Configuración para renderizado en el servidor
  output: 'server',
  // Adaptador para despliegue en Vercel
  adapter: vercel(),
});
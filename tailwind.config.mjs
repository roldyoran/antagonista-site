/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'primary': 'rgb(122, 28, 143)',
        'secondary': '#1D778F', 
      },
    },
  },
  plugins: [],
}
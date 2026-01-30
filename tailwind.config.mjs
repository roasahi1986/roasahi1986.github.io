/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0a0a',
          card: '#171717',
          text: '#E8E0D4',
          muted: '#A89F94',
          accent: '#3b82f6',
        },
      },
    },
  },
  plugins: [],
};

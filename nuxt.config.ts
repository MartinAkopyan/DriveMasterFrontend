// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
	modules: ['@nuxtjs/tailwindcss', "@primevue/nuxt-module"],
	css: [
    '@/assets/scss/main.scss' // path to your main SCSS file
  ],
	primevue: {
		autoImport: true,
    options: {
      theme: {
        preset: Aura,
        options: {
          prefix: "p",
					darkModeSelector: false
        },
      },
    },
  },
})

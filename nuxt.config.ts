// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primeuix/themes/aura";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  modules: ["@primevue/nuxt-module", "@nuxtjs/tailwindcss", "@nuxtjs/apollo"],
  css: ["@/assets/scss/main.scss"],
  primevue: {
    autoImport: true,
    options: {
      theme: {
        preset: Aura,
        options: {
          prefix: "p",
          darkModeSelector: false,
        },
      },
    },
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'http://127.0.0.1:8000/graphql',
        tokenStorage: 'cookie',
        authType: 'Bearer',
        authHeader: 'Authorization',
        tokenName: 'auth._token.auth',
        httpLinkOptions: {
					headers: {
            'Content-Type': 'application/json',
          },
        },
      },
      auth: {
        httpEndpoint: 'http://127.0.0.1:8000/graphql/auth',
        tokenStorage: 'cookie',
        authType: 'Bearer',
        authHeader: 'Authorization',
        tokenName: 'auth._token.auth',
        httpLinkOptions: {
					headers: {
            'Content-Type': 'application/json',
          },
        },
      },
    },
  },
});

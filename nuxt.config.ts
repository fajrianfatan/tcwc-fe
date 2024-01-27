// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "nuxt-icon",
    
  ],
  
  runtimeConfig: {
    public: {
      baseURL: `${process.env.API_URL || "url/api/api-tcwc/"}`,
      tokenDefault: process.env.TOKEN_DEFAULT
    },
  },
})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    
    
  ],
  
  runtimeConfig: {
    public: {
      baseURL: `${process.env.API_URL || "https://tropicalcyclone.bmkg.go.id/api-tcwc/"}`,
      tokenDefault: process.env.TOKEN_DEFAULT
    },
  },
})

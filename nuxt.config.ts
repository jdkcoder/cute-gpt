// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    rootAttrs: {
      id: 'cute-gpt',
      class: `size-full`
    }
  },
  css: [
    '@unocss/reset/tailwind.css',
    './assets/styles/app.styl',
  ],
  modules: [
    "@vaxee/nuxt",
    "@unocss/nuxt",
    "@vueuse/nuxt",
    "@nuxt/content"
  ],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4
  },
  experimental: {
    viewTransition: true
  }
})

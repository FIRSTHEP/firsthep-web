export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  ssr: false,
  nitro: {
    externals: { external: ['better-sqlite3'] },
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts'],
  devtools: { enabled: false },
  googleFonts: {
    families: {
      Inter: [300, 400, 500, 600, 700],
    },
  },
})

// @ts-check
export default defineNuxtConfig({
  modules: ["@nuxt/ui"],
  css: ["~/assets/tailwind.css"],
  ui: {
    primary: 'green',
    colors: ['green', 'cyan']
  },
  nitro: {
    prerender: { crawlLinks: true },
    storage: {
      clips: {
        driver: "fs",
        base: "./public/clips",
      },
    },
  },
  typescript: {
    strict: true,
    includeWorkspace: true,
  },
  imports: {
    dirs: ["server/api"],
  },
  app: {
    baseURL: "/",
  },
});

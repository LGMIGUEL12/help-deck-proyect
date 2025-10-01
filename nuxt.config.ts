// @ts-check
export default defineNuxtConfig({
  modules: ["@nuxt/ui"],
  css: ["~/assets/tailwind.css"],
  ui: {
    primary: 'green',
    colors: ['green', 'cyan']
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/helpdesk_db',
    jwtSecret: process.env.JWT_SECRET || 'tu_clave_secreta_muy_segura_aqui',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    public: {
      googleClientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID
    }
  },
  nitro: {
    preset: 'netlify',
    prerender: { crawlLinks: true },
    storage: {
      clips: {
        driver: "fs",
        base: "./public/clips",
      },
    },
    routeRules: {
      '/**': {
        headers: {
          'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
          'Cross-Origin-Embedder-Policy': 'unsafe-none'
        }
      }
    }
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

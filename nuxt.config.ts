// @ts-check
export default defineNuxtConfig({
  modules: ["@nuxt/ui"],
  css: ["~/assets/tailwind.css"],
  ui: {
    primary: 'green',
    colors: ['green', 'cyan']
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    public: {
      googleClientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID
    }
  },
  nitro: {
    preset: 'netlify',
    prerender: {
      crawlLinks: false,
      // Rutas específicas a prerrenderizar (solo las que no requieren DB)
      routes: ['/login', '/home']
    },
    storage: {
      clips: {
        driver: "fs",
        base: "./public/clips",
      },
    },
    routeRules: {
      '/**': {
        headers: {
          'Cross-Origin-Opener-Policy': 'unsafe-none',
          'Cross-Origin-Embedder-Policy': 'unsafe-none'
        }
      },
      // No prerrenderizar rutas que requieren autenticación o DB
      '/api/**': { prerender: false },
      '/tickets': { prerender: false },
      '/admin': { prerender: false },
      '/users': { prerender: false }
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

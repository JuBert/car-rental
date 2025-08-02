import { fileURLToPath, URL } from 'url'
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  // ssr: false,
  devtools: { enabled: true },
  app: {
    head: {
      script: [
        { async: true, type: "text/javascript", src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places&loading=async` },
      ],
    },
  },
  css: ['~/app/assets/css/main.css'],
  vite: {
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./', import.meta.url)),
      },
    },
    plugins: [
      tailwindcss(),
    ],
  },
  runtimeConfig: {
    public: {}
  },
})
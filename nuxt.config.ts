// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/image', '@vite-pwa/nuxt'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  devServer: {
    host: '0.0.0.0',
  },
  pwa: {
    // manifest: {
    //   name: "Tsengisa PWA",

    //   short_name: "pwa nuxt",
    //   theme_color:'#8a8a5e',
    //   description: "Arman Abi r.man.abi@gmail.com",
    //   icons: [
    //     {
    //       src: 'image.png',
    //       sizes: "150x150",
    //       type: "image/png"
    //     },
    //   ]

    // },
    // workbox: {
    //   navigateFallback: "/",

    // },
    // devOptions: {
    //   enabled: true,
    //   type: "module"
    // }
    mode: 'development',
    // disable PWA only when in preview mode
    scope: '/',
    // srcDir: './service-worker',
    // filename: 'sw.ts',
    strategies: 'injectManifest',
   // injectRegister: false,
    includeManifestIcons: false,
    manifest: {
      name:"Appy"
    },
    // injectManifest: {
    //   globPatterns: [
    //     '**/*.{js,json,css,html,txt,svg,png,ico,webp,woff,woff2,ttf,eot,otf,wasm}',
    //   ],
    //   globIgnores: ['emojis/**', 'manifest**.webmanifest'],
    // },
    devOptions: {
      enabled: process.env.VITE_DEV_PWA === 'true',
      type: 'module',
    },
  },
});

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
    https:true
  },
  pwa: {
    manifest: {
  
      name: 'Tsengisa',
      short_name: 'Tsengisa',
      description: 'Your App Descriptio',
      theme_color: '#ffffff',  // Customize as needed
      background_color: '#ffffff',  // Customize as needed
      display: 'standalone',
      start_url: '/',
      icons: [
        {
          src: 'logo.png',
          sizes: '48x48',
          type: 'image/png'
        },
        {
          src: 'logo.png',
          sizes: '192x192',
          type: 'image/png'
        },
      
      ]
    },
    registerType: 'autoUpdate',
    workbox: {
      // Optionally configure workbox options here
    }
  }
});

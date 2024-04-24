export default defineNuxtConfig({
  //devtools: { enabled: true }
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          //additionalData: '@use "~/assets/_colors.scss" as *;'
        }
      }
    }
  }
})


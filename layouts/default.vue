<template>
  <div>
    <AppHeader />
    <!-- El slot se utiliza para inyectar el contenido específico de cada página -->
    <slot />
    <AppFooter />
  </div>
</template>

<script setup>
// No es necesario importar los componentes con Nuxt 3, ya que realiza la importación automática
</script>

<style scoped>
h1 {
  font-family: 'FarAwayGalaxy', sans-serif;
}
</style>
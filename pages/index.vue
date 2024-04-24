<template>
  <div class="container">
    <h1>Bienvenido a la página principal</h1>
    <AppAlert class="alert">
      <img src="/favicon.ico" alt="Discover Nuxt 3" class="logo" />
      <p class="description">
        Esta es una página de prueba.
      </p>
      <nuxt-link to="/semaforo" class="link-button">
        <button class="enter-button">Entrar a semáforos</button>
      </nuxt-link>
      <img src="~/assets/favicon.ico" alt="Discover Nuxt 3" class="logo" />
    </AppAlert>
  </div>
</template>

<style>
.container {
  text-align: center;
  margin: auto;
  max-width: 800px;
  padding: 20px;
}

.alert {
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.logo {
  height: 50px;
  width: 50px;
}

.description {
  font-size: 16px;
  color: #333;
}

.link-button {
  text-decoration: none;
}

.enter-button {
  background-color: #4CAF50; /* Green */
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
}

.enter-button:hover {
  background-color: #45a049;
}
</style>

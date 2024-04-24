<template>
  <div class="contenedor-general">
    <div v-for="semaforo in semaforos" :key="semaforo.id" class="semaforo-wrapper">
      <h2 class="titulo-semaforo">{{ semaforo.titulo }}</h2>
      <div class="semaforo-container">
        <div v-for="nivel in niveles" :key="nivel.estado" class="nivel" :class="{ 'activo': semaforo.estado === nivel.estado }">
          <div class="luz" :style="{ backgroundColor: nivel.color }"></div>
          <div class="descripcion">
            <p>{{ nivel.texto }}</p>
            <p class="recomendacion">{{ nivel.recomendacion }}</p>
          </div>
        </div>
      </div>
      <div class="datos-semaforo">
        <p>Estado UV Actual: {{ semaforo.estado }}</p>
        <p>ID del Semaforo: {{ semaforo.id }}</p>
        <p>Última actualización: {{ semaforo.timestamp }}</p>
      </div>
      <button @click="eliminarSemaforo(semaforo.id)" class="btn-eliminar">Eliminar</button>
    </div>
    <button @click="crearSemaforo" class="btn-crear">Crear Nuevo Semaforo</button>
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue';
import { collection, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';

import { useNuxtApp } from '#app';

const nuxtApp = useNuxtApp();
const db = nuxtApp.$db;
const semaforos = ref([]);

// Niveles de estado para la representación visual de los semáforos.
const niveles = [
  { estado: 'extremo', texto: 'Extremo', color: 'purple', recomendacion: 'Precaución extrema' },
  { estado: 'muy-alto', texto: 'Muy Alto', color: 'red', recomendacion: 'Aumente las precauciones' },
  { estado: 'alto', texto: 'Alto', color: 'orange', recomendacion: 'Necesita protección extra' },
  { estado: 'moderado', texto: 'Moderado', color: 'yellow', recomendacion: 'Necesita protección' },
  { estado: 'bajo', texto: 'Bajo', color: 'green', recomendacion: 'Permanecer al exterior' },
];

// Obtener semaforos existentes
onMounted(() => {
  const colRef = collection(db, 'semaforos');
  console.log(colRef)
  onSnapshot(colRef, (snapshot) => {
    console.log(snapshot.docs)
    semaforos.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), timestamp: doc.data().timestamp?.toDate() }));
    console.log(semaforos.value)
  });
});

// Función para crear un nuevo semáforo
const crearSemaforo = async () => {
  const titulo = prompt('Ingrese el título del nuevo semáforo:'); // Esto es solo un ejemplo básico
  if (titulo) {
    const nuevoSemaforo = {
      titulo: titulo,
      estado: 'desconocido', // Estado inicial
      timestamp: serverTimestamp() // Hora actual
    };
    await addDoc(collection(db, 'semaforos'), nuevoSemaforo);
  }
};

// Función para eliinar un semaforo existente
const eliminarSemaforo = async (id) => {
  await deleteDoc(doc(db, 'semaforos', id));
  // La actualización de la lista se maneja automáticamente por onSnapshot
};
</script>

<style scoped>
.contenedor-general {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
}

.semaforo-wrapper {
  border: 2px solid #555;
  background-color: #1e1e1e;
  padding: 20px;
  margin: 20px 0;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.titulo-semaforo {
  color: #EEE;
  font-size: 1.8em;
  margin-bottom: 15px; /* Reducir espacio para acercar al semáforo */
  text-align: center;
}

.semaforo-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Alineación a la izquierda */
  background-color: #333;
  border-radius: 8px;
  padding: 10px; /* Reducción de padding para menos altura */
  gap: 5px; /* Reduce el espacio entre los niveles */
}

.nivel {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%; /* Ocupa el ancho completo del contenedor del semáforo */
}

/* Aplica opacidad reducida y filtro de grises a todo el bloque del nivel cuando no está activo */
.nivel:not(.activo) {
  opacity: 0.2; /* Reduce la opacidad para el nivel completo, afectando tanto a la luz como al texto */
  filter: grayscale(50%); /* Convierte el bloque del nivel entero a escala de grises */
}

/* Asegura que el nivel activo se muestre con plena opacidad y colores vivos */
.nivel.activo {
  opacity: 1; /* Restablece la opacidad completa para el nivel activo */
  filter: none; /* Elimina el filtro de escala de grises para el nivel activo */
}

/* Estilos para la luz activa */
.nivel.activo .luz {
  opacity: 1; /* Restaura la opacidad completa para la luz activa */
  filter: brightness(120%) saturate(120%); /* Aumenta el brillo y la saturación para hacer la luz más vívida */
}

.luz, .descripcion, .recomendacion {
  display: inline-block;
  vertical-align: middle; /* Alineación vertical para texto y luces */
}

.luz {
  border: 2px solid #222;
  border-radius: 50%;
  width: 40px; /* Reducción del tamaño de las luces */
  height: 40px;
}

.descripcion p, .recomendacion {
  color: #CCC;
  margin: 0; /* Elimina márgenes para alinear con su luz */
}

.datos-semaforo {
  color: #BBB;
  text-align: center; /* Centra los datos bajo el semáforo */
  width: 100%;
  margin-top: 15px;
}

.btn-crear, .btn-eliminar {
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
  align-self: center; /* Asegura que el botón esté centrado */
  width: 80%; /* Ajuste de ancho para consistencia */
}

.btn-crear {
  background-color: #4CAF50;
  color: white;
  margin-top: 20px;
}

.btn-eliminar {
  background-color: #F44336;
  color: white;
  width: 50%; /* Ajusta si es necesario para la apariencia */
}

.btn-crear:hover, .btn-eliminar:hover {
  opacity: 0.8;
}
</style>









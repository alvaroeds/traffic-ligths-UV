// plugins/firebase.js
import { defineNuxtPlugin } from '#app';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export default defineNuxtPlugin(nuxtApp => {
  const firebaseConfig = {
    // tu configuración de Firebase
    apiKey: "AIzaSyDIcNyR5GQGf0Kd5iWiT8KacGzi4CsQQho",
    authDomain: "dev-pedidolisto.firebaseapp.com",
    projectId: "dev-pedidolisto",
    storageBucket: "dev-pedidolisto.appspot.com",
    messagingSenderId: "374233244738",
    appId: "1:374233244738:web:810053a2dd8b47271439db",
    measurementId: "G-MHVB2WW0WX"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  nuxtApp.provide('db', db);
});

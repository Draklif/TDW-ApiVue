<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios, { AxiosError } from 'axios'
import Swal from 'sweetalert2'
import router from '@/router'

const username = ref('')
const password = ref('')
const session = ref(false)

const login = async () => {
  try {
    const { data } = await axios.post('https://fakestoreapi.com/auth/login', {
      username: username.value,
      password: password.value
    })
    localStorage.setItem('token', data.token)
    session.value = true
    Swal.fire({
      icon: 'success',
      text: `¡Bienvenido ${username.value}!`,
      toast: true, 
      timer: 4000,
      timerProgressBar: true,
      width: '50%',
      showConfirmButton: false,
      position: 'top'
    })
    router.push({ path: '/products' })
  } catch (error) {
    const err: AxiosError = error as AxiosError
    session.value = false
    if (err.request.status === 400) {
      Swal.fire({
        icon: 'error',
        text: 'Usuario y contraseña incorrecta.',
        toast: true, 
        timer: 4000,
        timerProgressBar: true,
        width: '50%',
        showConfirmButton: false,
        position: 'top'
      })
    }
  } finally {
    username.value = ''
    password.value = ''
  }
}

const logout = async () => {
  localStorage.removeItem('token')
  session.value = false
}

onMounted(() => {
  try {
    logout()
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div v-if="session">
    <router-link to="/products">Ver todos los productos</router-link>
    <br />
    <router-link to="/categories">Ver todas las categorías</router-link>
    <br />
    <br />
    <div><button type="button" class="logout" @click="logout">Cerrar sesión</button></div>
    <router-view></router-view>
  </div>
  <div class="login-container" v-else>
    <form @submit.prevent="login" class="login-form">
      <h2>Iniciar sesión</h2>
      <div class="form-group">
        <label for="username">Usuario:</label>
        <input type="text" id="username" v-model="username" />
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <button type="submit">Iniciar sesión</button>
    </form>
  </div>
  
</template>

<style scoped>
.login-container {
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  max-width: 480px;
  width: 100%;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: .4s;
}

button:hover {
  background-color: #0056b3;
}

.logout {
  background-color: #ff6347; /* Color de fondo */
  color: #ffffff; /* Color del texto */
  border: none; /* Sin borde */
  border-radius: 4px; /* Borde redondeado */
  padding: 10px 20px; /* Espaciado interno */
  cursor: pointer; /* Cambia el cursor al pasar por encima */
  font-size: 16px; /* Tamaño de fuente */
  transition: background-color 0.3s, transform 0.3s; /* Transiciones suaves */
}

.logout:hover {
  background-color: #ff4832; /* Cambia el color de fondo al pasar el cursor */
  transform: scale(1.05); /* Escala ligeramente el botón al pasar el cursor */
}

.logout:active {
  background-color: #d93725; /* Cambia el color de fondo al hacer clic */
}
</style>

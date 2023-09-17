<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import { type Product } from './interfaces/product'
import axios from 'axios'

const products = ref<Product[]>([])

onMounted(async () => {
  try {
    const { data } = await axios.get('https://fakestoreapi.com/products')
    products.value = data
  } catch (error) {
    console.error(error);
  }
})
</script>

<template>
  <router-link to="/products">Ver todos los productos</router-link>
  <br>
  <router-link to="/categories">Ver todas las categorías</router-link>
  <router-view></router-view>
</template>

<style scoped>
</style>

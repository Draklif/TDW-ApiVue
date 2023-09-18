<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const categories: any = ref<[]>([])

onMounted(async () => {
  try {
    const { data } = await axios.get<[]>('https://fakestoreapi.com/products/categories')
    categories.value = data
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <header>
    <h1>Categorías</h1>
  </header>
  <main>
    <br />
    <ul>
      <li v-for="(category, index) in categories" :key="index">
        <router-link :to="`/products/category/${encodeURI(category)}`" class="product-card">
          {{ category.toUpperCase() }}
        </router-link>
      </li>
    </ul>
  </main>
</template>

<style scoped>
header {
  display: flex;
  justify-content: center;
}

header h1 {
  color: black;
  background-color: #ffffff;
  margin: 24px;
  padding: 8px 48px;
  border-radius: 32px;
}

.main {
  padding: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

.product-card {
  display: inline-block;
  padding: 10px 20px;
  background-color: #3498db;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.product-card:hover {
  background-color: #2980b9;
  transform: scale(1.1);
}
</style>

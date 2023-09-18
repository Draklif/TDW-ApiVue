<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const categories = ref<[]>([])

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
  <main>
    <br />
    <ul>
      <li v-for="(category, index) in categories" :key="index">
        <router-link :to="`products/category/${encodeURI(category)}`" class="product-card">
          {{ category }}
        </router-link>
      </li>
    </ul>
  </main>
</template>

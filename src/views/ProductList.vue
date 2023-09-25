<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type Product } from '../interfaces/product'
import ButtonComponent from '../components/ButtonComponent.vue'
import ProductComponent from '../components/ProductComponent.vue'
import axios from 'axios'

const products = ref<Product[]>([])

onMounted(async () => {
  try {
    const { data } = await axios.get('https://fakestoreapi.com/products', {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      }
    })
    products.value = data
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div>
    <header>
      <h1>Catálogo</h1>
    </header>

    <ButtonComponent />

    <br />

    <ProductComponent :products="products" />
  </div>
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
</style>

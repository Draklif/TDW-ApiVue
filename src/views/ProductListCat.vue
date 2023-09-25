<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type Product } from '../interfaces/product'
import { useRoute } from 'vue-router'
import ButtonComponent from '../components/ButtonComponent.vue'
import ProductComponent from '../components/ProductComponent.vue'
import axios from 'axios'

const products = ref<Product[]>([])
const route = useRoute()
const category = ref(route.params.category)

onMounted(async () => {
  try {
    const { data } = await axios.get(`https://fakestoreapi.com/products/category/${category.value}`, {
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
      <h2>{{ category.toString().charAt(0).toUpperCase() + category.toString().slice(1) }}</h2>
    </header>

    <ButtonComponent />

    <br />

    <ProductComponent :products="products" />
  </div>
</template>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

header h1 {
  color: black;
  background-color: #ffffff;
  margin-top: 24px;
  padding: 8px 48px;
  border-radius: 32px;
}

header h2 {
  margin-bottom: 24px;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
}

.product-card {
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  color: black;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 256px;
  max-width: 30%;
}

.product-card:hover {
  background-color: #f5f5f5;
  transform: scale(1.05);
  box-shadow: 0 0 16px rgb(255, 255, 255);
}

.product-image {
  display: flex;
  justify-content: center;
  border-radius: 50%;
  margin: 0 auto;
}

.product-image img {
  width: 128px;
  height: 128px;
  border-radius: 50%;
  box-shadow: 0 0 8px rgb(113, 113, 113);
}

.product-details .price {
  color: green;
  font-size: large;
  font-weight: bolder;
}

.product-details .rating {
  color: rgb(255, 158, 2);
  font-weight: bold;
}

.product-details .votes {
  font-size: small;
  color: rgb(114, 114, 114);
}
</style>

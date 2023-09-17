<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type Product } from '../interfaces/product'
import axios from 'axios'

const products = ref<Product[]>([])

onMounted(async () => { 
  try {
    const { data } = await axios.get('https://fakestoreapi.com/products')
    products.value = data
  } catch(error) {
    console.error(error);
  }
})
</script>

<template>
  <div>
    <header>
      <h1>Lista de Productos</h1>
    </header>
    <section class="container">
      <router-link  v-for="product in products" :key="product.id" :to="`products/${product.id}`" class="product-card">
        <div class="product-image">
          <img :src="product.image" alt="Producto" />
        </div>
        <div class="product-details">
          <h2>{{ product.title }}</h2>
          <span class="price">$ {{ product.price }}</span><br />
          <span class="rating">⭐ {{ product.rating.rate }}</span><span class="votes"> ({{ product.rating.count }} votos)</span>
        </div>
      </router-link>
    </section>
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
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px
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
  color: rgb(114, 114, 114)
}
</style>

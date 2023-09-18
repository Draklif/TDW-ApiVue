<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type Product } from '../interfaces/product'
import { useRoute } from 'vue-router'
import axios from 'axios'

const product = ref<Product>()
const route = useRoute()

onMounted(async () => {
  const productId = route.params.id
  try {
    const { data } = await axios.get(`https://fakestoreapi.com/products/${productId}`)
    product.value = data
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <main>
    <router-link to="/products" class="back-button">⬅ Volver a Catálogo</router-link>
    <div v-if="product">
      <h1>{{ product.title }}</h1>
      <div class="product-image">
        <img :src="product.image" alt="Producto" />
      </div>
      <div class="product-details">
        <h2>Detalles del producto:</h2>
        <router-link :to="`/products/category/${encodeURI(product.category.toString())}`">{{
          product.category.toString().toUpperCase()
        }}</router-link>
        <p>{{ product.description }}</p>
        <br />
        <span class="price">$ {{ product.price }}</span
        ><br />
        <span class="rating">⭐ {{ product.rating.rate }}</span
        ><span class="votes"> ({{ product.rating.count }} votos)</span>
      </div>
    </div>
    <div v-else>
      <p>Cargando producto...</p>
    </div>
  </main>
</template>

<style scoped>
.back-button {
  font-size: large;
  font-weight: bold;
}

.product-image {
  display: flex;
  justify-content: center;
  margin: 0 auto;
}

.product-image img {
  width: 256px;
  box-shadow: 0 0 8px rgb(113, 113, 113);
  transition: all ease 0.5s;
}

.product-image img:hover {
  transform: scale(2.5);
  width: 256px;
  box-shadow: 0 0 256px rgb(199, 199, 199);
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

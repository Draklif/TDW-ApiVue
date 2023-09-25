<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type Product, type NewProduct } from '../interfaces/product'
import { useRoute } from 'vue-router'
import axios from 'axios'
import Swal from 'sweetalert2'
import router from '@/router'

const product = ref<Product>()
const newProduct = ref<NewProduct>({})
const route = useRoute()

let categories: any = {}

const productId = route.params.id

const deleteProduct = async () => {
  try {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar producto',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return axios
          .delete(`https://fakestoreapi.com/products/${productId}`, {
            headers: {
              'Authorization': `${localStorage.getItem('token')}`
            }
          })
          .then((response) => {
            if (response.status !== 200) throw new Error(response.statusText)
            return response.data
          })
          .catch((error) => {
            Swal.showValidationMessage(`Fallo en la petición: ${error}`)
          })
      }
    }).then((result) => {
      if (!result.isConfirmed) return
      Swal.fire({
        text: `Se ha eliminado el producto ${result.value.title}`,
        icon: 'success',
        showConfirmButton: false,
        toast: true,
        timer: 6000,
        timerProgressBar: true,
        position: 'top',
        footer: 'Pero ningún valor se ha modificado en realidad en la BD.',
        width: '50%'
      })
      console.log(result.value)
      router.push({ path: '/products' })
    })
  } catch (error) {
    console.error(error)
  }
}

const modifyProduct = () => {
  Swal.fire({
    title: 'Ingrese el nombre de su producto',
    input: 'text',
    inputAttributes: {
      required: 'required'
    },
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Siguiente',
    preConfirm: (userInput) => {
      newProduct.value.title = userInput
    }
  }).then((result) => {
    if (!result.isConfirmed) return
    Swal.fire({
      title: 'Ingrese la descripcion de su producto',
      input: 'text',
      inputAttributes: {
        required: 'required'
      },
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Siguiente',
      preConfirm: (userInput) => {
        newProduct.value.description = userInput
      }
    }).then((result) => {
      if (!result.isConfirmed) return
      Swal.fire({
        title: 'Ingrese el precio de su producto',
        input: 'number',
        inputAttributes: {
          required: 'required',
          min: '1'
        },
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Siguiente',
        preConfirm: (userInput) => {
          newProduct.value.price = userInput
        }
      }).then((result) => {
        if (!result.isConfirmed) return
        Swal.fire({
          title: 'Seleccione una imagen',
          input: 'file',
          inputAttributes: {
            required: 'required',
            accept: 'image/*'
          },
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Siguiente'
        }).then((result) => {
          if (!result.isConfirmed) return
          Swal.fire({
            title: 'Seleccione una categoría',
            inputOptions: categories,
            input: 'select',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Siguiente',
            showLoaderOnConfirm: true,
            preConfirm: (userInput) => {
              newProduct.value.category = userInput
              return axios
                .put(`https://fakestoreapi.com/products/${productId}`, newProduct.value, {
                  headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                  }
                })
                .then((response) => {
                  if (response.status !== 200) throw new Error(response.statusText)
                  return response.data
                })
                .catch((error) => {
                  Swal.showValidationMessage(`Fallo en la petición: ${error}`)
                })
            }
          }).then((result) => {
            if (!result.isConfirmed) return
            Swal.fire({
              text: `Se ha modificado el producto ${result.value.title}`,
              icon: 'success',
              showConfirmButton: false,
              toast: true,
              timer: 6000,
              timerProgressBar: true,
              position: 'top',
              footer: 'Pero ningún valor se ha modificado en realidad en la BD.',
              width: '50%'
            })
            console.log(result.value)
            router.push({ path: '/products' })
          })
        })
      })
    })
  })
}

onMounted(async () => {
  try {
    const productList = await axios.get(`https://fakestoreapi.com/products/${productId}`, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      }
    })
    product.value = productList.data

    let categoryList = await axios.get<string[]>('https://fakestoreapi.com/products/categories', {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      }
    })
    for (const category of categoryList.data) {
      categories[category] = category.toUpperCase()
    }
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <main>
    <br />
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
      <div class="product-buttons">
        <button @click="deleteProduct" type="button" class="delete">🗑 Eliminar</button>
        <button @click="modifyProduct" type="button" class="modify">✏ Modificar</button>
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

.product-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.product-buttons .delete {
  background-color: #e74c3c;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: large;
  font-weight: bold;
  transition: all ease 0.3s;
}

.product-buttons .delete:hover {
  background-color: #c0392b;
  transform: scale(1.1);
}

.product-buttons .modify {
  background-color: #3498db;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: large;
  font-weight: bold;
  transition: all ease 0.3s;
}

.product-buttons .modify:hover {
  background-color: #2980b9;
  transform: scale(1.1);
}
</style>

<script setup lang="ts">
import Swal from 'sweetalert2'
import { ref, onMounted } from 'vue'
import { type NewProduct } from '../interfaces/product'
import axios from 'axios'

const newProduct = ref<NewProduct>({})

let categories: any = {}

onMounted(async () => {
  try {
    const { data } = await axios.get<string[]>('https://fakestoreapi.com/products/categories')
    for (const category of data) {
      categories[category] = category.toUpperCase()
    }
  } catch (error) {
    console.error(error)
  }
})

const createProduct = () => {
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
                .post('https://fakestoreapi.com/products', newProduct.value)
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
              text: `Se ha creado el producto con id ${result.value.id}`,
              icon: 'success',
              showConfirmButton: false,
              toast: true,
              timer: 6000,
              timerProgressBar: true,
              position: 'top',
              footer: 'Pero ningún valor se ha insertado en realidad en la BD.',
              width: '50%'
            })
            console.log('Creado' + result.value)
          })
        })
      })
    })
  })
}
</script>

<template>
  <section class="container">
    <button type="button" @click="createProduct">+ Crear Producto</button>
  </section>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
}

button {
  padding: 8px 48px;
  border-radius: 32px;
  border: 0;
  background-color: rgb(69, 170, 69);
  transition: all ease 0.3s;
  cursor: pointer;
}

button:hover {
  background-color: rgb(50, 143, 50);
  transform: scale(1.1);
  box-shadow: 0 0 16px rgba(15, 250, 7, 0.363);
}
</style>

import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../views/ProductList.vue'
import ProductDetail from '../views/ProductDetail.vue'
import ProductListCategory from '../views/ProductListCat.vue'
import CategoryList from '../views/CategoryList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/products',
      component: ProductList
    },
    {
      path: '/products/:id',
      component: ProductDetail
    },
    {
      path: '/products/category/:category',
      component: ProductListCategory
    },
    {
      path: '/categories',
      component: CategoryList
    }
  ]
})

export default router

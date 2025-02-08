import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('../views/admin/category/CategoryPage.vue'),
    },
    {
      path: '/category/edit/:id',
      name: 'editcategory',
      component: () => import('../views/admin/category/editCategory.vue'),
      props: true
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('../views/admin/product/ProductPage.vue'),
    },
    {
      path: '/product/create',
      name: 'createProduct',
      component: () => import('../views/admin/product/CreatePage.vue'),
    },
    {
      path: '/product/update/:id',
      name: 'editProduct',
      component: () => import('../views/admin/product/EditProduct.vue'),
    },
  ],
})

export default router

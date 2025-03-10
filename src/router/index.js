import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginPage.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/RegisterPage.vue'),

    },
    {
      path: '/authentication',
      name: 'authentication',
      component: () => import('../views/auth/AuthenticatePage.vue'),

    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartPage.vue'),
    },
    {
      path: '/checkout/:order_code',
      name: 'checkout',
      component: () => import('../views/CheckoutPage.vue'),
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../views/OrderPage.vue'),
    },
    {
      path: '/order/details/:order_code',
      name: 'orderdetails',
      component: () => import('../views/OrderDetails.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/admin/dashboard/DashboardPage.vue'),
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
    {
      path: '/admin/orders',
      name: 'orders',
      component: () => import('../views/admin/order/OrderPage.vue'),
    },
    {
      path: '/admin/order/details/:order_code',
      name: 'orderdetails#admin',
      component: () => import('../views/admin/order/OrderDetails.vue'),
    },
  ],
})

export default router

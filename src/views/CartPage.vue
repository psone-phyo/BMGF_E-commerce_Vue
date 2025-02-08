<template>
    <Layout>
    <table class="min-w-full divide-y divide-gray-200 mt-10">
      <thead class="bg-gray-50">
        <tr>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Id
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Photo
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Name
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Unit Price
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Quantity
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Total
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-if="!existed">
            <td colspan="6" class="text-center">No item in cart</td>
        </tr>

        <tr v-for="product in CartItems" :key="product.id" v-else>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ product.product_id }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <img :src="product.photo" alt="Product Image" class="w-16 h-16" />
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ product.name }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ product.price }} MMK
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ product.count }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ product.price * product.count }} MMK
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex justify-end items-center my-5">
        <Button :disabled="!existed" @click="handleCheckout">Checkout</Button>
    </div>
</Layout>
  </template>
  
  <script setup>
import Button from "primevue/button";
  import Layout from './MasterLayout.vue'
  import { onMounted, ref } from 'vue';
import axiosInstance from "@/utils/axios";
  
  const CartItems = ref([]);
  const existed = ref(false);
  const getCart = () => {
    if (localStorage.getItem('cart')) {
      CartItems.value = JSON.parse(localStorage.getItem('cart')) || [];
      CartItems.value.length > 0 ? existed.value=true : ''
    }
  };

  const handleCheckout = async () => {
    try{
        const res = await axiosInstance.post('/api/order/create', JSON.parse(localStorage.getItem('cart')))
        console.log(res);
    }catch(error){
        console.log(error);
    }
  }
  
  onMounted(() => {
    getCart();
  });
  </script>
  
  <style></style>
  
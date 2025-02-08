<template>
  <Layout>
    <div class="my-10 gap-3">
      <div class="">
        <div class="flex justify-between text-lg mb-5">
          <router-link :to="{ name: 'createProduct' }">
            <span class="bg-white p-2 rounded-md hover:bg-gray-100"
              >Create Product</span
            >
          </router-link>
          <form @submit.prevent="handleSearch">
            <input type="text" name="" id="" class="p-1 rounded-md mr-2" v-model="searchKey">
            <button class="p-1 bg-green-400 hover:bg-green-500 rounded-md" >Search</button>
          </form>
        </div>
        <table class="min-w-full divide-y divide-gray-200">
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
                Description
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Stock
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="product in productList" :key="product.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ product.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <img :src="product.photo" alt="" style="width: 100px;">
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ product.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ product.description }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ product.price }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ product.stock }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ product.category_name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button class="bg-gray-200 p-2 rounded-md mx-2 text-black hover:bg-gray-300" @click="handleEdit(product.id)">Edit</button>
                <button class="bg-red-500 p-2 rounded-md mx-2 text-black hover:bg-red-600" @click="handleDelete(product.id)" :disabled="btndisabled">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import Button from 'primevue/button';
import Layout from "../MasterLayout.vue";
import { onMounted, ref } from 'vue';
import axiosInstance from '@/utils/axios';
import {useRouter} from 'vue-router'

const router = useRouter();
const category = ref('');
const productList = ref([]);
const btndisabled = ref(false);
const searchKey = ref('');

onMounted(async () => {
    try{
      getproduct();
    }catch(error){
      console.log("error", error);
    }
})

const handleDelete = async(id) => {
  try{
    btndisabled.value = true;
    const res = await axiosInstance.delete(`/api/product/delete/${id}`)
    if (res.data.success){
      getproduct();
      btndisabled.value = false;
    }
  }catch(error){
    console.log("error", error);
    
  }
}

const handleSearch = () => {
  try{    
    getproduct();
  }catch(error){
    console.log(error);
    
  }
  
}

const handleEdit = async(id) => {
  router.push({name: 'editProduct', params: {id: id}})
}

const getproduct = async () => {  
  const res = await axiosInstance.get(`/api/product?searchKey=${searchKey.value}`);
      if (res.data){
        productList.value = res.data.data;
      }
}
</script>

<style></style>

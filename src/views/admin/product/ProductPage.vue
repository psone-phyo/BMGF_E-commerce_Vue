<template>
    <Layout>
      <div class=" my-10 gap-3">
        <div class="">
            <div class="flex justify-end text-lg mb-5">
                <router-link :to="{name: 'createProduct'}">
                    <span class="bg-white p-2 rounded-md hover:bg-gray-100">Create Product</span>
                </router-link>
            </div>
          <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                  <tr>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Id
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Photo
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                  </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="categoryItem in categories" :key="categoryItem.id">
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {{ categoryItem.id }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {{ categoryItem.name }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div class="flex gap-2 justify-center items-center">
                                <router-link :to="{ name: 'editcategory', params: { id: categoryItem.id } }" class="bg-gray-200 text-black p-2 rounded-md">
                                    Edit
                                </router-link>
                                <button class="bg-red-500 text-black p-2 rounded-md" @click="handleDelete(categoryItem.id)">
                                    Delete
                                </button>
                            </div>
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
  const category = ref('');
  const categories = ref([]);
  
  onMounted(async () => {
    try{
        const res = await axiosInstance.get('/api/product');
        console.log(res.data);
        
    }catch (error) {
    console.error("Error fetching: ", error);
    }
  })


  </script>
  
  <style></style>
  
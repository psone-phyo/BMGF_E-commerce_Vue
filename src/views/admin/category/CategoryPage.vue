<template>
    <Layout>
      <div class="grid grid-cols-1 lg:grid-cols-3 my-10 gap-3">
        <div class="col-span-1">
          <form @submit.prevent="handleSubmit" class="flex flex-col">
              <label class="font-bold text-3xl mb-5">Category Name</label>
              <input type="text" v-model="category" class="p-2 text-xl mb-5">
              <Button type="submit">Save</Button>
          </form>
        </div>
        <div class="col-span-2">
          <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                  <tr>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Id
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category Name
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
  
  // Fetch categories on mount
  onMounted(async () => {
    try {
      const res = await axiosInstance.get('/api/category');
      categories.value= res.data.data; // Update categories after fetching from API
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  });
  
  // Handle form submission
  const handleSubmit = async () => {
    try {
      const res = await axiosInstance.post('/api/category/create', { name: category.value });
      if (res.data){
        const fetchRes = await axiosInstance.get('/api/category');
        categories.value = fetchRes.data.data;
        category.value='';
      }  
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleDelete = async (id) => {
    try{
        const res = await axiosInstance.delete(`/api/category/delete/${id}`);
        if (res.data.success){
            const fetchRes = await axiosInstance.get('/api/category');
            categories.value = fetchRes.data.data;
        }
        
    }catch (error) {
      console.error('Error creating category:', error);
    }
  }


  </script>
  
  <style></style>
  
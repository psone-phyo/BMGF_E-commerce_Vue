<template>
    <Layout>
      <h1 class="text-center font-bold text-3xl mb-5">Create Product</h1>
      <div class="flex justify-center items-center">
        <form class="flex flex-col w-full lg:w-1/2">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-3">
            <div class="flex flex-col">
              <label class="text-lg mb-1">Category Name</label>
              <input
                type="text"
                v-model="category"
                class="p-2 mb-5 rounded-md text-md"
                placeholder="Enter Name"

              />
            </div>
            <div class="flex flex-col">
              <label class="text-lg mb-1">Price</label>
              <input
                type="text"
                v-model="price"
                class="p-2 mb-5 rounded-md text-md"
                placeholder="Enter Price"
              />
            </div>
          </div>
  
          <div class="flex flex-col">
            <label class="text-lg mb-1">Description</label>
            <textarea
              v-model="description"
              class="p-2 mb-5 rounded-md text-md"
              placeholder="Enter Description"
            ></textarea>
          </div>
  
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-3">
            <div class="flex flex-col">
              <label class="text-lg mb-1">Category</label>
              <select v-model="category" class="p-2 mb-5 rounded-md text-md">
                <option disabled value="">Please select one</option>
                <option v-for="category in categoryList" :key="category.id" :value="category.id">
                    {{ category.name }}
                </option>
              </select>
            </div>
  
            <div class="flex flex-col">
              <label class="text-lg mb-1">Stock</label>
              <input
                type="text"
                v-model="stock"
                class="p-2 mb-5 rounded-md text-md"
                placeholder="Enter Stock"
              />
            </div>
          </div>
  
          <div class="flex justify-start items-center w-full mb-5">
            <label
              for="file-upload"
              class="bg-gray-100 w-full text-black py-2 px-4 rounded-md cursor-pointer"
            >
              Upload File
            </label>
            <input
              id="file-upload"
              type="file"
              class="hidden"
              @change="previewFile"
            />
          </div>
  
          <div v-if="filePreview" class="flex justify-center">
            <img
              id="file-preview"
              class="w-full object-cover my-4"
              :src="filePreview"
              alt="Preview"
            />
          </div>
  
          <Button type="submit">Update</Button>
        </form>
      </div>
    </Layout>
  </template>
  
  <script setup>
  import Button from "primevue/button";
  import Layout from "../MasterLayout.vue";
  import { onMounted, ref } from 'vue';
import axiosInstance from "@/utils/axios";
  
  const category = ref('');
  const price = ref('');
  const description = ref('');
  const stock = ref('');
  const filePreview = ref('');
  const categoryList = ref([]);

  const previewFile = () => {
    const file = document.getElementById("file-upload").files[0];
    const reader = new FileReader();
  
    reader.onloadend = function () {
      filePreview.value = reader.result;
    };
  
    if (file) {
      reader.readAsDataURL(file);
    } else {
      filePreview.value = "";
    }
  };

  onMounted(async ()=>{
    try{
        const res = await axiosInstance.get('/api/category');
        if (res.data){
            categoryList.value = res.data.data
        }
        
    }catch(error){
        console.log("Error : "+ $error);
    }
  })
  </script>
  
  <style>
  </style>
  
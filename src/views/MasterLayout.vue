<template>
    <div class="flex flex-col min-h-screen">
      <!-- Navbar -->
      <Menubar :model="items">
        <template #start> E-commerce </template>
        <template #item="{ item, props }">
          <a class="flex items-center" v-bind="props.action">
            <span>{{ item.label }}</span>
          </a>
        </template>
        <template #end>
          <button class="hover:bg-gray-200 rounded-md p-2" @click="handleLogout">
            Log out
          </button>
        </template>
      </Menubar>
  
      <!-- Content Section (Takes up Remaining Space) -->
      <div class="flex-grow mb-10 mx-5">
        <slot />
      </div>

      <footer class="bg-gray-800 text-white py-6 mt-auto w-full">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <!-- Branding & Copyright -->
          <div class="mb-4 md:mb-0">
            <h5 class="font-bold text-xl">E-commerce</h5>
            <p class="text-sm">© 2023 E-commerce. All rights reserved.</p>
          </div>

          <!-- Footer Links -->
          <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <a href="#" class="hover:text-gray-400">Privacy Policy</a>
            <a href="#" class="hover:text-gray-400">Terms of Service</a>
            <a href="#" class="hover:text-gray-400">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
    </div>
  </template>
  
  
  

<script setup>
import Menubar from 'primevue/menubar';
import { ref, onMounted } from "vue";
import {useRouter} from 'vue-router';

const router = useRouter(); 

const items = ref([
    {
        label: 'Home',
        command: () => {router.push({name: 'home'})}
        
    },
    {
        label: 'Cart',
        command: () => {router.push({name: 'cart'})}
    },
    {
        label: 'Order',
        command: () => {router.push({name: 'order'})}
    }
]);

const handleLogout = () => {
    localStorage.removeItem('Token');
    router.push('/login');
}

const middleware = () => {
  if (!localStorage.getItem('Token')){
    router.push({name: 'login'})
  }
}

onMounted(()=>{
  middleware();
})

</script >
<style>

</style>
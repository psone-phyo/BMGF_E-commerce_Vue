<template>
    <div class="card lg:mx-20">
      <Menubar :model="items">
          <template #start>
            E-commerce

          </template>
          <template #item="{ item, props}">
              <a class="flex items-center" v-bind="props.action">
                  <span>{{ item.label }}</span>
              </a>
          </template>
          <template #end>
            <button  class="hover:bg-gray-200 rounded-md p-2" @click="handleLogout">Log out</button>
          </template>
      </Menubar>
      <slot/>
  </div>
</template>

<script setup>
import Menubar from 'primevue/menubar';
import { ref } from "vue";
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
    }
]);

const handleLogout = () => {
    localStorage.removeItem('Token');
    router.push('/login');
}
</script >
<style>

</style>
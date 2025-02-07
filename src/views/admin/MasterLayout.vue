<template>
    <div class="card mx-5 lg:mx-20">
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
          </template>
      </Menubar>
      <div class="mx-5 lg:mx-20">
        <slot/>
      </div>
      
  </div>
</template>

<script setup>
import Menubar from 'primevue/menubar';

import { ref } from "vue";
import {useRouter} from 'vue-router';
const router = useRouter(); 

const items = ref([
    {
        label: 'Dashboard',
        command: () => {router.push({name: 'dashboard'})}
    },
    {
        label: 'Category',
        command: () => {router.push({name: 'category'})}
    },
    {
        label: 'Product',
        command: () => {router.push({name: 'product'})}
    },
    {
        label: 'Order',
    }
]);
</script >
<style>

</style>
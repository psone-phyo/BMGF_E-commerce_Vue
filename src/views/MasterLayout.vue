<template>
    <div class="card">
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
        
    },
    {
        label: 'Cart',
        command: () => {router.push({name: 'category'})}
    },
    {
        label: 'Order',
    }
]);
</script >
<style>

</style>
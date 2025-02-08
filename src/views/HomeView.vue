<template>
  <Layout>  
    <div class="mx-5 lg:mx-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-5">
      <div class="" v-for="product in productList" :key="product.id">
      <Card :name=product.name :description=product.description :price=product.price :photo=product.photo :id=product.id />
      </div>
    </div>
    
   
  </Layout>
</template>

<script setup>
import Card from '@/components/ui/card.vue'
import Layout from './MasterLayout.vue'
import { onMounted,ref } from 'vue';
import axiosInstance from '@/utils/axios';

const productList = ref([]);

const getProduct = async ()=>{
  const res = await axiosInstance.get('/api/product')
  productList.value = res.data.data;
  console.log(res.data.data);
  
}

onMounted(()=>{
  getProduct();
})

</script>

<style>

</style>
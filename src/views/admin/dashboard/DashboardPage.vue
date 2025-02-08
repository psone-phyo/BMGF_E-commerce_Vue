<template>
  <Layout>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-10">
      <div v-for="(data,index) in data" :key="index">
        <Card>
            <template #title>{{ data.title }}</template>
            <template #content>
                <p class="m-0 text-center text-3xl font-bold">
                  {{ data.count }}
                </p>
            </template>
        </Card>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div>
      <Chart/>
    </div>
    <div>
      <Chart/>
    </div>
    </div>
    
  </Layout>
</template>

<script setup>
import Layout from '../MasterLayout.vue'
import Chart from '@/components/ui/Chart.vue'
import Card from 'primevue/card';
import {onMounted,ref} from 'vue';
import axiosInstance from '@/utils/axios';

const data = ref({});

onMounted(()=>{
  getData();
})

const getData = async () => {
  const res = await axiosInstance.get('api/dashboard/get');
  data.value = res.data;  

}
</script>

<style>

</style>
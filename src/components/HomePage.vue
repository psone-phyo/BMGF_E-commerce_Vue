
<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 parent">
        <div>
            <Card/>
        </div>
        <div>
            <Card/>
        </div>
        <div>
            <Card/>
        </div>
    </div>
    
</template>

<script setup>
import Card from './ui/card.vue'
import axiosInstance from '@/utils/axios';
import { onMounted, ref } from 'vue';

const data = ref(null);
const error = ref(null);

onMounted(async () => {
    try {
        const response = await axiosInstance.get('/api/product');
        // if (!response.ok) {
        //     throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // data.value = await response.json();
        console.log(response);
        
    } catch (err) {
        error.value = err.message;
        console.error('Error fetching data:', err);
    }
});
</script>


<script>
export default {

}
</script>

<style>
.parent{
    margin: 5% 10%;
}
</style>
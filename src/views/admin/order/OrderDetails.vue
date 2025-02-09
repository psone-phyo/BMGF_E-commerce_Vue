<template>
    <Layout>
        <div class="my-10 gap-3">
            <div class="">
                <div class=" mb-5 flex justify-between items-center">
                    <router-link to="/admin/orders" class="bg-green-400 p-2 rounded-md hover:bg-green-500">Back to Order</router-link>
                    <div class="flex gap-x-3">
                        <button class="bg-red-400 hover:bg-red-500 p-2 rounded-md" @click="handleReject">Reject</button>
                        <button class="bg-green-400 hover:bg-green-500 p-2 rounded-md" @click="handleConfirm">Confirm</button>
                    </div>
                    
                </div>
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product Name
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product Photo
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Unit Price
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Quantity
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Stock
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="details in DetailsList" :key="details.id" :class="details.count > details.stock ? 'bg-red-200' : ''">
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <router-link to="#" class="hover:text-green-400 hover:underline">{{ details.name }}</router-link>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <img :src="details.photo" alt="" width="100">
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {{ details.price }} MMK
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {{ details.count }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {{ details.count * details.price }} MMK
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" :class="details.count > details.stock ? 'text-red-500' : ''">
                                {{ details.stock}}
                            </td>
                            
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </Layout>
</template>

<script setup>
import Layout from "../MasterLayout.vue";
import { onMounted, ref } from 'vue';
import axiosInstance from '@/utils/axios';
import {useRoute, useRouter} from 'vue-router'

const DetailsList = ref([]);
const route = useRoute();
const router = useRouter();
const order_code = route.params.order_code

onMounted(() => {
    getDetails();
})

const getDetails = async () => {
    try {
        const res = await axiosInstance.get(`/api/order/details?order_code=${order_code}`);
        if (res.data) {
            DetailsList.value = res.data.data;    
        }
    } catch (error) {
        console.log("error", error);
    }

}

const handleConfirm = async () => {
    try{
        const res = await axiosInstance.get(`/api/order/status/confirm?order_code=${order_code}`)
        if (res.data.success){
            router.push({name: 'orders'})
        }
    }catch(error){
        console.log("error", error);
        
    }
}

const handleReject = async () => {
    try{
        const res = await axiosInstance.get(`/api/order/status/reject?order_code=${order_code}`)
        if (res.data.success){
            router.push({name: 'orders'})
        }
    }catch(error){
        console.log("error", error);
        
    }
}
</script>

<style></style>
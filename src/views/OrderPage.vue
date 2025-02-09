<template>
    <Layout>
        <div class="my-10 gap-3">
            <div class="">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Order Code
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total Amount
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="order in orderList" :key="order.id">
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <router-link :to="`/order/details/${order.order_code}`" class="hover:text-green-400 hover:underline">{{ order.order_code }}</router-link>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {{ order.total_amt }} MMK
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-bold" :class="{
                                'text-yellow-500': order.status === 'pending',
                                'text-red-500': order.status === 'rejected',
                                'text-green-500': order.status === 'success'
                            }">
                                {{ order.status }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </Layout>
</template>

<script setup>
import Layout from "./MasterLayout.vue";
import { onMounted, ref } from 'vue';
import axiosInstance from '@/utils/axios';

const orderList = ref([]);
const searchKey = ref('');

onMounted(async () => {
    try {
        getOrder();
    } catch (error) {
        console.log("error", error);
    }
})


const handleSearch = () => {
    try {
        getOrder();
    } catch (error) {
        console.log(error);

    }

}

const getOrder = async () => {
    try {
        const res = await axiosInstance.get(`/api/order/get`);
        if (res.data) {
            orderList.value = res.data.data;            
        }
    } catch (error) {
        console.log("error", error);
    }

}
</script>

<style></style>
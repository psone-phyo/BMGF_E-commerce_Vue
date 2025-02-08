<template>
  <Layout>
    <div class="">
      <img
        src="../../public/img/cover.jpg"
        alt=""
        style="width: 100%; height: 400px"
        class="rounded-md aspect-w-16 aspect-h-9"
      />

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-5 mx-5"
      >
        <div class="" v-for="product in productList" :key="product.id">
          <Card
            :name="product.name"
            :description="product.description"
            :price="product.price"
            :photo="product.photo"
            :product_id="product.id"
          />
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import Card from "@/components/ui/card.vue";
import Layout from "./MasterLayout.vue";
import { onMounted, ref } from "vue";
import axiosInstance from "@/utils/axios";

const productList = ref([]);

const getProduct = async () => {
  const res = await axiosInstance.get("/api/product");
  productList.value = res.data.data;
  console.log(res.data.data);
};

onMounted(() => {
  getProduct();
});
</script>

<style>
</style>
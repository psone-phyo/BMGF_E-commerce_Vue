<template>
  <Layout>
    <div class="grid lg:grid-cols-3 my-10 gap-3">
      <div class="col-span-1 lg:col-span-2">
        <form @submit.prevent="handleSubmit" class="flex flex-col">
          <label class="font-bold text-3xl mb-5">Category Name</label>
          <input type="text" v-model="category" class="p-2 text-xl mb-5" />
          <Button type="submit">Update</Button>
        </form>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import Button from "primevue/button";
import Layout from "../MasterLayout.vue";
import { onMounted, ref } from "vue";
import axiosInstance from "@/utils/axios";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const category = ref("");
const route = useRoute();
const categoryId = ref(route.params.id);

onMounted(async () => {
  try {
    const response = await axiosInstance.get(
      `/api/category/get/${categoryId.value}`
    );
    if (response.data.data) {
      category.value = response.data.data.name;
    }
  } catch (error) {
    console.error("Error fetching category:", error);
  }
});

const handleSubmit = async () => {
  try {
    const response = await axiosInstance.put(
      `/api/category/update/${categoryId.value}`,
      { name: category.value }
    );
    if (response.data.success) {
      router.push({name: 'category'})
    }
  } catch (error) {
    console.error("Error fetching category:", error);
  }
};
</script>

<style></style>

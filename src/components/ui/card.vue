<template>
  <Card style="overflow: hidden; padding: 10px;">
    <template #header>
      <img alt="user header" :src="photo" width="100%" height="300px" class="rounded-md"/>
    </template>
    <template #title>{{ name }}</template>
    <template #subtitle>{{ description }}</template>
    <template #content>
      <p class="font-bold text-xl">
        {{ price }} MMK     
      </p>
    </template>
    <template #footer>
      <div class="flex gap-4 mt-1 justify-between items-center">
        <button class=" px-5 border border-red-500 rounded-md hover:bg-red-200 text-3xl" @click="removeFromCart">
          <i class="fa-solid fa-minus"></i>
        </button>
        <div class="font-bold text-3xl">{{ count }}</div>
        <button class="px-5 border border-green-500 rounded-md hover:bg-green-200 text-3xl" @click="addToCart">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
    </template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card';
import { ref, onMounted } from 'vue';

const count = ref(0);

const props = defineProps({
  product_id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  photo: { type: String, required: true }
});

onMounted(() => {
  getCart();
});

const getCart = () => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingProduct = cart.find(item => item.product_id === props.product_id);
  count.value = existingProduct ? existingProduct.count : 0; // ✅ Fix: If not found, set count to 0
};

const addToCart = () => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  let existingProduct = cart.find(item => item.product_id === props.product_id);
  if (existingProduct) {
    existingProduct.count += 1;
  } else {
    cart.push({
      product_id: props.product_id,
      name: props.name,
      price: props.price,
      count: 1,
      photo: props.photo
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  count.value += 1;
};

const removeFromCart = () => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  let existingProduct = cart.find(item => item.product_id === props.product_id);
  if (existingProduct) {
    if (existingProduct.count > 1) {
      existingProduct.count -= 1;
      count.value -= 1; // ✅ Update count value
    } else {
      cart = cart.filter(item => item.product_id !== props.product_id); // ✅ Remove product if count == 0
      count.value = 0; // ✅ Ensure UI updates correctly
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  }
};
</script>

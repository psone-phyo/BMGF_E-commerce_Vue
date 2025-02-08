<template>
    <Card style="overflow: hidden">
      <template #header>
        <img alt="user header" :src="photo" width="100%" height="300px" />
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
            <Button label="remove" class="w-1/2" @click="removeFromCart"/>
          <div class="font-bold text-3xl">{{ count }}</div>
          <Button label="add" class="w-1/2" @click="addToCart"/>
        </div>
      </template>
    </Card>
  </template>
  
  <script setup>
  import Button from 'primevue/button';
  import Card from 'primevue/card';
  import { ref, onMounted } from 'vue';
  
  const count = ref(0);
  
  const props = defineProps({
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    photo: {
      type: String,
      required: true
    }
  });
  
      onMounted(() => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === props.id);
    if (existingProduct) {
      count.value = existingProduct.count;
    }
  });
  
  const addToCart = () => {
    const product = {
      product_id: props.id,
      name: props.name,
      price: props.price,
      count: 1,
      photo: props.photo
    };
  
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.count += 1;
    } else {
      cart.push(product); 
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
  
    count.value += 1;
  };

const removeFromCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = cart.find(item => item.id === props.id);
    if (existingProduct) {
        existingProduct.count -= 1;

        if (existingProduct.count === 0) {
            cart = cart.filter(item => item.id !== props.id);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        count.value -= 1;
    }
};
  </script>
  
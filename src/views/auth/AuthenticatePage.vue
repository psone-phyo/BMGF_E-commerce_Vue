<template>
    <h1 class="text-center font-bold text-3xl lg:text-6xl">Authenticating...</h1>
</template>

<script setup>
import { onMounted } from 'vue';
import {useRoute, useRouter} from 'vue-router';
const route=useRoute();
const router = useRouter();
onMounted(()=>{
    if (route.query.token){
         localStorage.setItem('Token', route.query.token);
            router.push({name: 'home'});
    }
})
</script>

<style>

</style>
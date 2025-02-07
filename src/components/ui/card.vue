<template>
    <Card style="padding: 10px;" class="shadow-md cursor-pointer">
        <template #header>
        <img alt="userheader" :src="image" class="rounded-md"/>
        </template>
        <template #title >{{title}}</template>
        <template #content>
            <p class="m-0">
                {{content}}
            </p>
        </template>
    </Card>
 
</template>

<script setup>
import Card from 'primevue/card';
const props = defineProps({
    title: String,
    content: String,
    image: String
});
</script>

<style>
</style>
<template>
  <Card>
            <template #title>{{title}}</template>
            <template #content>
                <p class="m-0 text-center text-3xl font-bold">
                    {{count}}
                </p>
            </template>
        </Card>
</template>

<script setup>
import Card from 'primevue/card';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
});
</script>

<style>

</style>
<template>
    <div class="h-screen flex justify-center items-start">
        <div class=" w-full mx-10 md:w-1/2 lg:w-1/4">
            <h1 class="font-bold text-3xl text-center mt-32 mb-10">Register Page</h1>
            <div class="card flex justify-center">
                <form @submit.prevent="onSubmit" class="flex flex-col gap-4 w-full">
                    <div class="flex flex-col gap-1">
                        <InputText name="name" type="text" placeholder="Name" v-model="name" fluid/>
                        <small class="text-red-500">{{ nameError }}</small>
                    </div>
                    <div class="flex flex-col gap-1">
                        <InputText name="email" type="text" placeholder="Email" v-model="email" fluid/>
                        <small class="text-red-500">{{ emailError }}</small>
                    </div>
                    <div class="flex flex-col gap-1">
                        <InputText name="password" type="password" placeholder="Password" v-model="password" fluid/>
                        <small class="text-red-500">{{ passwordError }}</small>
                    </div>
                    <router-link to="/login" class="underline text-green-700 hover:text-green-800 text-center">Already had an account? Log in</router-link>

                    <Button type="submit" severity="primary" label="Register" />
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { ref } from 'vue';
import axiosInstance from '@/utils/axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const nameError = ref('');
const emailError = ref('');
const passwordError = ref('');

const name = ref('');
const email = ref('');
const password = ref('');

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const onSubmit = async () => {
    nameError.value = '';
    emailError.value = '';
    passwordError.value = '';

    if (name.value === '') {
        nameError.value = "Name is required";
    }
    if (email.value === '') {
        emailError.value = "Email is required";
    } else if (!validateEmail(email.value)) {
        emailError.value = "Invalid email format";
    }
    if (password.value === '') {
        passwordError.value = "Password is required";
    } else if (password.value.length < 8 || password.value.length > 12) {
        passwordError.value = "Password must be between 8 and 12 characters";
    }

    if (!nameError.value && !emailError.value && !passwordError.value) {
        try {
            const res = await axiosInstance.post('/api/register', { name: name.value, email: email.value, password: password.value });
            localStorage.setItem('Token',res.data.access_token);
            router.push({ name: 'home' });
        } catch (error) {
            
            if (error.response) {
                if (error.response.data.error) {
                    emailError.value = error.response.data.error.email;
                    passwordError.value = error.response.data.error.password;
                }
                if (error.response.data.errors) {
                    emailError.value = error.response.data.errors.email[0];
                }
            }
        }
    }
};
</script>

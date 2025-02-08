<template>
    <div class="h-screen flex justify-center items-start">
        <div class=" w-full mx-10 md:w-1/2 lg:w-1/4">
            <h1 class="font-bold text-3xl text-center mt-32 mb-10">Login Page</h1>
            <div class="card flex justify-center">
                <form @submit.prevent="onSubmit" class="flex flex-col gap-4 w-full">
                    <div class="flex flex-col gap-1">
                        <InputText name="email" type="text" placeholder="Email" v-model="email" fluid/>
                        <small class="text-red-500">{{ emailError }}</small>
                    </div>
                    <div class="flex flex-col gap-1">
                        <InputText name="password" type="password" placeholder="Password" v-model="password" fluid/>
                        <small class="text-red-500">{{ passwordError }}</small>
                    </div>
                    <Button type="submit" severity="primary" label="Login" />
                </form>
            </div>
            <div class="flex justify-center items-center w-full mt-3">
                <div class="w-full text-center">
                    <router-link to="/register" class="underline text-green-700 hover:text-green-800 text-center">Haven't had an account? Create One</router-link>
                    <div class="text-center my-5">OR</div>
                    <a href="http://127.0.0.1:8000/provider/login" class="bg-gray-600 hover:bg-gray-800 text-white block text-center rounded-md p-2 w-full">
                        <i class="fa-brands fa-google" style="color: #ffffff;"></i>
                        Sign in with Google
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { ref } from 'vue';
import axios from 'axios'; // Import axios
import axiosInstance from '@/utils/axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const emailError = ref('');
const passwordError = ref('');
const email = ref('');
const password = ref('');

const onSubmit = async () => {
    emailError.value = '';
    passwordError.value = '';

    if (email.value === '') {
        emailError.value = "Email is required";
    }
    if (password.value === '') {
        passwordError.value = "Password is required";
    }

    try{
        if (!emailError.value && !passwordError.value){
        const res = await axiosInstance.post('/api/login', {email: email.value, password: password.value});
        localStorage.setItem('Token', res.data.access_token)
        if (res.data.role == 'admin'){
            router.push({name: 'dashboard'})
        }else{
            router.push({name: 'home'})
        }
        }
    }catch (error) {
            if (error.response.data) {
                
                if (error.response.data.error){
                    emailError.value=error.response.data.error.email;
                }
                if (error.response.data.error){
                    passwordError.value = error.response.data.error.password;
                }
                if (error.response.data.errors){
                    emailError.value = error.response.data.errors.email[0];
                }   
            }
        }
    
    
};
</script>

<template>
  <Layout>
    <h1 class="text-center font-bold text-3xl my-5">Fill the information</h1>
    <div class="flex justify-center items-center">
      <Form
        @submit="onSubmit"
        :validation-schema="validationSchema"
        class="flex flex-col w-full lg:w-1/2"
        enctype="multipart/form-data"
      >
        <div class="grid grid-cols-1 gap-x-3">
          <div class="flex flex-col">
            <label class="text-lg mb-1">Phone</label>
            <Field
              name="phone"
              class="p-2 rounded-md text-md"
              placeholder="+959xxxxxxxxx"
            />
            <ErrorMessage name="phone" class="text-red-500" />
          </div>

        </div>

        <div class="flex flex-col mt-3">
          <label class="text-lg mb-1">Address</label>
          <Field
            as="textarea"
            name="address"
            class="p-2 rounded-md text-md"
            placeholder="Enter your shipping address"
          />
          <ErrorMessage name="address" class="text-red-500" />
        </div>

        <div class="flex flex-col justify-center mt-5 bg-white p-2 rounded-md">
            <label for="" class="mb-1">Order Code</label>
            <div class="font-bold text-lg">{{ order_code }}</div>
          </div>

        <div class="flex flex-col bg-white p-1 rounded-md my-5">
          <div>
            <div class="font-bold text-xl my-5">
              Total Amount: {{total}} MMK
            </div>
          </div>
        </div>

        <Button type="submit" :disabled="btndisabled">Checkout</Button>
      </Form>
    </div>
  </Layout>
</template>

<script setup>
import Button from "primevue/button";
import Layout from "./MasterLayout.vue";
import { ref, onMounted } from "vue";
import axiosInstance from "@/utils/axios";
import { useForm, Field, Form, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();
const btndisabled = ref(false);
const CartItems = ref([]);
const total = ref(0);
const order_code = route.params.order_code

const validationSchema = toTypedSchema(
  zod.object({
    phone: zod.string().min(10, { message: "Phone number is required" }),
    address: zod.string().min(1, { message: "Address is required" }),
  })
);

const onSubmit = async (values) => {
  try {
    btndisabled.value = true;
    const form = {
      phone: values.phone,
      address: values.address,
      total_amt: total.value,
      order_code: order_code
    }
    const res = await axiosInstance.post("/api/order/checkout", form);
    if (res.data.success) {
      localStorage.removeItem('cart');
      router.push({ name: "order" });
      
    }
  } catch (error) {
    console.log("error", error);
  }
};

const getCart = () => {
    if (localStorage.getItem('cart')) {
      CartItems.value = JSON.parse(localStorage.getItem('cart')) || [];
      CartItems.value.map((item) => {
        total.value += item.price * item.count;
      })
    }
  };

  onMounted(()=>{
    getCart();
  })
</script>

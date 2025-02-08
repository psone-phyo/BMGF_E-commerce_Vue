<template>
  <Layout>
    <h1 class="text-center font-bold text-3xl my-5">Edit Product</h1>
    <div class="flex justify-center items-center">
      <Form
        @submit="onSubmit"
        :validation-schema="validationSchema"
        v-slot="{ setFieldValue }"
        class="flex flex-col w-full lg:w-1/2"
        enctype="multipart/form-data"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-3">
          <div class="flex flex-col">
            <label class="text-lg mb-1">Product Name</label>
            <Field
              name="name"
              class="p-2 rounded-md text-md"
              placeholder="Enter Name"
              v-model="product.name"
            />
            <ErrorMessage name="name" class="text-red-500" />
          </div>
          <div class="flex flex-col">
            <label class="text-lg mb-1">Price</label>
            <Field
              name="price"
              type="text"
              class="p-2 rounded-md text-md"
              placeholder="Enter Price"
              v-model="product.price"
            />
            <ErrorMessage name="price" class="text-red-500" />
          </div>
        </div>

        <div class="flex flex-col">
          <label class="text-lg mb-1">Description</label>
          <Field
            as="textarea"
            name="description"
            class="p-2 rounded-md text-md"
            placeholder="Enter Description"
            v-model="product.description"
          />
          <ErrorMessage name="description" class="text-red-500" />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-3">
          <div class="flex flex-col">
            <label class="text-lg mb-1">Category</label>
            <Field
              as="select"
              name="category_id"
              class="p-2 rounded-md text-md"
              v-model="product.category_id"
            >
              <option disabled value="">Please select one</option>
              <option
                v-for="category in categoryList"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </Field>
            <ErrorMessage name="category_id" class="text-red-500" />
          </div>
          <div class="flex flex-col">
            <label class="text-lg mb-1">Stock</label>
            <Field
              name="stock"
              type="text"
              class="p-2 rounded-md text-md"
              placeholder="Enter Stock"
              v-model="product.stock"
            />
            <ErrorMessage name="stock" class="text-red-500" />
          </div>
        </div>

        <!-- File Upload Field -->
        <div class="flex justify-start items-center w-full mt-5">
          <label
            for="file-upload"
            class="bg-gray-100 w-full text-black py-2 px-4 rounded-md cursor-pointer"
            >Upload File</label
          >
          <input
            id="file-upload"
            type="file"
            class="hidden"
            @change="handleFileUpload($event, setFieldValue)"
          />
        </div>

        <div v-if="filePreview || product.photo" class="flex justify-center">
          <img
            id="file-preview"
            class="w-full object-cover my-4"
            :src="filePreview || product.photo"
            alt="Preview"
          />
        </div>

        <ErrorMessage name="photo" class="text-red-500" />
        <Button type="submit" :disabled="btndisabled">Update</Button>
      </Form>
    </div>
  </Layout>
</template>

<script setup>
import Button from "primevue/button";
import Layout from "../MasterLayout.vue";
import { onMounted, ref } from "vue";
import axiosInstance from "@/utils/axios";
import { useForm, Field, Form, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
import { useRouter, useRoute } from "vue-router";

const filePreview = ref("");
const categoryList = ref([]);
const router = useRouter();
const btndisabled = ref(false);
const route = useRoute();
const id = route.params.id;

const product = ref({});


const validationSchema = toTypedSchema(
  zod.object({
    name: zod.string().min(1, { message: "Product Name is required" }),
    category_id: zod.coerce
      .number({ message: "Category is required" })
      .min(1, { message: "Category is required" }),
    price: zod.coerce
      .number({ message: "Price must be number" })
      .min(1, { message: "Price must be a valid number and greater than 0" }),
    description: zod.string().min(1, { message: "Description is required" }),
    stock: zod.coerce
      .number({ message: "Stock must be number" })
      .min(1, { message: "Stock must be a valid number and at least 1" }),
    photo: zod
      .instanceof(File)
      .optional()
      .refine((file) => !file || file.size < 2 * 1024 * 1024, {
        message: "File size must be under 2MB",
      }) // Max 2MB
      .refine(
        (file) => !file || ["image/png", "image/jpeg"].includes(file.type),
        {
          message: "Only PNG or JPEG images allowed",
        }
      ),
  })
);

const getCategory = async () => {
  try {
    const res = await axiosInstance.get("/api/category");
    categoryList.value = res.data?.data || [];
  } catch (error) {
    console.error("Error: " + error.message);
  }
};

const getProduct = async () => {
    try{
        const res = await axiosInstance.get(`/api/product/get/${id}`);
        if (res.data.data){
            product.value = res.data.data[0];
        }
    }catch(error){
        router.push({name: 'product'})
    }
        
};

onMounted(async () => {
  await getCategory();
  await getProduct();
});

const onSubmit = async (values) => {
  try {
    let form = {};
    btndisabled.value = true;
    if (values.photo) {
      const res = await axiosInstance.post(
        "/api/product/image/upload",
        { photo: values.photo },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.link) {
            form = {
          name: values.name,
          category_id: values.category_id,
          price: values.price,
          description: values.description,
          stock: values.stock,
          photo: res.data.link,
        };
      }
    } else {
        form = {
        name: values.name,
        category_id: values.category_id,
        price: values.price,
        description: values.description,
        stock: values.stock,
      };
    }
    const res1 = await axiosInstance.put(`/api/product/update/${id}`, form);
    if (res1.data.success) {
      router.push({ name: "product" });
    }
  } catch (error) {
    console.log("error", error);
  }
};

const handleFileUpload = (event, setFieldValue) => {
  const file = event.target.files[0];
  if (!file) return;

  setFieldValue("photo", file); // Set file for validation

  const reader = new FileReader();
  reader.onloadend = () => {
    filePreview.value = reader.result;
  };
  reader.readAsDataURL(file);
};
</script>

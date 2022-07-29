<template>
  <div class="container-fluid vh-100">
    <div class="row p-0">
      <div class="col-12 col-md-6 m-0 p-0 vh-min-30 vh-md-100 bg-primary d-flex flex-column justify-content-center align-items-center">
        <div class="w-25">
          <img src="../../assets/logo.png" class="w-100" alt="" />
        </div>
        <div>
          <p class="text-nowrap my-3 h5 text-light text-uppercase">Myanmar second market</p>
        </div>
      </div>
      <div class="col-12 col-md-6 vh-md-100 d-flex justify-content-center align-items-center">
        <div>
          <p class="h5 my-4 fw-bold">အကောင့်ဝင်မည် <i class="bi bi-box-arrow-in-right ms-1"></i></p>
          <div class="text-danger text-small mb-3" v-if="errors">{{ errors }}</div>
          <form @submit.prevent="login">
            <div class="input-group shadow-sm mb-3">
              <span class="input-group-text" id="basic-addon1"><i class="bi bi-envelope"></i></span>
              <input required v-model="formData.email" type="email" :class="['form-control', { 'is-invalid': errors }]" placeholder="အီးမေးလိပ်စာ" aria-label="Username" aria-describedby="basic-addon1" />
            </div>

            <div class="input-group shadow-sm mb-3">
              <span class="input-group-text" id="basic-addon1"><i class="bi bi-lock"></i></span>
              <input required v-model="formData.password" type="password" :class="['form-control', { 'is-invalid': errors }]" placeholder="စကားဝှက်" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            <button class="btn btn-primary w-100 text-light mb-3" :disabled="isLoading">
              အကောင့်ဝင်မည် <i class="bi bi-box-arrow-in-right ms-1"></i>
              <span v-if="isLoading" class="spinner-grow ms-3 spinner-grow-sm" role="status" aria-hidden="true"></span>
            </button>
          </form>
          <div>
            <small>အကောင့်မရှိသေးပါ <router-link class="text-decoration-none fw-bolder" :to="{ name: 'register' }">အကောင့်ဖွင့်မည်</router-link></small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useCheckOnline } from "@/composables/useCheckOnline";
export default {
  setup() {
    let router = useRouter();
    let store = useStore();

    let formData = ref({
      email: "",
      password: "",
    });

    let errors = ref("");

    let isLoading = ref(false);

    let login = async () => {
      useCheckOnline();
      isLoading.value = true;
      try {
        let response = await axios.post(process.env.VUE_APP_API_URL + "/api/auth/login", formData.value);
        if (response.status == 200) {
          store.dispatch("setUser", response.data.data);
          router.push({ name: "home" });
        }
      } catch (e) {
        errors.value = e.response.data.data;

        isLoading.value = false;
      }
    };
    return { formData, errors, login, isLoading };
  },
};
</script>

<style scoped></style>

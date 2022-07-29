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
      <div class="col-12 col-md-6 vh-min-60 vh-md-100 d-flex justify-content-center align-items-center">
        <div>
          <p class="h5 my-4 fw-bold">အကောင့်ဖွင့်မည် <i class="bi bi-pencil-square ms-1"></i></p>
          <form @submit.prevent="register">
            <small class="text-danger text-small" v-if="errors.name">{{ errors.name[0] }}</small>
            <div class="input-group shadow-sm mb-3">
              <span class="input-group-text" id="basic-addon1"><i class="bi bi-person"></i></span>
              <input required v-model="formData.name" type="text" :class="['form-control', { 'is-invalid': errors.name }]" placeholder="အမည်" aria-label="Username" aria-describedby="basic-addon1" />
            </div>

            <small class="text-danger text-small" v-if="errors.email">{{ errors.email[0] }}</small>
            <div class="input-group shadow-sm mb-3">
              <span class="input-group-text" id="basic-addon1"><i class="bi bi-envelope"></i></span>
              <input required v-model="formData.email" type="email" :class="['form-control', { 'is-invalid': errors.email }]" placeholder="အီးမေးလိပ်စာ" aria-label="Username" aria-describedby="basic-addon1" />
            </div>

            <small class="text-danger text-small" v-if="errors.phone">{{ errors.phone[0] }}</small>
            <div class="input-group shadow-sm mb-3">
              <span class="input-group-text" id="basic-addon1"><i class="bi bi-phone"></i></span>
              <input required v-model="formData.phone" type="text" :class="['form-control', { 'is-invalid': errors.phone }]" placeholder="ဖုန်းနံပါတ် 09******" aria-label="Userphone" aria-describedby="basic-addon1" />
            </div>

            <small class="text-danger text-small" v-if="errors.address">{{ errors.address[0] }}</small>
            <div class="input-group shadow-sm mb-3">
              <span class="input-group-text" id="basic-addon1"><i class="bi bi-map"></i></span>
              <input required v-model="formData.address" type="text" :class="['form-control', { 'is-invalid': errors.address }]" placeholder="လိပ်စာ" aria-label="Username" aria-describedby="basic-addon1" />
            </div>

            <small class="text-danger text-small" v-if="errors.password">{{ errors.password[0] }}</small>
            <div class="input-group shadow-sm mb-3">
              <span class="input-group-text" id="basic-addon1"><i class="bi bi-lock"></i></span>
              <input required v-model="formData.password" type="password" :class="['form-control', { 'is-invalid': errors.password }]" placeholder="စကားဝှက်" aria-label="Username" aria-describedby="basic-addon1" />
            </div>

            <small class="text-danger text-small" v-if="errors.confirm_password">{{ errors.confirm_password[0] }}</small>
            <div class="input-group shadow-sm mb-3">
              <span class="input-group-text" id="basic-addon1"><i class="bi bi-lock-fill"></i></span>
              <input required v-model="formData.confirm_password" type="password" :class="['form-control', { 'is-invalid': errors.confirm_password }]" placeholder="စကားဝှက်ထပ်မံရိုက်ထည့်ပါ" aria-label="Username" aria-describedby="basic-addon1" />
            </div>

            <small class="text-danger text-small" v-if="errors.agree">{{ errors.agree[0] }}</small>
            <div>
              <div class="form-check mb-3">
                <input required v-model="formData.agree" id="agreeInput" :class="['form-check-input', { 'is-invalid': errors.agree }]" type="checkbox" />
                <label class="form-check-label" for="agreeInput"> သုံးစွဲမှုဆိုင်ရာစည်းမျဉ်းများကို သဘောတူပါသည် </label>
              </div>
            </div>
            <button class="btn btn-primary w-100 text-light mb-3" :disabled="isLoading">
              အကောင့်ဖွင့်မည် <i class="bi bi-pencil-square ms-1"></i>
              <span v-if="isLoading" class="spinner-grow ms-3 spinner-grow-sm" role="status" aria-hidden="true"></span>
            </button>
          </form>
          <div>
            <small>အကောင့်ဖွင့်ပြီးသားရှိပါသလား? <router-link class="text-decoration-none fw-bolder" :to="{ name: 'login' }">အကောင့်ဝင်မည်</router-link></small>
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
      name: "",
      email: "",
      phone: "",
      password: "",
      confirm_password: "",
      address: "",
      agree: "",
    });

    let errors = ref("");

    let isLoading = ref(false);

    let register = async () => {
      useCheckOnline();
      isLoading.value = true;
      try {
        let response = await axios.post(process.env.VUE_APP_API_URL + "/api/auth/register", formData.value);
        if (response.status == 200) {
          store.dispatch("setUser", response.data.data);
          router.push({ name: "home" });
        }
      } catch (e) {
        errors.value = e.response.data.errors;

        isLoading.value = false;
      }
    };
    return { formData, errors, register, isLoading };
  },
};
</script>

<style scoped></style>

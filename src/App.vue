<template>
  <router-view />
</template>
<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useCheckOnline } from "./composables/useCheckOnline";
export default {
  setup() {
    console.log(useStore().state.auth);
    console.log("version" + process.env.VUE_APP_VERSION);
    useCheckOnline();
    if (process.env.VUE_APP_VERSION !== "1") {
      useRouter().push({ name: "test" });
    }
  },
};
</script>
<style lang="scss"></style>

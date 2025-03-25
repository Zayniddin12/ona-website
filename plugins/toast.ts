import Toast from "vue-toastification";
import { defineNuxtPlugin } from "#app";
import "vue-toastification/dist/index.css";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 4,
    newestOnTop: true,
  });
});

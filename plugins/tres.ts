import Book from "@/components/index/book.vue";
import Tres from "@tresjs/core";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("Book", Book);
  nuxtApp.vueApp.use(Tres);
});

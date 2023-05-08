import VueTippy from "vue-tippy";
import "tippy.js/dist/tippy.css";
export default defineNuxtPlugin((nuxtApp) => {
  // provide Tooltip components in the context of any app through the v-tippy directive, or the tippy component
  nuxtApp.vueApp.use(VueTippy, { component: "tippy" });
});

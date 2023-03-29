export default defineNuxtRouteMiddleware((to, from) => {
  console.log(to.path, from.path);
  const auth = useAuth();
  // if (!auth.authenticated && from.path != "/") {
  //   return navigateTo("/");
  // }
  // if (to.path == "/") {
  //   return navigateTo("/app");
  // }
});

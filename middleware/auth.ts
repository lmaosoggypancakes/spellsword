export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuth();
  if (!auth.authenticated) {
    return navigateTo("/");
  }
});

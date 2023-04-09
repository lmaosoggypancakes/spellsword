export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuth();
  auth.$hydrate();
  if (!auth.authenticated && from.path != "/") {
    return navigateTo("/");
  }
  if (to.path == "/" && auth.authenticated) {
    return navigateTo("/app/play");
  }
});

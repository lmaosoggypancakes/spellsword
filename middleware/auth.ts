export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuth();
  auth.$hydrate();
  if (!auth.authenticated && from.path != "/") {
    return navigateTo("/"); // NOTE: this path is needed to prevent infinite navigation between / to /login to / to /login to / ...
  }
  if (to.path == "/" && auth.authenticated) {
    return navigateTo("/app/play");
  }
});

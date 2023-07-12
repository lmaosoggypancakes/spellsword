export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuth();
  auth.$hydrate();
  if (!auth.authenticated && to.path != "/") {
    return navigateTo("/"); // NOTE: this path is needed to prevent infinite navigation between / to /login to / to /login to / ...
  }
  if (auth.authenticated && to.path == "/") {
    return navigateTo("/app/play");
  }
  // if (to.path == "/" && auth.authenticated) {
  //   return navigateTo("/app/play");
  // }
});

// file: ~/server/api/auth/[...].ts
import { NuxtAuthHandler } from "#auth";
import GoogleProvider from "next-auth/providers/google";

export default NuxtAuthHandler({
  providers: [
    // GoogleProvider.default({
    //   clientId: "enter-your-client-id-here",
    //   clientSecret: "enter-your-client-secret-here",
    // }),
  ],
});

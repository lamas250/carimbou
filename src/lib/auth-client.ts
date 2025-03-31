import { anonymousClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
// import { toast } from "sonner";

export const { signIn, signUp, useSession, signOut, resetPassword, forgetPassword } =
  createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL!,
    fetchOptions: {
      onError: (ctx) => {
        // toast.error(ctx.error.message);
        console.log(ctx.error.message);
      },
    },
    plugins: [anonymousClient()],
  });

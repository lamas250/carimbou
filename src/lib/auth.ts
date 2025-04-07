import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { anonymous } from "better-auth/plugins";
import { sendEmail } from "@/features/send-email";

// const sendEmail = async ({ to, subject, text }: { to: string; subject: string; text: string }) => {
//   console.log("Sending email to", to, "with subject", subject, "and text", text);
// };

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      await sendEmail(
        user.email,
        "Redefinir senha",
        `Clique no link para redefinir sua senha: ${url}`
      );
    },
  },
  plugins: [
    anonymous({
      onLinkAccount: async ({ anonymousUser, newUser }) => {
        // perform actions like moving the cart items from anonymous user to the new user
        console.log("Linking account", anonymousUser, newUser);
      },
    }),
  ],
  // callbacks: {},
});

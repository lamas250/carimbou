import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { anonymous } from "better-auth/plugins";

const sendEmail = async ({ to, subject, text }: { to: string; subject: string; text: string }) => {
  console.log("Sending email to", to, "with subject", subject, "and text", text);
};

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
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

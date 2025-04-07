"use server";

import { resend } from "@/lib/resend";
import { ResetPasswordTemplate } from "@/templates/reset-password";

export async function sendEmail(email: string, subject: string, title: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Carimbou <support@carimbou.com>",
      to: [email],
      subject: subject,
      react: await ResetPasswordTemplate({
        title: title,
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }
    return;
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}

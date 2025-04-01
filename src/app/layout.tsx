import { auth } from "@/lib/auth";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { headers } from "next/headers";
import { Toaster } from "sonner";
import { redirect } from "next/navigation";
import Header from "@/components/header";
export const metadata: Metadata = {
  title: "Carimbou",
  description: "Programa de fidelização de clientes",
};

export const viewport: Viewport = {
  maximumScale: 1,
};

const manrope = Manrope({ subsets: ["latin"] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api
    .getSession({
      headers: await headers(),
    })
    .catch((error) => {
      console.error("Error getting session", error);
      throw redirect("/sign-in");
    });

  return (
    <html
      lang="en"
      className={`bg-white dark:bg-gray-950 text-black dark:text-white ${manrope.className}`}
    >
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons2/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons2/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons2/favicon-16x16.png" />
      </head>
      <body className="min-h-[100dvh] bg-gray-50">
        <Toaster richColors closeButton />
        <Header user={session?.user} />
        {children}
      </body>
    </html>
  );
}

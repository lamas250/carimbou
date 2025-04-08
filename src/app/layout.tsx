import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Toaster } from "sonner";
import Providers from "./providers";

export const metadata: Metadata = {
  title: {
    default: "Carimbou",
    template: "%s | Carimbou",
  },
  description: "Programa de fidelização de clientes",
  twitter: {
    card: "summary_large_image",
    title: "Carimbou",
    description: "Programa de fidelização de clientes",
    images: ["/icons2/apple-touch-icon.png"],
  },
};

export const viewport: Viewport = {
  maximumScale: 1,
};

const manrope = Manrope({ subsets: ["latin"] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`bg-white dark:bg-gray-950 text-black dark:text-white ${manrope.className}`}
    >
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons2/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons2/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons2/favicon-16x16.png" />
      </head>
      <body className="min-h-[100dvh] bg-gray-50">
        <Providers>
          <Toaster richColors closeButton />
          {children}
        </Providers>
      </body>
    </html>
  );
}

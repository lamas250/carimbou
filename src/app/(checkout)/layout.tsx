import Image from "next/image";
import Link from "next/link";

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col py-40 items-center justify-center">
      <Link href="/">
        <Image src="/logo-full.png" alt="logo" width={150} height={150} />
      </Link>
      {children}
    </section>
  );
}

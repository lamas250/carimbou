import Header from "@/components/header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function UsuarioLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api
    .getSession({
      headers: await headers(),
    })
    .catch((error) => {
      console.error("Error getting session", error);
      throw redirect("/sign-in");
    });

  return (
    <div>
      <Header user={session?.user} />
      {children}
    </div>
  );
}

import Header from "@/components/header";
import { auth } from "@/lib/auth";
import { fetchSubscriptionByEmail } from "@/lib/stripe";
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

  let subscription = false;
  if (session?.user?.email) {
    const result = await fetchSubscriptionByEmail(session?.user?.email);
    subscription = result?.id ? true : false;
  }

  return (
    <div>
      <Header user={session?.user} subscription={subscription} />
      {children}
    </div>
  );
}

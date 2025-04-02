"use client";

import { signOut } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const router = useRouter();

  const signOutHandler = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.reload();
          router.push("/");
        },
      },
    });
  };
  return <Button onClick={signOutHandler}>Sign out</Button>;
}

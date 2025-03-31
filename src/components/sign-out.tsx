"use client";

import { signOut } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

export default function SignOut() {
  const signOutHandler = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect("/");
        },
      },
    });
  };
  return <Button onClick={signOutHandler}>Sign out</Button>;
}

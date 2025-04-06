"use client";

import { ArrowLeftIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function BackButton({ title }: { title: string }) {
  const router = useRouter();
  return (
    <Button variant="outline" onClick={() => router.back()}>
      <ArrowLeftIcon className="h-4 w-4" />
      {title}
    </Button>
  );
}

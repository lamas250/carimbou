"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut, Settings, CreditCard } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

interface NavbarProps {
  user?: {
    name?: string;
    image?: string;
    email?: string;
  };
}

export function UserMenu({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const getInitials = (name: string) => {
    const names = name.split(" ");
    if (names.length === 1) {
      return names[0].slice(0, 2).toUpperCase();
    }
    return names
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onError: (error) => {
          console.error("Error logging out", error);
        },
        onSuccess: () => {
          window.location.reload();
          redirect("/");
        },
      },
    });
  };

  return (
    <div>
      {user ? (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghostw" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                {user.image ? (
                  <AvatarImage src={user.image} alt={user.name || "User"} />
                ) : (
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getInitials(user.name || "User")}
                  </AvatarFallback>
                )}
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <div className="flex flex-col space-y-1 p-2">
              <p className="text-sm font-medium leading-none capitalize">{user.name || "User"}</p>
              <span className="text-xs text-muted-foreground">{user.email}</span>
            </div>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem asChild>
              <Link href="/settings" className="flex w-full cursor-pointer items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </Link>
            </DropdownMenuItem> */}
            <DropdownMenuItem asChild>
              <Link href="/assinatura" className="flex w-full cursor-pointer items-center">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Assinatura</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button asChild variant="default">
          <Link href="/login">Login</Link>
        </Button>
      )}
    </div>
  );
}

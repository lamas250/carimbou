"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useSession } from "@/lib/auth-client";
import { UserMenu } from "./user-menu";
import { User } from "@prisma/client";
import { Session } from "better-auth";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Header = ({ user }: { user: any }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background py-2" : "bg-background py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight transition-all duration-300"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex flex-row items-center">
            <Image src="/logo-icone.png" alt="logo" width={50} height={50} />
            Carimbou
          </div>
        </Link>

        {/* Desktop Navigation */}
        {user ? (
          <nav className="hidden md:flex items-center space-x-4">
            <NavLinks onClick={() => {}} authenticated={true} />
            <UserMenu user={user} />
          </nav>
        ) : (
          <nav className="hidden md:flex items-center space-x-4">
            <NavLinks onClick={() => {}} authenticated={false} />
          </nav>
        )}

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <button
            className="text-foreground p-2 focus:outline-none btn-hover"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          {user ? <UserMenu user={user} /> : null}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden bg-background absolute w-full transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-60 p-4 border-t border-border/50" : "max-h-0"
        }`}
      >
        {user ? (
          <nav className="flex flex-col space-y-4 px-4">
            <NavLinks onClick={() => setMobileMenuOpen(false)} authenticated={true} />
          </nav>
        ) : (
          <nav className="flex flex-col space-y-4 px-4">
            <NavLinks onClick={() => setMobileMenuOpen(false)} authenticated={false} />
          </nav>
        )}
      </div>
    </header>
  );
};

const NavLinks = ({ onClick, authenticated }: { onClick: () => void; authenticated: boolean }) => {
  const pathname = usePathname();

  const links = authenticated
    ? [
        { name: "Meus Cartões", path: "/home" },
        { name: "Minhas Empresas", path: "/empresas" },
      ]
    : [
        { name: "Entrar", path: "/sign-in" },
        { name: "Cadastrar", path: "/sign-up" },
      ];
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className={`text-sm font-medium transition-all duration-200 hover:text-primary ${
            pathname === link.path ? "text-primary" : "text-foreground/80"
          }`}
          onClick={onClick}
        >
          <Button variant="outline" className="p-1 px-2">
            {link.name}
          </Button>
        </Link>
      ))}
    </>
  );
};

export default Header;

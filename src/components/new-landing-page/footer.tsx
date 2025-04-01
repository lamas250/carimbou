import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center">
              <Link
                href="/"
                className="text-xl font-semibold tracking-tight transition-all duration-300"
              >
                <div className="flex flex-row items-center">
                  <Image src="/logo-icone.png" alt="logo" width={50} height={50} />
                  Carimbou
                </div>
              </Link>
            </div>
            <p className="mb-4 max-w-xs text-gray-400">
              Transformando cartões de fidelidade tradicionais em uma experiência digital perfeita.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 transition-colors hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 transition-colors hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 transition-colors hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 transition-colors hover:text-white">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Produto</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#how-it-works"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  Recursos
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-gray-400 transition-colors hover:text-white">
                  Preços
                </Link>
              </li>
              {/* <li>
                <Link href="#" className="text-gray-400 transition-colors hover:text-white">
                  Casos de uso
                </Link>
              </li> */}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Empresa</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 transition-colors hover:text-white">
                  Sobre nós
                </Link>
              </li>
              {/* <li>
                <Link href="#" className="text-gray-400 transition-colors hover:text-white">
                  Blog
                </Link>
              </li> */}
              <li>
                <Link href="#" className="text-gray-400 transition-colors hover:text-white">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Políticas</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 transition-colors hover:text-white">
                  Política de privacidade
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 transition-colors hover:text-white">
                  Termos de uso
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Carimbou. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

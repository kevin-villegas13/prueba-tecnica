"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PhoneCall, Users, Menu } from "lucide-react";

/**
 * Componente NavItem: Renderiza un enlace de navegación con estilo activo.
 * @param {string} href - Ruta del enlace.
 * @param {React.ReactNode} icon - Ícono a mostrar.
 * @param {string} label - Etiqueta del enlace.
 * @param {Function} onClick - Función para manejar el clic (opcional).
 */
const NavItem = ({
  href,
  icon: Icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}) => {
  const pathname = usePathname(); // Obtiene la ruta actual para determinar si el enlace está activo

  return (
    <Link href={href} onClick={onClick}>
      <Button
        variant={pathname === href ? "default" : "ghost"} // Si la ruta coincide, usa el estilo por defecto, si no, usa el estilo 'ghost'
        className="flex items-center w-full"
      >
        <Icon className="h-4 w-4 mr-2" /> {/* Renderiza el ícono */}
        {label} {/* Renderiza la etiqueta del enlace */}
      </Button>
    </Link>
  );
};

/**
 * Componente MobileMenu: Renderiza el menú desplegable en dispositivos móviles.
 * @param {boolean} isOpen - Estado que indica si el menú está abierto.
 * @param {Function} onClose - Función para cerrar el menú.
 */
const MobileMenu = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null; // Si el menú no está abierto, no renderiza nada

  return (
    <div className="md:hidden bg-white shadow-md rounded-lg p-4 absolute z-10 w-40">
      {/* Renderiza los elementos del menú móvil */}
      <NavItem href="/" icon={PhoneCall} label="Inicio" onClick={onClose} />
      <NavItem href="/agents" icon={Users} label="Agentes" onClick={onClose} />
      <NavItem
        href="/clients"
        icon={Users}
        label="Clientes"
        onClick={onClose}
      />
    </div>
  );
};

/**
 * Componente MainNav: Barra de navegación principal con soporte para menú móvil.
 */
export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para saber si el menú está abierto o cerrado

  const toggleMenu = () => setIsMenuOpen((prev) => !prev); // Función para alternar el estado del menú

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo o título */}
        <div className="mr-4 flex items-center space-x-2">
          <PhoneCall className="h-6 w-6" />
          <span className="font-bold text-lg">Centro de Contacto</span>
        </div>

        {/* Menú principal en pantallas grandes */}
        <div className="hidden md:flex items-center space-x-4">
          <NavItem href="/" icon={PhoneCall} label="Inicio" />
          <NavItem href="/agents" icon={Users} label="Agentes" />
          <NavItem href="/clients" icon={Users} label="Clientes" />
        </div>

        {/* Botón de menú móvil */}
        <div className="md:hidden">
          <Button onClick={toggleMenu} aria-label="Alternar menú">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Menú desplegable para móviles */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </nav>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle, 
  NavbarMenu, 
  NavbarMenuItem, 
  Link, 
  Button 
} from "@heroui/react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, List, Home } from "lucide-react";

export default function AppNavbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Ativa o efeito após 20px de scroll
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Início", href: "/", icon: <Home size={20} /> },
    { name: "Fazer Simulação", href: "/simular", icon: <Zap size={20} /> },
    { name: "Ver Listagem", href: "/listagem", icon: <List size={20} /> },
  ];

  return (
    <Navbar
      maxWidth="xl"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      // O SEGREDO: Usamos 'sticky' fixo e apenas trocamos as cores/blur
      className={`
        sticky top-0 z-50 transition-all duration-500 ease-in-out
        ${isScrolled 
          ? "bg-background/70 backdrop-blur-xl border-b border-divider shadow-sm h-16" 
          : "bg-white h-20"
        }
      `}
    >
      {/* Mobile: Botão de Menu */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle 
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"} 
          className="text-orange-500"
        />
      </NavbarContent>

      {/* Logo */}
      <NavbarBrand className="justify-center sm:justify-start">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            animate={{ scale: isScrolled ? 0.9 : 1 }}
            className="bg-orange-500 p-1.5 rounded-lg shadow-lg shadow-orange-500/20"
          >
            <Zap className="text-white fill-current" size={18} />
          </motion.div>
          <p className={`font-bold text-foreground tracking-tighter transition-all duration-300 ${
            isScrolled ? "text-lg" : "text-xl"
          }`}>
            UC <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent font-light">Desafio</span>
          </p>
        </Link>
      </NavbarBrand>

      {/* Desktop: Links */}
      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        {menuItems.filter(i => i.href !== "/").map((item) => {
          const isActive = pathname === item.href;
          return (
            <NavbarItem key={item.href} className="relative">
              <Link
                href={item.href}
                className={`flex items-center gap-2 px-2 py-1 text-sm font-medium transition-colors ${
                  isActive ? "text-orange-500" : "text-default-600 hover:text-orange-400"
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      {/* Desktop: Botão de Ação */}
      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <Button 
            as={Link} 
            href="/simular" 
            variant={isScrolled ? "flat" : "solid"}
            size={isScrolled ? "sm" : "md"}
            className={`
              font-semibold transition-all duration-300
              ${isScrolled 
                ? "bg-orange-500/10 text-orange-600 hover:bg-orange-500 hover:text-white" 
                : "bg-orange-600 text-white shadow-lg shadow-orange-500/30"
              }
            `}
            radius="full"
          >
            Começar
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* MENU MOBILE (Framer Motion Stagger) */}
      <NavbarMenu className="bg-background/80 backdrop-blur-xl pt-6">
        <AnimatePresence>
          {isMenuOpen && menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <NavbarMenuItem>
                  <Link
                    href={item.href}
                    onPress={() => setIsMenuOpen(false)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                      isActive 
                        ? "bg-orange-500/10 text-orange-500 font-bold" 
                        : "text-default-600 active:bg-default-100"
                    }`}
                    size="lg"
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </NavbarMenuItem>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </NavbarMenu>
    </Navbar>
  );
}
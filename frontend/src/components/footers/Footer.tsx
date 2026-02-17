"use client";

import { Linkedin, Github, ExternalLink } from "lucide-react";
import { Divider, Link, Tooltip } from "@heroui/react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Variantes de animação para os itens entrarem suavemente
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <footer className="relative mt-20 bg-background/60 backdrop-blur-md">
      <Divider className="opacity-50" />
      
      <motion.div 
        className="mx-auto max-w-7xl px-6 py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Lado Esquerdo: Branding */}
          <motion.div variants={containerVariants} className="text-center md:text-left space-y-2">
            <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              UC Desafio — Simulador de Compensação Energética
            </h3>
            <p className="text-sm text-default-500 max-w-xs">
              Transformando a gestão de energia com inteligência e transparência.
              Desafio Técnico Fullstack.
            </p>
          </motion.div>

          {/* Lado Direito: Info + Social */}
          <motion.div variants={containerVariants} className="flex flex-col items-center md:items-end gap-4">
            <div className="text-center md:text-right">
              <p className="text-sm text-default-600">
                Desenvolvido por{" "}
                <span className="font-semibold text-foreground italic">
                  Deilton Pedro
                </span>
              </p>
              <p className="text-xs text-default-400 mt-1">
                © {currentYear} Todos os direitos reservados.
              </p>
            </div>

            {/* Social Links com HeroUI e Framer Motion */}
            <div className="flex items-center gap-3">
              <Tooltip content="Ver LinkedIn">
                <Link
                  isExternal
                  href="https://www.linkedin.com/in/deilton-pedro/"
                  className="p-2 rounded-full hover:bg-primary/10 text-default-500 hover:text-primary transition-all"
                >
                  <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                    <Linkedin size={22} strokeWidth={1.5} />
                  </motion.div>
                </Link>
              </Tooltip>

              <Tooltip content="Ver Github">
                <Link
                  isExternal
                  href="https://github.com/DeJunior007"
                  className="p-2 rounded-full hover:bg-default-100 text-default-500 hover:text-foreground transition-all"
                >
                  <motion.div whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }}>
                    <Github size={22} strokeWidth={1.5} />
                  </motion.div>
                </Link>
              </Tooltip>
            </div>
          </motion.div>
        </div>

        {/* Tag de Status/Versão opcional */}
        <motion.div 
          variants={containerVariants}
          className="mt-8 flex justify-center md:justify-start"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-default-100 text-[10px] font-medium text-default-500 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            V1.0.0 — Stable
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
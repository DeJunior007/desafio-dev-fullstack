'use client';

import { motion } from 'framer-motion';
import {  
  Search,
  CalendarCheck,
  Layers,
  Cpu
} from 'lucide-react';

// Dados estáticos do conteúdo
const features = [
  {
    icon: Cpu,
    title: 'Extração Automática',
    description: 'Decodificação via Magic-PDF API para faturas rápidas.',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    icon: Layers,
    title: 'Múltiplas UCs',
    description: 'Simulação de uma ou mais unidades de energia por lead.',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    icon: CalendarCheck,
    title: 'Histórico 12 Meses',
    description: 'Validação técnica precisa baseada no ciclo anual de consumo.',
    color: 'from-orange-500 to-red-600'
  },
  {
    icon: Search,
    title: 'Gestão Inteligente',
    description: 'Painel completo com filtros por UC, e-mail e nome.',
    color: 'from-purple-500 to-fuchsia-600'
  }
];

export function SimulationFeatures() {
  // Variantes de animação para entrada em cascata
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{ y: -5 }}
          className="group relative"
        >
          {/* Efeito Glassmorphism */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl rounded-2xl border border-white/50 shadow-xl transition-all group-hover:shadow-2xl" />
          
          <div className="relative p-6 space-y-3">
            {/* Ícone com gradiente */}
            <div className={`
              inline-flex p-3 rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110
              bg-gradient-to-br ${feature.color}
            `}>
              <feature.icon className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>

            {/* Texto */}
            <div>
              <h3 className="font-bold text-lg text-default-900 leading-tight">
                {feature.title}
              </h3>
              <p className="text-sm text-default-600 mt-1 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
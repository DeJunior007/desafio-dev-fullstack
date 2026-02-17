'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Search, AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 via-zinc-100/50 to-zinc-200 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 md:p-12 relative overflow-hidden"
      >
        {/* Ícone animado */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            delay: 0.2, 
            type: "spring", 
            stiffness: 200, 
            damping: 10 
          }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="bg-gradient-to-br from-orange-100 to-red-100 rounded-full p-6"
            >
              <Search className="w-16 h-16 text-orange-600" strokeWidth={2} />
            </motion.div>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-2 -right-2"
            >
              <AlertCircle className="w-8 h-8 text-red-500" fill="white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Número 404 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-6"
        >
          <h1 className="text-8xl md:text-9xl font-extrabold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mb-2">
            404
          </h1>
        </motion.div>

        {/* Título */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4"
        >
          Página não encontrada!
        </motion.h2>

        {/* Descrição */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 text-center text-lg mb-8 leading-relaxed"
        >
          Ops! Parece que você se perdeu no caminho. A página que você está procurando não existe ou foi movida para outro lugar.
        </motion.p>

        {/* Botões de ação */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* Botão primário */}
          <Link href="/simular" >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full  sm:w-auto bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-orange-500/50 hover:shadow-xl hover:shadow-orange-500/60 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <Search className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Voltar para simulação
            </motion.button>
          </Link>

          {/* Botão secundário */}
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-orange-300 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Página inicial
            </motion.button>
          </Link>
        </motion.div>

        {/* Link alternativo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-8"
        >
          <Link 
            href="/"
            className="text-orange-600 hover:text-red-600 font-medium text-sm inline-flex items-center gap-1 group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Voltar ao início
          </Link>
        </motion.div>

        {/* Decoração de fundo */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl opacity-5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-3xl transform translate-x-32 -translate-y-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500 rounded-full blur-3xl transform -translate-x-32 translate-y-32" />
        </div>
      </motion.div>

      {/* Partículas flutuantes de fundo */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
              opacity: 0
            }}
            animate={{
              y: [null, Math.random() * -100 - 50],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            className="absolute w-2 h-2 bg-white rounded-full"
          />
        ))}
      </div>
    </div>
  )
}
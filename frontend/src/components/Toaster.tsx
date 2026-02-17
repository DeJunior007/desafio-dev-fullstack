"use client";

import { Toaster as HotToaster, toast, type Toast, resolveValue, type ToasterProps } from 'react-hot-toast';
import { motion, type PanInfo } from 'framer-motion';
import { 
  Check, 
  X, 
  Loader2, 
  Info, 
  AlertCircle
} from 'lucide-react';

// Re-exporta o toast para ser usado em outros componentes
export { toast };

const getErrorMessage = (error: unknown): string => {
  if (!error) return "Ocorreu um erro inesperado.";
  // Se for um objeto de erro padrão ou customizado
  if (typeof error === "object" && error !== null && "message" in error) {
    return String((error as any).message);
  }
  // Se for string direta
  if (typeof error === "string") return error;
  return "Ocorreu um erro inesperado.";
};

const getToastConfig = (type: Toast['type']) => {
  switch (type) {
    case 'success':
      return {
        title: 'Sucesso',
        icon: Check,
        bgIcon: 'bg-green-100 dark:bg-green-900/30',
        textIcon: 'text-green-600 dark:text-green-400',
        barColor: 'bg-green-500'
      };
    case 'error':
      return {
        title: 'Erro',
        icon: AlertCircle,
        bgIcon: 'bg-red-100 dark:bg-red-900/30',
        textIcon: 'text-red-600 dark:text-red-400',
        barColor: 'bg-red-500'
      };
    case 'loading':
      return {
        title: 'Processando',
        icon: Loader2,
        bgIcon: 'bg-blue-100 dark:bg-blue-900/30',
        textIcon: 'text-blue-600 dark:text-blue-400',
        barColor: 'bg-blue-500'
      };
    case 'custom':
    case 'blank':
    default:
      return {
        title: 'Informação',
        icon: Info,
        bgIcon: 'bg-orange-100 dark:bg-orange-900/30',
        textIcon: 'text-orange-600 dark:text-orange-400',
        barColor: 'bg-orange-500'
      };
  }
};

// --- Componente do Card Individual (ToastItem) ---

interface ToastItemProps {
  t: Toast;
}

const ToastItem = ({ t }: ToastItemProps) => {
  const { type } = t;
  const config = getToastConfig(type);
  const Icon = config.icon;
  
  // Resolve o conteúdo da mensagem (pode ser string, componente ou função)
  const messageContent = resolveValue(t.message, t);
  
  // Tratamento especial para mensagens de erro
  const finalMessage = type === 'error' && typeof messageContent !== 'string' 
    ? getErrorMessage(messageContent) 
    : String(messageContent);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100; // Distância mínima para fechar
    const velocity = Math.abs(info.velocity.x);
    if (Math.abs(info.offset.x) > threshold || velocity > 500) {
      toast.dismiss(t.id);
    }
  };

  return (
    <motion.div
      layout
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ 
        opacity: t.visible ? 1 : 0, 
        y: t.visible ? 0 : -20, 
        scale: t.visible ? 1 : 0.95 
      }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`
        pointer-events-auto flex w-full max-w-sm rounded-xl bg-white/95 dark:bg-gray-800/95 
        shadow-xl ring-1 ring-black/5 backdrop-blur-md dark:ring-white/10 overflow-hidden
        ${t.className}
      `}
    >
      {/* Barra lateral colorida */}
      <div className={`w-1.5 ${config.barColor}`} />

      <div className="flex w-full items-start gap-3 p-4">
        {/* Container do Ícone */}
        <div className={`
          flex h-8 w-8 shrink-0 items-center justify-center rounded-full 
          ${config.bgIcon} ${config.textIcon}
        `}>
          <Icon className={`w-5 h-5 ${type === 'loading' ? 'animate-spin' : ''}`} />
        </div>

        {/* Conteúdo de Texto */}
        <div className="flex-1 pt-0.5">
          <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">
            {config.title}
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {finalMessage}
          </p>
        </div>

        {/* Botão Fechar (exceto loading) */}
        {type !== 'loading' && (
          <button
            onClick={() => toast.dismiss(t.id)}
            className="group shrink-0 rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          >
            <X className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span className="sr-only">Fechar</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};

// --- Componente Principal (Toaster) ---

export const Toaster = (props: ToasterProps) => {
  return (
    <HotToaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        // Removemos o estilo padrão do react-hot-toast
        style: {
          background: 'transparent',
          boxShadow: 'none',
          padding: 0,
          border: 'none',
          maxWidth: 'none', // Deixa o width ser controlado pelo nosso componente
        },
      }}
      {...props}
    >
      {(t) => (
        <ToastItem t={t} />
      )}
    </HotToaster>
  );
};
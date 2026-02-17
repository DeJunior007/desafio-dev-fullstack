import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export function SimulationHeader() {
  return (
    <div className="text-center space-y-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="inline-flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-2xl shadow-lg"
      >
        <Zap className="w-12 h-12 text-white" strokeWidth={2.5} />
      </motion.div>
      
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
  Simulação de Compensação Energética
</h1>

      
      <p className="text-lg text-default-600 max-w-2xl mx-auto">
        Descubra quanto você pode economizar com energia!
      </p>
    </div>
  );
}
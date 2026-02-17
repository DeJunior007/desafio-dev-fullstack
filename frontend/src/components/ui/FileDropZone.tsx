import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle2, AlertCircle } from "lucide-react";
import { Chip } from "@heroui/react";

interface FileDropzoneProps {
  files: File[];
  onFilesSelected: (files: File[]) => void;
  error?: string;
  accept?: string;
  maxFiles?: number;
}

export function FileDropzone({ files, onFilesSelected, error, accept = ".pdf" }: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFilesSelected(Array.from(e.target.files));
    }
  };

  const removeFile = (indexToRemove: number) => {
    onFilesSelected(files.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        accept={accept}
        multiple
        className="hidden"
        ref={inputRef}
        onChange={handleChange}
      />
      
      <motion.div 
        onClick={() => inputRef.current?.click()}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={`
          relative cursor-pointer p-8 flex flex-col items-center rounded-2xl border-2 border-dashed transition-all backdrop-blur-md
          ${error 
            ? 'bg-red-100/80 border-red-300' 
            : files.length > 0 
              ? 'bg-green-50/80 border-green-300' 
              : 'bg-white/60 border-default-300 hover:border-orange-400'
          }
        `}
      >
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          {files.length > 0 ? (
            <CheckCircle2 className="w-12 h-12 text-success-600 mb-3" />
          ) : (
            <Upload className="w-12 h-12 text-orange-500 mb-3" />
          )}
        </motion.div>
        
        <span className="text-base font-semibold text-center text-default-700">
          {files.length > 0 ? `${files.length} arquivo(s)` : 'Clique ou arraste arquivos'}
        </span>

        <AnimatePresence>
          {files.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {files.map((f, i) => (
                // Wrapper para interceptar o clique nativo
                <div 
                  key={i}
                  // Impede que cliques no chip (ou no X) subam para o Dropzone
                  onClick={(e) => e.stopPropagation()} 
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <Chip 
                    variant="flat" 
                    color="success" 
                    // Agora onClose recebe apenas a lógica, sem o evento 'e'
                    onClose={() => removeFile(i)}
                  >
                    {f.name}
                  </Chip>
                </div>
              ))}
            </div>
          )}
        </AnimatePresence>
        
        {error && (
          <div className="flex items-center gap-2 mt-3 text-danger text-sm">
            <AlertCircle className="w-4 h-4" />{error}
          </div>
        )}
      </motion.div>
    </div>
  );
}
import * as z from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf"];

// Valida cada arquivo individualmente, com mensagens específicas por problema
const fileSchema = z
  .instanceof(File, { message: "Item inválido: esperado um arquivo" })
  .refine(
    (file) => ACCEPTED_FILE_TYPES.includes(file.type),
    "Apenas arquivos PDF são aceitos"
  )
  .refine(
    (file) => file.size <= MAX_FILE_SIZE,
    "Cada arquivo deve ter no máximo 5MB"
  );

export const simulationSchema = z.object({
  nome: z
    .string()
    .min(1, "O nome é obrigatório")
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100, "O nome deve ter no máximo 100 caracteres"),

  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Digite um e-mail válido (ex: nome@email.com)"),

  telefone: z
    .string()
    .min(1, "O telefone é obrigatório")
    .min(10, "Telefone inválido — mínimo 10 dígitos")
    .max(15, "Telefone inválido — máximo 15 dígitos"),

  // Array valida cada arquivo individualmente via fileSchema
  files: z
    .array(fileSchema)
    .min(1, "Selecione pelo menos uma conta de energia")
    .max(12, "Máximo de 12 faturas por simulação"),
});

export type SimulationFormData = z.infer<typeof simulationSchema>;
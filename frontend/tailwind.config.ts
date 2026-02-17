import { heroui } from "@heroui/theme"; // Use @heroui/theme para evitar erros de Node
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    // ESSA LINHA ABAIXO É O QUE SALVA O VISUAL:
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
} satisfies Config;
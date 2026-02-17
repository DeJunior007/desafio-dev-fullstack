import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SimulationIdHeader({ id }: { id: string }) {
  return (
    <div className="flex justify-between items-center py-2">
      <Link
        href="/listagem"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200 group"
      >
        <ArrowLeft
          size={15}
          className="transition-transform duration-200 group-hover:-translate-x-1"
        />
        Voltar para listagem
      </Link>

      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5">
        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
          ID
        </span>
        <span className="text-xs font-mono text-gray-600 select-all">{id}</span>
      </div>
    </div>
  );
}
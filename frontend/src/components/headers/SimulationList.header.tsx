import { LayoutList } from "lucide-react";

interface Props {
  total?: number;
}

export function SimulationListHeader({ total }: Props) {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
          <LayoutList size={16} className="text-orange-500" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight leading-none">
            Simulações
          </h1>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-medium">
            Realizadas
          </p>
        </div>
      </div>

      {total !== undefined && (
        <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-lg px-3 py-2">
          <span className="text-sm font-bold text-gray-800 tabular-nums">
            {total.toLocaleString("pt-BR")}
          </span>
          <span className="text-xs text-gray-400 font-medium">
            {total === 1 ? "registro" : "registros"}
          </span>
        </div>
      )}
    </header>
  );
}
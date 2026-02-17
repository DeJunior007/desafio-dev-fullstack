import Link from "next/link";
import { SimulationHistory } from "../../../lib/interfaces/types";
import { GlassCard } from "@/components/ui/GlassCard";
import { Clock, ArrowUpRight } from "lucide-react";

interface Props {
  history: SimulationHistory[];
}

export function SimulationHistoryCard({ history }: Props) {
  if (!history.length) return null;

  return (
    <GlassCard className="p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Clock size={14} className="text-gray-400" />
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-widest">
          Outras simulações deste cliente
        </h3>
        <span className="ml-auto text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5 font-medium">
          {history.length}
        </span>
      </div>

      {/* List */}
      <div className="space-y-2">
        {history.map((item, i) => (
          <Link
            key={item.id}
            href={`/listagem/${item.id}`}
            className="flex items-center justify-between p-3.5 rounded-lg border border-gray-100 hover:border-gray-300 hover:bg-gray-50 transition-all duration-150 group"
          >
            <div className="flex items-center gap-3">
              {/* Index badge */}
              <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold flex items-center justify-center shrink-0 group-hover:bg-gray-200 transition-colors">
                {i + 1}
              </span>

              <div>
                <p className="text-sm font-medium text-gray-800">
                  Simulação de{" "}
                  {new Date(item.createdAt).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-xs text-gray-400 font-mono mt-0.5">
                  {item.id}
                </p>
              </div>
            </div>

            <span className="flex items-center gap-1 text-xs text-gray-400 group-hover:text-gray-700 transition-colors font-medium shrink-0 ml-4">
              Ver
              <ArrowUpRight
                size={13}
                className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </Link>
        ))}
      </div>
    </GlassCard>
  );
}
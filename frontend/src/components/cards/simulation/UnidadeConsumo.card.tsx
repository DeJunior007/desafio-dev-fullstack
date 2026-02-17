import { Unidade } from "../../../lib/interfaces/types";
import { GlassCard } from "@/components/ui/GlassCard";
import { Zap } from "lucide-react";

interface Props {
  unidade: Unidade;
}

export function UnidadeConsumoCard({ unidade }: Props) {
  const consumos = unidade.historicoDeConsumoEmKWH ?? [];
  const maxConsumo = Math.max(...consumos.map((c) => c.consumoForaPontaEmKWH));
  const avgConsumo =
    consumos.length > 0
      ? Math.round(
          consumos.reduce((s, c) => s + c.consumoForaPontaEmKWH, 0) /
            consumos.length
        )
      : 0;

  return (
    <GlassCard className="overflow-hidden">
      {/* Header */}
      <header className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center shrink-0">
            <Zap size={14} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-0.5">
              Unidade Consumidora
            </p>
            <h3 className="text-sm font-semibold text-gray-900">
              {unidade.codigoDaUnidadeConsumidora}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge>{unidade.enquadramento}</Badge>
          <Badge>{unidade.modeloFasico}</Badge>
        </div>
      </header>

      <div className="p-6">
        {/* Stats summary */}
        {consumos.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <StatPill label="Média mensal" value={`${avgConsumo} kWh`} />
            <StatPill label="Pico de consumo" value={`${maxConsumo} kWh`} />
          </div>
        )}

        {/* Table */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-3">
            Histórico de Consumo
          </p>

          {consumos.length === 0 ? (
            <p className="text-sm text-gray-400 py-6 text-center border border-dashed border-gray-200 rounded-lg">
              Nenhum consumo registrado
            </p>
          ) : (
            <div className="rounded-lg border border-gray-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-400 text-xs uppercase tracking-wide">
                    <th className="text-left px-4 py-3 font-semibold">Mês</th>
                    <th className="text-right px-4 py-3 font-semibold">
                      Consumo (kWh)
                    </th>
                    <th className="text-right px-4 py-3 font-semibold w-28 hidden sm:table-cell">
                      Relativo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {consumos.map((consumo, i) => {
                    const pct =
                      maxConsumo > 0
                        ? (consumo.consumoForaPontaEmKWH / maxConsumo) * 100
                        : 0;
                    return (
                      <tr
                        key={consumo.id}
                        className={`border-t border-gray-100 hover:bg-gray-50 transition-colors ${
                          i % 2 === 0 ? "" : "bg-gray-50/40"
                        }`}
                      >
                        <td className="px-4 py-3 text-gray-700 capitalize">
                          {formatMonth(consumo.mesDoConsumo)}
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-900 tabular-nums">
                          {consumo.consumoForaPontaEmKWH.toLocaleString(
                            "pt-BR"
                          )}
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-orange-600 rounded-full transition-all"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-400 tabular-nums w-8 text-right">
                              {Math.round(pct)}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs px-2.5 py-1 rounded-md border border-gray-200 bg-white text-gray-600 font-medium">
      {children}
    </span>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3">
      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">
        {label}
      </p>
      <p className="text-base font-semibold text-gray-900">{value}</p>
    </div>
  );
}

function formatMonth(date: string) {
  return new Date(date).toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });
}
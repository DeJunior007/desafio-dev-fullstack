'use client';

import { useParams } from "next/navigation";
import { useSimulationDetails } from "@/app/hooks/use-simulations";
import { LeadInfoCard } from "@/components/cards/simulation/LeadInfo.card";
import { UnidadeConsumoCard } from "@/components/cards/simulation/UnidadeConsumo.card";
import { SimulationHistoryCard } from "@/components/cards/simulation/SimulationHistory.card";
import { LeadDetails } from "@/lib/interfaces/types";
import SimulationIdHeader from "@/components/headers/SimulationId.header";
import { Loader2, AlertTriangle } from "lucide-react";

export default function SimulationIdDetailsPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useSimulationDetails(id as string);

  if (isLoading) return <State message="Carregando simulação..." loading />;
  if (isError || !data)
    return <State message="Não foi possível carregar esta simulação." error />;

  const lead = data as LeadDetails;

  return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Header */}
        <SimulationIdHeader id={id as string} />

        {/* Page title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Detalhes da Simulação
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {lead.unidades?.length ?? 0}{" "}
            {lead.unidades?.length === 1
              ? "unidade consumidora"
              : "unidades consumidoras"}
          </p>
        </div>

        {/* Lead info */}
        <LeadInfoCard lead={lead} />

        {/* Unidades */}
        {lead.unidades?.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 px-1">
              Unidades Consumidoras
            </h2>
            {lead.unidades.map((unidade) => (
              <UnidadeConsumoCard key={unidade.id} unidade={unidade} />
            ))}
          </section>
        )}

        {/* History */}
        {lead.history?.length > 0 && (
          <SimulationHistoryCard history={lead.history} />
        )}
      </div>
  );
}

function State({
  message,
  error,
  loading,
}: {
  message: string;
  error?: boolean;
  loading?: boolean;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-center p-8">
        {loading && (
          <Loader2 size={24} className="text-gray-400 animate-spin" />
        )}
        {error && (
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
            <AlertTriangle size={18} className="text-red-400" />
          </div>
        )}
        <p
          className={`text-sm font-medium ${
            error ? "text-red-500" : "text-gray-500"
          }`}
        >
          {message}
        </p>
      </div>
    </div>
  );
}
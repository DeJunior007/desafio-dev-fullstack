'use client';

import Link from "next/link";
import { Chip, Spinner } from "@heroui/react";
import { ArrowUpRight, UserIcon } from "lucide-react";
import { SimulationListItem } from "@/lib/interfaces/types";

interface Props {
  items: SimulationListItem[];
  isLoading: boolean;
}

function getAvatarColor(name: string) {
  const colors = [
    "bg-orange-100 text-orange-600",
    "bg-sky-100 text-sky-600",
    "bg-violet-100 text-violet-600",
    "bg-emerald-100 text-emerald-600",
    "bg-rose-100 text-rose-600",
    "bg-amber-100 text-amber-600",
  ];
  return colors[name.charCodeAt(0) % colors.length];
}

function getInitials(name: string) {
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

const ENQUADRAMENTO_COLORS: Record<string, "warning" | "primary" | "secondary" | "success"> = {
  B3: "warning",
  B1: "primary",
  A4: "secondary",
  A3: "success",
};

export function SimulationMobileList({ items, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-gray-400">
        <Spinner color="warning" size="sm" />
        <span className="text-xs">Carregando simulações...</span>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-gray-400">
        <UserIcon size={28} strokeWidth={1.5} />
        <span className="text-sm">Nenhuma simulação encontrada</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <Link
          key={item.id}
          href={`/listagem/${item.id}`}
          className="group flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-3.5 shadow-sm hover:border-orange-200 hover:shadow-md transition-all duration-200 active:scale-[0.99]"
        >
          {/* Avatar */}
          <div
            className={[
              "w-10 h-10 rounded-full flex items-center justify-center",
              "text-xs font-bold shrink-0 select-none",
              getAvatarColor(item.nomeCompleto),
            ].join(" ")}
          >
            {getInitials(item.nomeCompleto)}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Name + date row */}
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-sm font-semibold text-gray-900 truncate leading-tight">
                {item.nomeCompleto}
              </p>
              <span className="text-[11px] text-gray-400 tabular-nums shrink-0">
                {new Date(item.createdAt).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                })}
              </span>
            </div>

            {/* Email */}
            <p className="text-xs text-gray-400 truncate mt-0.5">
              {item.email}
            </p>

            {/* Chips */}
            {item.unidades.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {item.unidades.map((u) => (
                  <Chip
                    key={u.id}
                    size="sm"
                    variant="flat"
                    color={ENQUADRAMENTO_COLORS[u.enquadramento] ?? "default"}
                    classNames={{
                      base: "h-5 px-2",
                      content: "text-[10px] font-semibold px-0",
                    }}
                  >
                    {u.codigoDaUnidadeConsumidora} · {u.enquadramento}
                  </Chip>
                ))}
              </div>
            )}
          </div>

          {/* Arrow */}
          <ArrowUpRight
            size={15}
            className="shrink-0 text-gray-300 group-hover:text-orange-400 transition-colors"
          />
        </Link>
      ))}
    </div>
  );
}
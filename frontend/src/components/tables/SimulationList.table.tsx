'use client';

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Chip,
  Button,
  Spinner,
} from "@heroui/react";
import Link from "next/link";
import { ArrowUpRight, User as UserIcon } from "lucide-react";
import { SimulationListItem } from "@/lib/interfaces/types";

interface Props {
  items: SimulationListItem[];
  page: number;
  totalPages: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

// Gera uma cor de fundo determinística a partir do nome
function getAvatarColor(name: string) {
  const colors = [
    "bg-orange-100 text-orange-600",
    "bg-sky-100 text-sky-600",
    "bg-violet-100 text-violet-600",
    "bg-emerald-100 text-emerald-600",
    "bg-rose-100 text-rose-600",
    "bg-amber-100 text-amber-600",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
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

export function SimulationListTable({
  items,
  page,
  totalPages,
  isLoading,
  onPageChange,
}: Props) {
  return (
    <Table
      aria-label="Tabela de Simulações"
      bottomContent={
        totalPages > 1 ? (
          <div className="flex w-full items-center justify-center py-2">
            <Pagination
              isCompact
              showControls
              color="warning"
              page={page}
              total={totalPages}
              onChange={onPageChange}
            />
          </div>
        ) : null
      }
      classNames={{
        wrapper: "min-h-[400px] shadow-sm rounded-2xl border border-gray-100 bg-white",
        thead: "[&>tr]:first:shadow-none",
        th: [
          "bg-gray-50 text-[10px] font-bold uppercase tracking-widest",
          "text-gray-400 border-b border-gray-100",
          "first:rounded-tl-2xl last:rounded-tr-2xl",
        ].join(" "),
        td: "py-4 border-b border-gray-50 last-of-type:border-none",
        tr: "hover:bg-gray-50/60 transition-colors group",
      }}
    >
      <TableHeader>
        <TableColumn>Lead</TableColumn>
        <TableColumn>Unidades</TableColumn>
        <TableColumn>Data</TableColumn>
        <TableColumn align="center">Ação</TableColumn>
      </TableHeader>

      <TableBody
        isLoading={isLoading}
        loadingContent={
          <div className="flex flex-col items-center gap-3 py-16 text-gray-400">
            <Spinner color="warning" size="sm" />
            <span className="text-xs">Carregando simulações...</span>
          </div>
        }
        emptyContent={
          !isLoading ? (
            <div className="flex flex-col items-center gap-2 py-16 text-gray-400">
              <UserIcon size={28} strokeWidth={1.5} />
              <span className="text-sm">Nenhuma simulação encontrada</span>
            </div>
          ) : null
        }
      >
        {items.map((item) => (
          <TableRow key={item.id}>
            {/* Lead */}
            <TableCell>
              <div className="flex items-center gap-3">
                {/* Avatar com iniciais */}
                <div
                  className={[
                    "w-9 h-9 rounded-full flex items-center justify-center",
                    "text-xs font-bold shrink-0 select-none",
                    getAvatarColor(item.nomeCompleto),
                  ].join(" ")}
                >
                  {getInitials(item.nomeCompleto)}
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate leading-tight">
                    {item.nomeCompleto}
                  </p>
                  <p className="text-xs text-gray-400 truncate mt-0.5">
                    {item.email}
                  </p>
                </div>
              </div>
            </TableCell>

            {/* Unidades */}
            <TableCell>
              <div className="flex flex-wrap gap-1.5">
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
            </TableCell>

            {/* Data */}
            <TableCell>
              <span className="text-xs text-gray-500 tabular-nums">
                {new Date(item.createdAt).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </TableCell>

            {/* Ação */}
            <TableCell>
              <div className="flex justify-center">
                <Button
                  as={Link}
                  href={`/listagem/${item.id}`}
                  size="sm"
                  variant="flat"
                  color="warning"
                  endContent={
                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  }
                  className="h-7 px-3 min-w-0 text-xs font-semibold"
                >
                  Ver
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
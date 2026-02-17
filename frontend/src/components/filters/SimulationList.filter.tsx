'use client';

import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Search, ChevronDown, X, SlidersHorizontal } from "lucide-react";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  onClear: () => void;
}

const statusOptions = [
  { name: "Todos", uid: "all" },
  { name: "AX", uid: "AX" },
  { name: "B1", uid: "B1" },
  { name: "B2", uid: "B2" },
  { name: "B3", uid: "B3" },
];

const hasActiveFilters = (search: string, status: string) =>
  search.trim().length > 0 || status !== "all";

export function SimulationListFilters({
  search,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  onClear,
}: Props) {
  const isFiltered = hasActiveFilters(search, selectedStatus);
  const selectedLabel = statusOptions.find((o) => o.uid === selectedStatus)?.name ?? "Todos";

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search input — custom, sem depender do HeroUI Input para evitar conflito de estilos */}
      <div className="relative flex-1">
        <Search
          size={14}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por nome, e-mail ou UC..."
          className={[
            "w-full h-10 pl-9 pr-9 text-sm rounded-xl",
            "bg-white border-2 border-gray-200",
            "placeholder:text-gray-400 text-gray-900",
            "outline-none transition-all duration-200",
            "hover:border-orange-300",
            "focus:border-orange-500 focus:shadow-[0_0_0_3px_rgb(249,115,22,0.12)]",
          ].join(" ")}
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Enquadramento dropdown */}
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="flat"
              className={[
                "h-10 px-4 text-sm font-medium rounded-xl border-2 transition-all duration-200",
                selectedStatus !== "all"
                  ? "border-orange-400 bg-orange-50 text-orange-700"
                  : "border-gray-200 bg-white text-gray-700 hover:border-orange-300",
              ].join(" ")}
              startContent={<SlidersHorizontal size={13} className="shrink-0" />}
              endContent={<ChevronDown size={13} className="shrink-0 opacity-50" />}
            >
              {selectedStatus === "all" ? "Enquadramento" : selectedLabel}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            selectionMode="single"
            selectedKeys={[selectedStatus]}
            onSelectionChange={(keys) => onStatusChange(Array.from(keys)[0] as string)}
            items={statusOptions}
            classNames={{
              base: "min-w-[160px]",
            }}
          >
            {(item) => (
              <DropdownItem
                key={item.uid}
                classNames={{
                  base: "text-sm",
                  title: item.uid === selectedStatus ? "text-orange-600 font-semibold" : "",
                }}
              >
                {item.name}
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>

        {/* Clear — só aparece quando há filtros ativos */}
        {isFiltered && (
          <Button
            variant="light"
            onClick={onClear}
            className="h-10 px-3 text-xs font-medium text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 min-w-0"
            startContent={<X size={13} />}
          >
            Limpar
          </Button>
        )}
      </div>
    </div>
  );
}
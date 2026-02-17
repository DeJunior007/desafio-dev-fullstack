'use client';

import { useState, useMemo } from "react";
import { Pagination } from "@heroui/react";
import { useSimulations } from "@/app/hooks/use-simulations";
import { SimulationListHeader } from "@/components/headers/SimulationList.header";
import { SimulationListFilters } from "@/components/filters/SimulationList.filter";
import { SimulationListTable } from "@/components/tables/SimulationList.table";
import { SimulationMobileList } from "@/components/lists/SimulationList.list";
import { SimulationListResponse } from "@/lib/interfaces/types";

export default function ListagemPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const { data, isLoading, isFetching } = useSimulations(page, search);
  const typedData = data as SimulationListResponse | undefined;

  const filteredItems = useMemo(() => {
    if (!typedData) return [];
    if (status === "all") return typedData.data;
    return typedData.data.filter((lead) =>
      lead.unidades.some((u) => u.enquadramento === status)
    );
  }, [typedData, status]);

  const totalPages = typedData?.meta?.lastPage ?? 1;
  const isTableLoading = isLoading || isFetching;

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleClear() {
    setSearch("");
    setStatus("all");
    setPage(1);
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-5">

        <SimulationListHeader total={filteredItems.length} />

        <SimulationListFilters
          search={search}
          onSearchChange={handleSearchChange}
          selectedStatus={status}
          onStatusChange={setStatus}
          onClear={handleClear}
        />

        {/* Desktop — tabela */}
        <div className="hidden sm:block">
          <SimulationListTable
            items={filteredItems}
            page={page}
            totalPages={totalPages}
            isLoading={isTableLoading}
            onPageChange={setPage}
          />
        </div>

        {/* Mobile — cards */}
        <div className="sm:hidden space-y-3">
          <SimulationMobileList items={filteredItems} isLoading={isTableLoading} />

          {totalPages > 1 && !isTableLoading && (
            <div className="flex justify-center pt-1">
              <Pagination
                isCompact
                showControls
                color="warning"
                page={page}
                total={totalPages}
                onChange={setPage}
              />
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
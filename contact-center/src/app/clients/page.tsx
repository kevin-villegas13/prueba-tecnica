"use client";

import { useEffect, useState } from "react";
import { useGet } from "../hooks/useApiHooks";
import { Client } from "@/lib/types/clients";
import { ClientCard } from "@/components/clients/clients.cards";
import { ClientsFilter } from "@/components/clients/clients.filter";


export default function ClientsPage() {
  const [filter, setFilter] = useState<string>("all");

  // Determina el endpoint y los parámetros según el filtro seleccionado.
  const queryParams = filter !== "all" ? { minWaitTime: filter } : undefined;
  const endpoint =
    filter === "all" ? "api/clients/all" : "api/clients/filtered";

  const { data, loading, error } = useGet<{ data: Client[] }>(
    endpoint,
    queryParams
  );

  const [filteredClients, setFilteredClients] = useState<Client[]>([]);

  // Actualiza la lista de clientes cuando se recibe nueva data.
  useEffect(() => {
    if (data) {
      setFilteredClients(data.data);
    }
  }, [data]);

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 space-y-6">
      {/* Encabezado y Filtro */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-800">
            Clients Queue
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Monitor waiting clients in real-time
          </p>
        </div>
        <ClientsFilter onFilterChange={setFilter} defaultFilter={filter} />
      </div>

      {/* Estado de carga o error */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {/* Tarjetas de Clientes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </div>
  );
}

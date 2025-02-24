"use client";

import { useState, useEffect } from "react";
import { useGet, useWebSocket } from "@/app/hooks/useApiHooks";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { AgentCard } from "@/components/agent/agent-card";
import { AgentsFilter } from "@/components/agent/agents-filter";

// Definición de la interfaz para los agentes
interface Agent {
  id: string;
  name: string;
  status: number;
}

export default function AgentsPage() {
  // Estado local para el filtro y la lista de agentes
  const [filter, setFilter] = useState<number | undefined>(undefined);
  const [agents, setAgents] = useState<Agent[]>([]);

  // Establecer el endpoint según si hay un filtro aplicado
  const endpoint = filter !== undefined ? "api/agents/filter" : "api/agents";

  // Hook personalizado para obtener los datos de la API
  const {
    data: response,
    loading,
    error,
  } = useGet<{ status: boolean; message: string; data: Agent[] }>(
    endpoint,
    filter !== undefined ? { status: filter } : undefined
  );

  // Actualiza la lista de agentes cuando se obtienen los datos
  useEffect(() => {
    if (!loading && response?.data) {
      setAgents(response.data);
    }
  }, [loading, response]);

  // Maneja el cambio de filtro
  const handleFilterChange = (status?: number) => {
    setFilter(status);
  };

  // Muestra un mensaje mientras se cargan los datos
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading agents: {error}</div>;

  return (
    <div className="space-y-8 px-4 md:px-8">
      {/* Cabecera de la página */}
      <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agentes</h1>
          <p className="text-muted-foreground">
            Gestiona los agentes del Contact Center.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {/* Filtro para los agentes */}
          <AgentsFilter
            onFilterChange={handleFilterChange}
            defaultFilter={
              filter === undefined
                ? "all"
                : filter === 0
                ? "available"
                : filter === 1
                ? "busy"
                : "break"
            }
          />
          {/* Botón para agregar un nuevo agente */}
          <Link href="/agents/new">
            <Button variant="default">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Agente
            </Button>
          </Link>
        </div>
      </header>

      {/* Lista de agentes */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}

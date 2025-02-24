import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { DeleteAgentButton } from "./delete-agent-button";
import { Agent } from "@/lib/types/agents";

// Función para obtener la etiqueta de estado en texto según el número
const getStatusLabel = (status: number): string => {
  switch (status) {
    case 0:
      return "Disponible"; // Agente disponible
    case 1:
      return "Ocupado"; // Agente ocupado
    case 2:
      return "Descanso"; // Agente en descanso
    default:
      return "Desconocido"; // Estado desconocido
  }
};

// Propiedades para el componente AgentCard
interface AgentCardProps {
  agent: Agent;
}

// Componente de tarjeta que muestra la información del agente
export const AgentCard = ({ agent }: AgentCardProps) => {
  return (
    <Card className="transition-all shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">{agent.name}</CardTitle>
        <Badge
          className={cn(
            "rounded-full px-3 py-1 text-white transition-colors",
            agent.status === 0 && "bg-green-600 hover:bg-green-700",
            agent.status === 1 && "bg-red-600 hover:bg-red-700",
            agent.status === 2 && "bg-yellow-500 hover:bg-yellow-600"
          )}
        >
          {getStatusLabel(agent.status)}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mt-4">
          {/* Botón para editar el agente */}
          <Link href={`/agents/${agent.id}/edit`} className="flex-1">
            <Button
              variant="outline"
              className="w-full bg-white text-black border border-gray-300 hover:bg-gray-100"
            >
              <Pencil className="h-4 w-4 mr-2" />
              Editar
            </Button>
          </Link>
          {/* Botón para eliminar el agente */}
          <DeleteAgentButton
            id={agent.id}
            className="bg-red-600 text-white hover:bg-red-700"
          />
        </div>
      </CardContent>
    </Card>
  );
};

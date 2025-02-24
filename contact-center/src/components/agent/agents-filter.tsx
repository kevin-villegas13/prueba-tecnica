"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Tipo de props que recibirá el componente
interface AgentsFilterProps {
  onFilterChange: (status: number | undefined) => void; // Cambiar el valor de status
  defaultFilter: string; // Recibir el valor por defecto
}

export function AgentsFilter({
  onFilterChange,
  defaultFilter,
}: AgentsFilterProps) {
  const statusMapping: Record<string, number | undefined> = {
    all: undefined, // Todos los estados
    available: 0, // Estado 'Disponible'
    busy: 1, // Estado 'Ocupado'
    break: 2, // Estado 'En pausa'
  };

  // Maneja el cambio de valor en el selector y actualiza el filtro
  const handleChange = (value: string) => {
    onFilterChange(statusMapping[value]); // Actualizar el filtro según el valor
  };

  return (
    <Select defaultValue={defaultFilter} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px] bg-white border border-gray-300 rounded-md shadow-md hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent className="bg-white border border-gray-300 rounded-md shadow-md mt-1">
        {/* Opciones del filtro */}
        <SelectItem value="all" className="hover:bg-gray-100">
          Todos los estados
        </SelectItem>
        <SelectItem value="available" className="hover:bg-gray-100">
          Disponible
        </SelectItem>
        <SelectItem value="busy" className="hover:bg-gray-100">
          Ocupado
        </SelectItem>
        <SelectItem value="break" className="hover:bg-gray-100">
          En pausa
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

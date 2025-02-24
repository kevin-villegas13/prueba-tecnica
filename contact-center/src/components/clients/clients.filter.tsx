"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Definición de las propiedades que recibe el componente
interface FiltroClientesProps {
  onFilterChange: (filter: string) => void; // Función que maneja el cambio de filtro
  defaultFilter: string; // Valor por defecto del filtro
}

// Array que contiene las opciones de filtro
const opcionesFiltro = [
  { value: "all", label: "Todos los tiempos de espera" }, // Opción para todos los tiempos de espera
  { value: "5", label: "5+ minutos" }, // Opción para tiempos de espera mayores a 5 minutos
  { value: "10", label: "10+ minutos" }, // Opción para tiempos de espera mayores a 10 minutos
  { value: "15", label: "15+ minutos" }, // Opción para tiempos de espera mayores a 15 minutos
];

// Componente principal para el filtro de clientes
export function ClientsFilter({
  onFilterChange, // Función que maneja el cambio de filtro
  defaultFilter, // Valor por defecto del filtro
}: FiltroClientesProps) {
  // Función que se ejecuta al cambiar el valor del filtro
  const handleChange = (value: string) => {
    onFilterChange(value); // Llamamos a la función onFilterChange con el nuevo valor
  };

  return (
    <Select defaultValue={defaultFilter} onValueChange={handleChange}>
      {/* Trigger del select, donde el usuario interactúa */}
      <SelectTrigger className="w-[180px] bg-white border border-gray-300 rounded-md shadow-md hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
        {/* El valor predeterminado o el placeholder */}
        <SelectValue placeholder="Filtrar por tiempo de espera" />
      </SelectTrigger>

      {/* Contenido del select, donde se encuentran las opciones */}
      <SelectContent className="bg-white border border-gray-300 rounded-md shadow-md mt-1">
        {/* Mapear las opciones del array 'opcionesFiltro' */}
        {opcionesFiltro.map((opcion) => (
          <SelectItem
            key={opcion.value} // Usamos 'value' como key para cada item
            value={opcion.value} // El valor que se enviará al filtro
            className="hover:bg-gray-100" // Estilos de hover
          >
            {opcion.label} {/* El texto que se muestra al usuario */}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

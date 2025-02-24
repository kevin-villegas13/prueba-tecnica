"use client";

import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import * as Yup from "yup";
import { ReusableForm } from "@/components/forms/reusable-form";
import { useGet, usePut } from "@/app/hooks/useApiHooks";
import { useEffect, useState } from "react";
import CardTitleAgentComponent from "@/components/agent/agent.card.title";

type AgentType = {
  id: number;
  name: string;
  status: string;
};

export default function EditAgentPage() {
  const router = useRouter();
  const params = useParams();
  const agentId = params?.id as string; // Obtener el ID del agente desde los parámetros de la URL
  const [localAgent, setLocalAgent] = useState<AgentType | null>(null); // Estado local para almacenar los datos del agente

  // Usar `useGet` para obtener los datos del agente desde la API
  const {
    data: responseFromApi,
    loading,
    error,
  } = useGet<{ status: boolean; message: string; data: AgentType }>(
    `api/agents/${agentId}`
  );

  // Actualizar el estado local cuando los datos del agente se obtienen correctamente
  useEffect(() => {
    if (responseFromApi?.status && responseFromApi.data) {
      setLocalAgent(responseFromApi.data); // Guardar los datos del agente en el estado local
    }
  }, [responseFromApi]);

  // Usar `usePut` para manejar la actualización del agente
  const { fetchData: updateAgent, loading: isUpdating } = usePut<
    AgentType,
    Partial<AgentType>
  >(`api/agents/${agentId}`);

  // Manejo de envío del formulario
  const handleSubmit = async (values: Partial<AgentType>) => {
    try {
      await updateAgent(values); // Actualizar los datos del agente en la API
      toast.success("Agente actualizado exitosamente."); // Mostrar mensaje de éxito
      router.push("/agents"); // Redirigir a la lista de agentes
    } catch (error) {
      toast.error("Error al actualizar el agente. Inténtalo de nuevo."); // Mostrar mensaje de error
    }
  };

  if (loading) return <p>Cargando agente...</p>; // Mostrar mensaje de carga
  if (error) return <p>Error al cargar el agente: {error}</p>; // Mostrar mensaje de error
  if (!localAgent) return <p>No se encontraron los datos del agente.</p>; // Mostrar mensaje si no se encuentran los datos

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6">
      <CardTitleAgentComponent
        title="Editar Agente"
        description="Modifique los datos del agente y guarde los cambios."
      >
        <ReusableForm
          initialValues={{
            name: localAgent.name || "",
            status: localAgent.status || "available",
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("El nombre es obligatorio"),
            status: Yup.string()
              .oneOf(["0", "1", "2"], "Seleccione un estado válido")
              .required("El estado es obligatorio"),
          })}
          onSubmit={handleSubmit} // Enviar los datos al backend
          fields={[
            {
              name: "name",
              label: "Nombre completo",
              type: "text",
              placeholder: "Juan Pérez",
            },
            {
              name: "status",
              label: "Estado",
              type: "select",
              options: [
                { value: "0", label: "Disponible" },
                { value: "1", label: "Ocupado" },
                { value: "2", label: "En descanso" },
              ],
            },
          ]}
          submitText={isUpdating ? "Guardando..." : "Guardar Cambios"} // Texto en el botón de envío
        />
      </CardTitleAgentComponent>
    </div>
  );
}

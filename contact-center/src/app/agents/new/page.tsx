"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as Yup from "yup";
import { ReusableForm } from "@/components/forms/reusable-form";
import { usePost } from "@/app/hooks/useApiHooks";
import CardTitleAgentComponent from "@/components/agent/agent.card.title";

export default function NewAgentPage() {
  const router = useRouter();
  const { fetchData, loading, error } = usePost("api/agents"); // Usar el hook `usePost` para crear un nuevo agente

  // Manejo de envío del formulario
  async function handleSubmit(values: any) {
    try {
      await fetchData(values); // Enviar los datos del nuevo agente
      toast.success("El agente ha sido creado exitosamente."); // Mostrar mensaje de éxito
      router.push("/agents"); // Redirigir a la lista de agentes
    } catch (err) {
      toast.error("Error al crear el agente: " + (err as Error).message); // Mostrar mensaje de error
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <CardTitleAgentComponent
        title="Editar Agente"
        description="Modifique los datos del agente y guarde los cambios."
      >
        <ReusableForm
          initialValues={{ name: "", status: 0 }} // Valores iniciales del formulario
          validationSchema={Yup.object().shape({
            name: Yup.string().required("El nombre es obligatorio"), // Validación de nombre
            status: Yup.number()
              .oneOf([0, 1, 2], "Seleccione un estado válido")
              .required("El estado es obligatorio"), // Validación de estado
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
              label: "Estado inicial",
              type: "select",
              options: [
                { value: "0", label: "Disponible" },
                { value: "1", label: "Ocupado" },
                { value: "2", label: "En descanso" },
              ],
            },
          ]}
          submitText="Crear Agente" // Texto del botón de envío
          loading={loading} // Mostrar indicador de carga
          error={error} // Mostrar mensaje de error
        />
      </CardTitleAgentComponent>
    </div>
  );
}

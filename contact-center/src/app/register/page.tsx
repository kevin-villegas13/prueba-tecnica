"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";
import * as Yup from "yup";
import { ReusableForm } from "@/components/forms/reusable-form";
import { usePost } from "../hooks/useApiHooks";

// Esquema de validación con Yup para el formulario
const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es obligatorio"),
});

export default function RegisterPage() {
  const router = useRouter();

  // Hook personalizado para realizar una petición POST a 'api/clients'
  const { fetchData, loading } = usePost("api/clients");

  /**
   * Maneja el envío del formulario.
   * @param values - Valores del formulario { name: string }
   */
  async function handleSubmit(values: { name: string }) {
    try {
      console.log("Valores enviados:", values);

      // Realiza la petición POST con el nombre
      const response = (await fetchData({ name: values.name })) as {
        status: boolean;
        message?: string;
      };
      console.log("Respuesta JSON:", response);

      // Validar respuesta antes de redirigir
      if (response.status) {
        toast.success(
          "Se ha registrado su turno exitosamente. Por favor espere a ser llamado."
        );
        router.push("/clients");
      } else {
        throw new Error(response.message || "Error en el registro.");
      }
    } catch (error) {
      console.error("Error en handleSubmit:", error);
      toast.error("Error al registrar el turno, intente nuevamente.");
    }
  }

  return (
    <div className="container max-w-lg py-10 mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Registrar Turno</CardTitle>
          <CardDescription className="text-center">
            Ingrese sus datos para obtener un turno de atención
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Formulario reutilizable */}
          <ReusableForm
            initialValues={{ name: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            fields={[
              {
                name: "name",
                label: "Nombre completo",
                type: "text",
                placeholder: "Juan Pérez",
              },
            ]}
            submitText={loading ? "Enviando..." : "Obtener Turno"}
          />
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { ContactOption } from "@/components/contact/contact.options";
import { Users, UserPlus, Clock } from "lucide-react";

export default function HomePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Centro de Contacto
      </h1>

      {/* Opciones del Centro de Contacto */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ContactOption
          icon={UserPlus}
          title="Registro de Turno"
          description="Registre su turno para ser atendido"
          href="/register"
          buttonText="Obtener Turno"
        />

        <ContactOption
          icon={Clock}
          title="Cola de Espera"
          description="Ver estado de la cola de espera"
          href="/clients"
          buttonText="Ver Cola"
        />

        <ContactOption
          icon={Users}
          title="Gestión de Agentes"
          description="Administrar agentes del centro"
          href="/agents"
          buttonText="Gestionar"
        />
      </div>
    </div>
  );
}

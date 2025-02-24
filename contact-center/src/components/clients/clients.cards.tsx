"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Client } from "@/lib/types/clients";

export function ClientCard({ client }: { client: Client }) {
  return (
    <Card
      key={client.id}
      className="hover:shadow-lg transition-transform duration-300 transform hover:scale-[1.03] border border-gray-200 rounded-lg"
    >
      <CardHeader className="bg-gray-100 rounded-t-lg p-4">
        <CardTitle className="text-sm font-medium flex items-center justify-between text-gray-800">
          <div className="flex flex-wrap items-center gap-2">
            <span className="truncate">{client.name}</span>
            <span
              className={`inline-block px-3 py-1 text-white rounded-full ${
                client.waitTime > 10
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-xs md:text-sm lg:text-base`}
            >
              {client.waitTime > 10
                ? `Tiempo de espera alto: ${client.waitTime} min`
                : `Tiempo de espera bajo: ${client.waitTime} min`}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5 text-center">
        <div className="text-2xl font-bold text-gray-900">
          Posición: {client.queuePosition}
        </div>
        <div className="text-xs text-gray-500">
          Se unió a las:
          {new Date(client.createdAt).toLocaleTimeString("es-ES")}
        </div>
      </CardContent>
    </Card>
  );
}

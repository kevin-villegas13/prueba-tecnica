"use client";

import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDelete } from "@/app/hooks/useApiHooks";

export function DeleteAgentButton({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Usa el hook de eliminación
  const { fetchData } = useDelete<{ status: boolean; message: string }>(
    `api/agents/${id}`
  );
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  async function onDelete() {
    setLoading(true);
    try {
      await fetchData(); // Realiza la eliminación
      toast.success("El agente ha sido eliminado exitosamente.");
      setOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error("Error al eliminar el agente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Botón de eliminar mejorado */}
      <Button
        variant="destructive"
        size="icon"
        onClick={() => setOpen(true)}
        className={cn(
          "w-10 h-10 bg-red-500 text-white rounded-full transition-all hover:bg-red-600 focus:ring-2 focus:ring-red-400",
          className
        )}
      >
        <Trash2 className="h-5 w-5" />
      </Button>

      {/* Modal con mejor diseño */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="bg-white shadow-lg rounded-lg p-6">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold text-gray-800">
              ¿Está seguro?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Esta acción no se puede deshacer. El agente será eliminado
              permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-200 text-gray-800 hover:bg-gray-300">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={onDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all focus:ring-2 focus:ring-red-400"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Eliminando...
                </>
              ) : (
                "Eliminar"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

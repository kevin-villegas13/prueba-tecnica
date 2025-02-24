import { Loader2 } from "lucide-react";

/**
 * Componente de spinner de carga animado.
 * Utiliza el ícono `Loader2` de `lucide-react`.
 */
export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center">
      <Loader2 className="w-6 h-6 text-black animate-spin" />
    </div>
  );
}

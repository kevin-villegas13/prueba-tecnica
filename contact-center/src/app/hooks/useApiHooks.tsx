import { useState, useEffect, useRef } from "react";

/**
 * URL base de la API
 */
const API_BASE_URL = "https://localhost:7197/";

/**
 * Opciones para las peticiones HTTP
 */
interface FetchOptions<T> {
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: T;
  queryParams?: Record<string, string | number | boolean>;
}

/**
 * Construye un query string a partir de un objeto de parámetros
 * @param queryParams - Objeto con los parámetros a convertir
 * @returns Query string para ser añadido a la URL
 */
const buildQueryString = (
  queryParams?: Record<string, string | number | boolean>
): string => {
  if (!queryParams) return "";
  return (
    "?" +
    Object.entries(queryParams)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
      )
      .join("&")
  );
};

/**
 * Hook personalizado para realizar peticiones HTTP
 * @param endpoint - Ruta del recurso
 * @param method - Método HTTP (GET, POST, PUT, DELETE)
 * @returns Función para realizar la petición y estados asociados
 */
const useFetch = <TResponse, TBody = undefined>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE"
) => {
  const [data, setData] = useState<TResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (
    body?: TBody,
    queryParams?: Record<string, string | number | boolean>
  ) => {
    setLoading(true);
    setError(null);
    try {
      const url = `${API_BASE_URL}${endpoint}${buildQueryString(queryParams)}`;
      console.log("Fetching URL:", url);

      const fetchOptions: RequestInit = {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      };

      console.log("Fetch options:", fetchOptions);

      const response = await fetch(url, fetchOptions);
      console.log("Response:", response);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `Error en la petición: ${response.status} - ${errorText}`
        );
        throw new Error(
          `Error en la petición: ${response.status} - ${errorText}`
        );
      }

      const result: TResponse = await response.json();
      console.log("Result:", result);

      setData(result);
      return result;
    } catch (err) {
      console.error("Fetch error:", err);
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, data, loading, error };
};

/**
 * Hook para realizar peticiones GET
 * @param endpoint - Ruta del recurso
 * @param queryParams - Parámetros de consulta (opcional)
 * @returns Datos, estado de carga y errores
 */
export const useGet = <T,>(
  endpoint: string,
  queryParams?: Record<string, string | number | boolean>
) => {
  const { fetchData, data, loading, error } = useFetch<T, undefined>(
    endpoint,
    "GET"
  );

  const [lastQueryParams, setLastQueryParams] = useState<
    Record<string, string | number | boolean> | undefined
  >(
    queryParams || {} // Proporciona un valor vacío si es undefined
  );

  useEffect(() => {
    console.log("Query Params:", queryParams);

    if (JSON.stringify(lastQueryParams) !== JSON.stringify(queryParams)) {
      console.log(
        "Realizando nueva solicitud con los parámetros:",
        queryParams
      );
      fetchData(undefined, queryParams);
      setLastQueryParams(queryParams);
    }
  }, [queryParams, fetchData, lastQueryParams]);

  console.log("Datos obtenidos:", data);

  return { data, loading, error };
};

/**
 * Hook para realizar peticiones POST
 */
export const usePost = <TResponse, TBody>(endpoint: string) =>
  useFetch<TResponse, TBody>(endpoint, "POST");

/**
 * Hook para realizar peticiones PUT
 */
export const usePut = <TResponse, TBody>(endpoint: string) =>
  useFetch<TResponse, TBody>(endpoint, "PUT");

/**
 * Hook para realizar peticiones DELETE
 */
export const useDelete = <TResponse,>(endpoint: string) =>
  useFetch<TResponse, undefined>(endpoint, "DELETE");

/**
 * Hook para manejar conexiones WebSocket con reconexión automática
 * @param url - URL del WebSocket
 * @param callback - Función para procesar los mensajes recibidos
 * @returns Función para cerrar la conexión manualmente
 */
export const useWebSocket = <T,>(url: string, callback: (data: T) => void) => {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectInterval = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // ✅ Solo se ejecuta en el cliente
    if (typeof window === "undefined") return;

    const connectWebSocket = () => {
      console.log(`🔗 Conectando a: ${url}`);
      wsRef.current = new WebSocket(url);

      wsRef.current.onopen = () => {
        console.log("✅ WebSocket conectado");
        if (reconnectInterval.current) {
          clearTimeout(reconnectInterval.current);
          reconnectInterval.current = null;
        }
      };

      wsRef.current.onmessage = (event) => {
        try {
          const data: T = JSON.parse(event.data);
          callback(data);
        } catch (error) {
          console.error("❌ Error al parsear mensaje:", error);
        }
      };

      wsRef.current.onerror = (error) =>
        console.error("❌ Error en WebSocket:", error);

      wsRef.current.onclose = (event) => {
        console.warn("⚠️ Conexión cerrada: ", event.code);
        if (event.code !== 1000) {
          reconnectInterval.current = setTimeout(connectWebSocket, 5000);
        }
      };
    };

    connectWebSocket();

    return () => {
      console.log("🛑 Desconectando WebSocket");
      wsRef.current?.close();
      if (reconnectInterval.current) clearTimeout(reconnectInterval.current);
    };
  }, [url, callback]);

  // Agregamos sendMessage al retorno
  const sendMessage = (message: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
    } else {
      console.error("❌ WebSocket no está abierto.");
    }
  };

  return {
    close: () => wsRef.current?.close(),
    sendMessage, // Devolvemos sendMessage
  };
};

# Frontend: Contact Center App

Este es el frontend de la aplicación para el centro de contacto. Utiliza **Next.js** y **React** para interactuar con la API RESTful del backend y mostrar la información de los agentes y los clientes en espera.

## Tecnologías utilizadas

- **Next.js**: Framework para construir la aplicación frontend con soporte para Server-Side Rendering (SSR).
- **React**: Librería para construir la interfaz de usuario.
- **Fetch API**: Para interactuar con la API RESTful del backend.
- **React Hooks** (`useState`, `useEffect`, `useContext`): Para manejar el estado y las actualizaciones de la UI.

## Requisitos

- **Node.js** 16 o superior.
- **npm** o **yarn**.

## Instalación

### 1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/contact-center-frontend.git
```

### 2. Instalar las dependencias del proyecto:

Con **npm**:

```bash
cd contact-center-frontend
npm install
```

O, si prefieres usar **yarn**:

```bash
yarn install
```

### 3. Configurar las rutas de la API:

En el archivo `.env.local`, agrega la URL del backend (suponiendo que el backend está corriendo en `http://localhost:5000`):

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Iniciar el servidor de desarrollo:

Con **npm**:

```bash
npm run dev
```

O, si usas **yarn**:

```bash
yarn dev
```

La aplicación estará disponible en **http://localhost:3000**.

## Páginas

- **/agents**: Muestra la lista de agentes con su estado y tiempo de espera. Permite filtrar los agentes por estado.
- **/clients**: Muestra la lista de clientes en espera. Permite filtrar los clientes por tiempo de espera.

## Componentes Principales

- **AgentesList**: Componente que muestra la lista de agentes.
- **ClientsList**: Componente que muestra la lista de clientes en espera.
- **Filters**: Componente que permite filtrar los agentes y clientes.
- **AgentCard**: Componente para mostrar la información de cada agente.
- **ClientCard**: Componente para mostrar la información de cada cliente.

## Estado Global y Manejo

- **React Context**: Se utilizó `useContext` para compartir el estado global entre los componentes, como la lista de agentes y clientes.
- **useState**: Para gestionar el estado local de cada componente.
- **useEffect**: Para realizar las llamadas a la API RESTful y obtener los datos iniciales de los agentes y clientes.

# Frontend: Contact Center App

Este es el frontend de la aplicación para el centro de contacto. Utiliza **Next.js**, **React** y **Formik** para gestionar los formularios e interactuar con la API RESTful del backend. La interfaz muestra información de los agentes y los clientes en espera.

## Tecnologías utilizadas

- **Next.js**: Framework para construir la aplicación frontend con soporte para Server-Side Rendering (SSR).
- **React**: Librería para construir la interfaz de usuario.
- **Formik**: Librería para manejar formularios de manera más sencilla, incluyendo validación y control de estado.
- **React Hooks** (`useState`, `useEffect`): Para manejar el estado y las actualizaciones de la UI.
- **Fetch API**: Para interactuar con la API RESTful del backend.

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

En el archivo **`src/lib/utils/api.js`** o donde esté configurado el acceso a la API, modifica la URL de la API backend para apuntar al servidor adecuado (por ejemplo, `http://localhost:5000/api`).

```javascript
export const API_URL = ''; // colocar el backend de .net
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

## Estructura del Proyecto

La estructura del proyecto es la siguiente:

```
src/
│
├── app/
│   ├── agents/
│   │   ├── [id]/      # Detalles del agente por ID
│   │   └── new/       # Página para crear nuevos agentes
│   ├── clients/       # Página de clientes en espera
│   ├── register/      # Página para registrar agentes o clientes
│   ├── layout/        # Estructura base de las páginas
│   └── page.js        # Página principal
│
├── components/        # Componentes reutilizables
│   ├── agent/         # Componentes relacionados con agentes
│   ├── clients/       # Componentes para clientes
│   ├── contact/       # Componentes para la sección de contacto
│   ├── forms/         # Formularios reutilizables
│   ├── navigation/    # Navegación de la app
│   ├── ui/            # Componentes de interfaz de usuario (botones, modales)
│   └── loading-spinner/ # Componente para el spinner de carga
│
├── lib/               # Librerías y utilidades
│   ├── types/         # Tipos de datos y modelos
│   ├── agents/        # Utilidades específicas para agentes
│   ├── clients/       # Utilidades para manejar clientes
│   └── utils/         # Funciones auxiliares
```

## Páginas

- **/agents**: Muestra la lista de agentes con su estado y tiempo de espera. Permite filtrar los agentes por estado.
- **/clients**: Muestra la lista de clientes en espera. Permite filtrar los clientes por tiempo de espera.
- **/register**: Página para registrar nuevos agentes o clientes.
- **/[id]**: Detalles de un agente específico, basado en el ID.

## Componentes Principales

- **AgentesList**: Componente que muestra la lista de agentes.
- **ClientsList**: Componente que muestra la lista de clientes en espera.
- **Filters**: Componente que permite filtrar los agentes y clientes.
- **AgentCard**: Componente para mostrar la información de cada agente.
- **ClientCard**: Componente para mostrar la información de cada cliente.
- **LoadingSpinner**: Componente para mostrar el estado de carga mientras se obtienen datos.

## Formularios con Formik

Se está utilizando **Formik** para manejar los formularios en la aplicación. Formik facilita la gestión de formularios complejos, incluyendo validación, manejo de errores y control del estado.

### Ejemplo de uso de Formik:

```tsx
import { Formik, Field, Form, ErrorMessage } from 'formik';

const RegistroForm = () => {
  const initialValues = {
    nombre: '',
    correo: '',
  };

  const handleSubmit = (values) => {
    // Llamar a la API o manejar la lógica de registro aquí
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <div>
            <label htmlFor="nombre">Nombre:</label>
            <Field name="nombre" type="text" />
            <ErrorMessage name="nombre" component="div" />
          </div>
          
          <div>
            <label htmlFor="correo">Correo:</label>
            <Field name="correo" type="email" />
            <ErrorMessage name="correo" component="div" />
          </div>
          
          <button type="submit">Registrar</button>
        </Form>
      )}
    </Formik>
  );
};

export default RegistroForm;
```

### Validación con Yup

Formik se puede integrar fácilmente con **Yup** para realizar validaciones. Puedes agregar una validación simple al formulario:

```tsx
import * as Yup from 'yup';

const validationSchema = Yup.object({
  nombre: Yup.string().required('El nombre es obligatorio'),
  correo: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
});

<Formik
  initialValues={initialValues}
  validationSchema={validationSchema}
  onSubmit={handleSubmit}
>
  {/* Formulario */}
</Formik>
```

## Estado Local y Manejo de Efectos

- **useState**: Para gestionar el estado local de cada componente.
- **useEffect**: Para realizar las llamadas a la API RESTful y obtener los datos iniciales de los agentes y clientes. 

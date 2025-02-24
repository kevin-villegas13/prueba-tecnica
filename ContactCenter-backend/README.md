# Backend: Contact Center API

Este es el backend de la aplicación para un centro de contacto. Utiliza **ASP.NET Core**, **Entity Framework (Code First)** y **PostgreSQL** para gestionar la base de datos y exponer una API RESTful para la interacción con el frontend.

## Tecnologías utilizadas

- **ASP.NET Core**: Framework para crear la API RESTful.
- **Entity Framework (Code First)**: ORM para gestionar la base de datos utilizando el enfoque Code First.
- **PostgreSQL**: Base de datos utilizada para almacenar los agentes y clientes en espera.
- **Repository Pattern**: Para separar la lógica de acceso a datos de la lógica de negocio.
- **Docker**: Para contenedores de la base de datos y la aplicación backend.

## Requisitos

- **.NET 9.0 Web API**
- **PostgreSQL**
- **Visual Studio Community** con soporte para C# y .NET
- **Docker** (si deseas usar la imagen de Docker preconfigurada)

## Instalación

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/contact-center-backend.git
```

### 2. Configura la base de datos

Para facilitar la configuración, puedes usar **Docker** para levantar tanto la base de datos como una herramienta de administración (Adminer).

#### Usando Docker (recomendado):

1. En el archivo `docker-compose.yml`, ya está configurada la imagen de PostgreSQL y Adminer para administrar la base de datos.

```yaml
services:
  db:
    image: postgres:latest
    container_name: postgres-latest
    restart: always
    environment:
      POSTGRES_USER: your-username
      POSTGRES_PASSWORD: your-password
      POSTGRES_ROOT_PASSWORD: your-password
      POSTGRES_DB: your-database
    ports:
      - "5433:5432"

  adminer:
    image: adminer
    container_name: adminer-hydra
    restart: always
    ports:
      - "0.0.0.0:8080:8080"
    environment:
      ADMINER_DESIGN: "hydra"
```

2. Para iniciar los contenedores de Docker, ejecuta el siguiente comando:

```bash
docker-compose up -d
```

Esto levantará el contenedor de la base de datos PostgreSQL y el contenedor de Adminer para administración de la base de datos.

#### Configuración de base de datos:

1. Una vez que Docker esté levantado, asegúrate de que las credenciales de conexión estén configuradas correctamente en el archivo **`.env`** de tu proyecto en C#.

```env
DATABASE_URL=Host=localhost;Port=5433;Database=prueba-tecnica;Username=your-username;Password=your-password;
```

2. Para acceder al panel de administración de la base de datos, abre tu navegador y accede a **`http://localhost:8080`**. Aquí puedes gestionar tu base de datos y consultar los datos.

### 3. Ejecuta las migraciones de la base de datos

Para que la estructura de la base de datos esté actualizada con los modelos de Entity Framework, ejecuta las migraciones:

```bash
dotnet ef database update
```

### 4. Inicia el proyecto backend

Una vez que todo esté configurado, puedes ejecutar el backend 

El backend estará corriendo en  la terminal **`https://localhost:7197`**.

### 5. Accede a la API

Para interactuar con la API, puedes acceder a **`https://localhost:7197/scalar`** o usar herramientas como **Postman** para hacer peticiones a los endpoints de la API.
---

## Estructura del Proyecto

La estructura del proyecto es la siguiente:

```
ContactCenter-backend/
│
├── Application/          # Lógica de negocio y servicios
├── Context/              # DbContext y configuraciones de la base de datos
├── Controllers/          # Controladores de la API RESTful
├── DependencyInjection/  # Configuración de la inyección de dependencias
├── Helpers/              # Funciones auxiliares y utilitarias
├── Migrations/           # Migraciones de la base de datos
├── Models/               # Modelos de datos (entidades)
├── Utility/              # Clases utilitarias y adicionales
```

## Endpoints

La API proporciona los siguientes endpoints:

- **GET /api/agents**: Obtiene una lista de todos los agentes con su nombre, estado y tiempo de espera.
- **GET /api/clients**: Obtiene una lista de todos los clientes en espera con su nombre y tiempo de espera.
- **POST /api/agents**: Permite actualizar el estado de un agente (por ejemplo, cambiar de "disponible" a "en llamada").
- **POST /api/clients**: Permite agregar un cliente a la lista de espera.

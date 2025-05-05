# Subscription Management Streaming

Este proyecto es una aplicación de gestión de suscripciones para servicios de streaming. Permite a los usuarios registrarse, iniciar sesión, gestionar sus planes de suscripción, cancelar suscripciones con políticas de reembolso parcial y cambiar de plan con reglas específicas.

## Características

- **Registro de Usuarios**: Los usuarios pueden registrarse con un nombre de usuario único y una contraseña.
- **Inicio de Sesión**: Los usuarios pueden iniciar sesión para acceder a las funcionalidades de la aplicación.
- **Gestión de Suscripciones**:
  - Visualización de planes disponibles.
  - Suscripción a planes con descuentos por pago anual.
  - Cambio de plan con aplicación al siguiente período.
  - Cancelación de suscripciones con cálculo de reembolso parcial.
- **Autenticación**: Control de acceso basado en el estado de inicio de sesión.
- **Redirección**: Navegación entre las páginas de inicio, planes y suscripciones.

## Tecnologías Utilizadas

- **Frontend**: Angular
- **Backend Simulado**: JSON Server
- **Estilos**: SCSS
- **Rutas**: Angular Router

## Instalación

Sigue estos pasos para configurar y ejecutar la aplicación en tu entorno local:

### 1. Clonar el Repositorio
Clona el repositorio en tu máquina local:
```bash
git clone <URL_DEL_REPOSITORIO>
cd subscription-management-streaming
```

### 2. Instalar Dependencias
Instala las dependencias necesarias para el proyecto:
```bash
npm install
```

### 3. Configurar la Base de Datos Simulada
La aplicación utiliza **JSON Server** como backend simulado. Sigue estos pasos para configurarlo:

1. Asegúrate de tener JSON Server instalado globalmente. Si no lo tienes, instálalo con:
   ```bash
   npm install -g json-server
   ```

2. En la raíz del proyecto, crea un archivo llamado `db.json` (si no existe) y agrega el siguiente contenido inicial:
   ```json
   {
     "users": [
       {
         "id": 1,
         "username": "admin",
         "password": "admin123",
         "subscription": null
       }
     ],
     "subscriptions": [
       {
         "id": 1,
         "name": "Basic",
         "price": 10,
         "paymentType": "monthly"
       },
       {
         "id": 2,
         "name": "Standard",
         "price": 18,
         "paymentType": "monthly"
       },
       {
         "id": 3,
         "name": "Premium",
         "price": 27,
         "paymentType": "monthly"
       }
     ]
   }
   ```

3. Inicia el servidor JSON para simular el backend:
   ```bash
   json-server --watch db.json
   ```

   Esto iniciará un servidor en `http://localhost:3000`. Asegúrate de que la aplicación Angular esté configurada para consumir esta URL.

### 4. Iniciar la Aplicación Angular
Inicia la aplicación Angular con el siguiente comando:
```bash
ng serve
```

Esto iniciará la aplicación en `http://localhost:4200`.

### 5. Probar la Aplicación
1. Abre tu navegador y ve a `http://localhost:4200`.
2. Regístrate como un nuevo usuario o utiliza las credenciales predeterminadas (`admin` / `admin123`) para iniciar sesión.
3. Explora las funcionalidades de la aplicación, como la gestión de suscripciones.

---

## Uso

### Registro
1. Haz clic en "Regístrate aquí" en la página de inicio.
2. Completa el formulario de registro.
3. Si el nombre de usuario ya existe, se mostrará un mensaje de error.

### Inicio de Sesión
1. Ingresa tu nombre de usuario y contraseña en la página de inicio de sesión.
2. Si las credenciales son correctas, serás redirigido a la página principal.

### Gestión de Suscripciones
- **Planes Disponibles**: Navega a la página de planes para ver los planes disponibles.
- **Suscribirse a un Plan**: Selecciona un plan y elige el tipo de pago (mensual o anual).
- **Cambio de Plan**: Cambia de plan; el cambio se aplicará al siguiente período.
- **Cancelar Suscripción**: Cancela tu suscripción actual y recibe un reembolso parcial según las políticas.

---

## Rutas Principales

- `/login`: Página de inicio de sesión.
- `/register`: Página de registro.
- `/home`: Página principal después de iniciar sesión.
- `/plans`: Página para ver y gestionar planes de suscripción.
- `/subscriptions`: Página para ver las suscripciones activas.

---

## Políticas de Negocio

1. **Un Usuario por Suscripción Activa**: Un usuario solo puede tener una suscripción activa a la vez.
2. **Cambio de Plan**: Los cambios de plan se aplican al siguiente período.
3. **Reembolso Parcial**: Las cancelaciones generan un reembolso parcial basado en el tiempo restante del período.

---

## Contribución

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y haz un commit:
   ```bash
   git commit -m "Agrega nueva funcionalidad"
   ```
4. Haz un push a tu rama:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. Abre un Pull Request.

---

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.
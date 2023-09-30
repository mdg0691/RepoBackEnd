# Proyecto E-Commerce

Este proyecto es una aplicación de comercio electrónico desarrollada con Node.js y Express. Proporciona una serie de rutas y funcionalidades para administrar usuarios, productos, carritos de compras, tickets y autenticación. Tambien cuenta con una aplicacion de front-end React para una mejor experiencia de usuario

## Cómo ejecutar el proyecto

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

### Requisitos previos

Asegúrate de tener instalado Node.js y npm en tu computadora.

### Pasos de instalación

1. Clona este repositorio en tu máquina local.

    https://github.com/mdg0691/RepoBackEnd.git

2. Navega hasta la carpeta del proyecto.

    cd nombre_de_la_carpeta_del_proyecto

3. Instala las dependencias.
   
## Dependencias del Proyecto

Las dependencias necesarias para este proyecto se instalarán automáticamente. A continuación, se enumeran las principales dependencias utilizadas en este proyecto:

- **bcrypt:** Para el hashing de contraseñas.
- **cookie-parser:** Para el manejo de cookies.
- **cors:** Para configurar CORS en tu servidor.
- **dotenv:** Para cargar variables de entorno desde un archivo `.env`.
- **express:** El framework Express.js para el servidor.
- **express-handlebars:** Para utilizar Handlebars como motor de plantillas.
- **jsonwebtoken:** Para la autenticación basada en tokens JWT.
- **mongoose:** ODM (Object-Document Mapping) para MongoDB.
- **nodemailer:** Para enviar correos electrónicos.
- **nodemon:** Herramienta para reiniciar automáticamente el servidor en desarrollo.
- **passport:** Para la autenticación en Express.js.
- **passport-jwt:** Estrategia Passport para autenticación basada en tokens JWT.
- **passport-local:** Estrategia Passport para autenticación basada en credenciales locales.

Estas dependencias son esenciales para el funcionamiento del proyecto y se encargan de diversas funcionalidades, como la autenticación, la gestión de bases de datos y el envío de correos electrónicos, entre otras.


4. Configura las variables de entorno. Debes crear un archivo `.env` en la raíz del proyecto y configurar las variables de entorno necesarias, como la conexión a la base de datos y las claves secretas para la autenticación.

MONGO_URI="mongodb+srv://mdgonzalez470:1qaz2wsx@cluster0.cigof3u.mongodb.net/?retryWrites=true&w=majority"
PORT=8080
PRIVATE_KEY="coder"
GMAIL_USER=mdgonzalez470@gmail.com
GMAIL_PASSWORD=ancbevlspuyxzrqz
JWT_COOKIE="coderCookie"
JWT_SECRET="coderSecret"
JWT_REFRESH_SECRET="refreshToken"


5. Inicia la aplicación.
   npm start
   
   La aplicación estará disponible en `http://localhost:8080`.

## Credenciales de Prueba

Para probar la aplicación, puedes utilizar las siguientes credenciales de prueba:

- **Usuario Administrador:**
- Correo Electrónico: admin@admin.com
- Contraseña: 1111

- **Usuario Normal:**
- Correo Electrónico: user@user.com
- Contraseña: 1111

## Endpoints de la API

A continuación, se detallan los principales endpoints de la API junto con una breve descripción de cada uno:

### Usuarios

- `GET /api/users`: Obtiene la lista de todos los usuarios.
- `GET /api/users/:idUser`: Obtiene información sobre un usuario específico.
- `GET /api/users/:email`: Busca un usuario por su dirección de correo electrónico.
- `POST /api/users`: Crea un nuevo usuario.
- `PUT /api/users/:idUser/update`: Actualiza la información de un usuario (requiere privilegios de administrador).
- `DELETE /api/users/:idUser`: Elimina un usuario específico (requiere privilegios de administrador).
- `DELETE /api/users/delete`: Elimina todos los usuarios (requiere autenticación de administrador).

### Autenticación

- `POST /api/auth/signup`: Registra un nuevo usuario.

{ 
    "first_name":"",
    "last_name":"",
    "email":"",
    "password":"",
    "roles": ["admin","moderator"]
}
- `POST /api/auth/signin`: Inicia sesión en la aplicación.
{ 
    "email":"",
    "password":""
}
- `POST /api/auth/logout`: Cierra sesión.
- `POST /api/auth/forgot-password`: Inicia el proceso de recuperación de contraseña.
- `GET /api/auth/reset-password/:id/:token`: Permite restablecer la contraseña.
- `POST /api/auth/reset-password/:id`: Actualiza la contraseña.

### Productos

- `GET /api/products`: Obtiene la lista de todos los productos.
- `GET /api/products/:productId`: Obtiene información sobre un producto específico.
- `POST /api/products`: Crea un nuevo producto (requiere privilegios de administrador).
{
    "title": "",
    "description": "",
    "code": "",
    "category": "",
    "price": ,
    "stock": ,
    "status": true,
    "thumbnail": [],
}
- `DELETE /api/products/:productId`: Elimina un producto específico (requiere privilegios de administrador).

### Carritos de Compra

- `GET /api/carts`: Obtiene la lista de todos los carritos de compra.
- `GET /api/carts/:idcart`: Obtiene información sobre un carrito de compra específico.
- `POST /api/carts/updatedcart`: Actualiza un carrito de compra.
- `POST /api/carts/:id/purchase`: Realiza una compra desde el carrito.
- `POST /api/carts/addtocart`: Agrega un producto al carrito de compra.
- `PUT /api/carts/removeproduct`: Elimina un producto del carrito de compra.
- `DELETE /api/carts/:id`: Elimina un carrito de compra específico.

### Tickets

- `GET /api/tickets`: Obtiene la lista de todos los tickets.
- `GET /api/tickets/:idcart`: Obtiene información sobre un ticket específico.
- `POST /api/tickets/create`: Crea un nuevo ticket.
{
  "purchaser": "",    
  "products": [
    {
      "id_prod": "",
      "cantidad": ,
      "subtotal": 
    },
    {
      "id_prod": "",
      "cantidad": ,
      "subtotal":
    },
    {
      "id_prod": "",
      "cantidad": ,
      "subtotal": 
    },
    {
      "id_prod": "",
      "cantidad": ,
      "subtotal": 
    }
  ],
  "amount": 
}

- `DELETE /api/tickets/:id`: Elimina un ticket específico.

## Aplicación Frontend

La carpeta `client` de este repositorio contiene la aplicación frontend desarrollada con React. Puedes iniciarla siguiendo estos pasos:

1. Abre una terminal en la carpeta `client` del proyecto.

   ```bash
   cd client
   npm install
   npm start

La aplicación frontend estará disponible en tu navegador en http://localhost:3000. Puedes usar esta interfaz para interactuar con el backend y probar las funcionalidades del proyecto E-Commerce.

## GIFT
![](public/backend.gif)

PROYECTOFINAL\public\backend.gif


## Contacto

- Nombre: Marcelo Gonzalez
- Correo electrónico: mdgonzalez470@gmail.com

Gracias por explorar este proyecto E-Commerce! Esperamos que sea útil para tus necesidades de desarrollo.

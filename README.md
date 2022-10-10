# Generador de Post Backend
---

## Aplicación con arquitectura REST


Esta desarrollada con **Nodejs** y **Expressjs** como framework.
Utilice **MongoDBAtlas** como base de datos y además utilice el modulo **"Mongoose"** para crear los modelos de las colecciones y las operaciones correspondientes en cada controlador relacionadas con la base de datos.
Utilice variables de entorno (**.ENV**) para guardar claves especiales que necesito para el correcto funcionamiento de la app.

---
## Funcionamiento de la APP

Puede loguear y registrar al usuario, en el proceso, la aplicación puede aceptar imagenes gracias a los modulos **express-fileupload** y **fs-extra**. El primer modulo es para que express pueda aceptar archivos y el segundo me sirvio para almacenar los archivos en una carpeta temporalmente. Las imagenes que el usuario utilizo se guardan en **cloudinary** gracias a las propiedades de su libreria.
Puede encriptar la contraseña del usuario al registrarse así como puede identificarla al momento de loguearse. Las operaciones de encriptacion de contraseña las hice con **bcryptjs**.

Para mantener la sesión del usuario utilice **jsonwebtoken** para crear dos token, uno de prolongada caducidad para poder ejecutar una nueva petición y crear el segundo token, este tendra un corto tiempo de caducidad. El primer token se almacena en una cookie y se obtiene cuando el usuario se registra o se loguea. Para este proceso utilice **cookie-parser** con el fin de que Express reconosca las cookies.
El segundo token se tiene que refrescar cada corto periodo de tiempo y con el, el usuario podra interactuar dentro de la aplicación. Puede mostrar todos o solo un Post de los que haya creado, además puede crear, editar y eliminar Posts.

El usuario puede editar su perfil de usuario y tambien puede eliminarlo si lo desea, eliminando todos sus Posts a su paso.

Utilice middlewares para incerseptar las peticiones para validar los datos recibidos o comprobar que el token exista o comprobar que aun tenga validez. Para validar los datos utilice **express-validator**.

Hice las configuraciones correspondientes de **cors** para que solo puedan usarla algunas aplicaciones del lado del cliente, colocando solo los dominios principales.

**[Ver aplicación del lado del frontend](https://github.com/JoseL-GuerreroB/GeneradorPostFrontEnd)**.
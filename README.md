# Frontend Coding Challenge

[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/organization/repository)

> App para consulta de productos por categoría protegido por usuario y contraseña

<img width="1173" alt="Captura de Pantalla 2022-02-27 a la(s) 14 37 21" src="https://user-images.githubusercontent.com/42586652/155899074-63ddc263-8f6d-4d3e-a9fe-1b4333c2dd56.png">

### Guía rápida

1. **Clonar el repositorio.**

    ```sh
    git clone git@github.com:danielpro5/frontend-coding-challenge.git
    cd frontend-coding-challenge
    ```
   
2. **Configurar las variables de entorno local**
   
   Dentro del workspace menu ejecutar el comando copy
   
    ```sh
    cd menu
    cp .env.example .env
    ```

3. **Generar una llave para next auth**

   Dentro del shell ejecutar el comando openssl

    ```sh
    openssl rand -base64 32
    ```
   
   Copiar la llave generada en la variable AUTH_JWT_SECRET del archivo menu/.env


4. **Instalar dependencias.**

    Dentro de la raíz del proyecto ejecutar el comando yarn

    ```sh
    yarn
    ```

5. **Construir y correr el proyecto.**

    ```sh
    yarn build
    yarn start
    ```

    El sitio estará disponible en http://localhost:3000

### Tecnologías

-   React - _Frontend library_
-   Next.js - _Framework_
-   Ant Design - _Components library_
-   TailwindCSS - _CSS utility class_
-   Redux - _State manager_
-   React-Query - _Fetch and cache data_
-   Vercel - _Deployment and host_

### License

MIT &copy; Daniel P. Atanacio

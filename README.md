#  Weather App

¡Tu aplicación interactiva del clima! Obtén información meteorológica actual y pronósticos diarios para cualquier ciudad del mundo.

- Pagina corriendo en: [https://facu-weather.vercel.app/](https://facu-weather.vercel.app/)

## 🌟 Características

* **Clima Actual:** Consulta la temperatura, sensación térmica, humedad y condiciones actuales de una ciudad.

* **Pronóstico Diario:** Visualiza el pronóstico de temperatura máxima y mínima para los próximos 5 días con un gráfico interactivo.

* **Diseño Responsivo:** Disfruta de una experiencia de usuario fluida en dispositivos móviles y de escritorio.

* **Animaciones y Transiciones:** Interfaz de usuario dinámica con efectos sutiles.

* **Búsqueda Rápida:** Ingresa el nombre de la ciudad y obtén resultados al instante.

* **Mensajes de Error:** Manejo amigable de errores para ciudades no encontradas.

## 🛠️ Tecnologías Utilizadas

* **React:** Biblioteca de JavaScript para construir interfaces de usuario.

* **Tailwind CSS:** Framework de CSS para un desarrollo rápido y diseño responsivo.

* **Recharts:** Librería de gráficos composables construida con React y D3.

* **Axios:** Cliente HTTP basado en promesas para realizar solicitudes a la API.

* **Framer Motion:** Librería de React para animaciones.

* **react-simple-typewriter:** Componente para efectos de texto de máquina de escribir.

* **Moment.js:** Librería para parsear, validar, manipular y formatear fechas.

* **OpenWeatherMap API:** Fuente de datos meteorológicos.

## 🚀 Instalación y Ejecución Local

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local:

1.  **Clona el repositorio:**

    ```
    git clone <URL_DE_TU_REPOSITORIO>
    cd clima-app


    ```

2.  **Instala las dependencias:**
    Asegúrate de tener [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/) (o [Yarn](https://yarnpkg.com/)) instalados.

    ```
    npm install
    # o si usas Yarn
    yarn install


    ```

    **Importante:** Si tuviste problemas con `moment.js` previamente, es una buena idea limpiar la caché y reinstalar:

    ```
    # Para npm
    npm cache clean --force
    rm -rf node_modules package-lock.json # En Windows: rmdir /s /q node_modules & del package-lock.json
    npm install

    # Para Yarn
    yarn cache clean
    rm -rf node_modules yarn.lock # En Windows: rmdir /s /q node_modules & del yarn.lock
    yarn install


    ```

3.  **Configura tu API Key de OpenWeatherMap:**

    * Regístrate en [OpenWeatherMap](https://openweathermap.org/) y obtén una API Key gratuita.

    * Crea un archivo `.env` en la raíz de tu proyecto (al mismo nivel que `package.json`).

    * Añade tu API Key de esta manera:

        ```
        REACT_APP_WEATHER_API_KEY=TU_API_KEY_AQUI


        ```

        Reemplaza `TU_API_KEY_AQUI` con tu clave real.

4.  **Inicia la aplicación:**

    ```
    npm start
    # o si usas Yarn
    yarn start


    ```

    Esto abrirá la aplicación en tu navegador en `http://localhost:3000`.

## 🖥️ Uso

* Simplemente ingresa el nombre de una ciudad en el campo de búsqueda.

* Presiona "Buscar" o la tecla Enter para obtener la información meteorológica.

* La aplicación mostrará la información actual y un gráfico de pronóstico diario.

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](https://opensource.org/licenses/MIT).

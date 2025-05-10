# 🎭 Antagonista - Sistema de Votación

Sistema de votación web para el manga Antagonista, desarrollado con tecnologías modernas para ofrecer una experiencia interactiva y atractiva a los lectores.

## 🚀 Tecnologías Principales

- **[Astro](https://astro.build/)** v5.7.12 - Framework web para sitios de alto rendimiento
- **[Vue.js](https://vuejs.org/)** v3.5.13 - Framework progresivo para interfaces de usuario
- **[Tailwind CSS](https://tailwindcss.com/)** v3.4.17 - Framework de CSS utilitario
- **[LibSQL](https://turso.tech/libsql)** v0.14.0 - Cliente SQL para la gestión de base de datos
- **[Valibot](https://valibot.dev/)** v1.1.0 - Validación de datos

## 📁 Estructura del Proyecto

```
/
├── src/
│   ├── components/     # Componentes reutilizables
│   │   ├── astrojs/    # Componentes de Astro
│   │   └── vuejs/      # Componentes de Vue
│   ├── data/           # Datos y tipos TypeScript
│   ├── db/             # Configuración de base de datos
│   ├── icons/          # Iconos SVG
│   ├── layouts/        # Plantillas de página
│   ├── lib/            # Utilidades y funciones
│   └── pages/          # Rutas y páginas
├── public/             # Activos estáticos
└── db/                 # Scripts SQL
```

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/roldyoran/antagonista-site
```

2. Instala las dependencias:
```bash
pnpm install
```

3. Inicia el servidor de desarrollo:
```bash
pnpm run dev
```

## 📋 Scripts Disponibles

- `pnpm dev` - Inicia el servidor de desarrollo
- `pnpm build` - Construye el proyecto para producción
- `pnpm preview` - Previsualiza la build de producción

## 🌐 Características Principales

- Diseño responsivo con Tailwind CSS
- Tema claro/oscuro
- Integración con base de datos SQL
- Componentes interactivos con Vue.js
- Optimización de rendimiento con Astro
- Validación de datos con Valibot

## 🔧 Configuración de Base de Datos

El proyecto utiliza LibSQL como cliente SQL. Los scripts de base de datos se encuentran en el directorio `/db`:

- `esquema.sql` - Estructura de la base de datos
- `inserts.sql` - Datos iniciales
- `inserts_examples.sql` - Ejemplos de inserción
- `selects_examples.sql` - Ejemplos de consultas

## 🎨 Personalización

El proyecto utiliza Tailwind CSS para los estilos. La configuración se encuentra en:

- `tailwind.config.mjs` - Configuración de Tailwind
- `astro.config.mjs` - Configuración de Astro

## 📱 Rutas Principales

- `/` - Página principal
- `/personajes` - Galería de personajes
- `/encuesta-resultados` - Resultados de la votación


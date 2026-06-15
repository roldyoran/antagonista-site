# Antagonista - Sistema de Votacion

Plataforma de votacion web para el manga Antagonista. Desarrollada con Astro 6, Vue 3 y Tailwind CSS v4, desplegada en Vercel.

## Stack

- [Astro](https://astro.build/) 6.4 — Framework estatico con islands architecture
- [Vue.js](https://vuejs.org/) 3.5 — Componentes interactivos con client-side rendering
- [Tailwind CSS](https://tailwindcss.com/) 4.3 — Estilos utilitarios via plugin Vite
- [LibSQL](https://turso.tech/libsql) — Base de datos SQL
- [Valibot](https://valibot.dev/) — Validacion de esquemas
- [Bun](https://bun.sh/) — Runtime y gestor de paquetes

## Estructura

```
src/
  layouts/Layout.astro        # Shell HTML raiz (nav, canvas, footer)
  pages/                      # Enrutamiento por archivos
  components/
    astrojs/                   # Componentes estaticos (Nav, Hero, Titles)
    vuejs/                     # Componentes interactivos (AllCards, CharacterCard, etc.)
  data/                        # Datos estaticos y tipos TypeScript
  icons/                       # Componentes de iconos SVG
  styles/global.css            # Importacion de Tailwind + tokens de tema + utilidades
```

## Instalacion

```bash
git clone https://github.com/roldyoran/antagonista-site
cd antagonista-site
bun install
```

## Comandos

| Comando             | Descripcion                          |
| ------------------- | ------------------------------------ |
| `bun run dev`       | Servidor de desarrollo               |
| `bun run build`     | Build de produccion (salida: `dist/`)|
| `bun run preview`   | Vista previa del build local         |

## Arquitectura

El sitio es una aplicacion estatica (SSG) con islands de Vue para la interactividad. Astro genera HTML estatico para las paginas principales, y los componentes Vue se hidratan solo cuando es necesario (`client:load`).

### Tema visual

Tokens de diseno definidos en `src/styles/global.css` dentro del bloque `@theme {}`:

- **Acento**: Crimson (`#DC2626`) sobre fondo neutro oscuro (`#0a0a0a`)
- **Fuentes**: Permanent Marker (display), DM Sans (body), Bebas Neue (scores)
- **Animaciones**: Canvas de particulas con efecto bokeh, transiciones suaves en UI

### Paginas

| Ruta                    | Descripcion                  |
| ----------------------- | ---------------------------- |
| `/`                     | Pagina principal (Hero)      |
| `/personajes`           | Galeria de personajes        |
| `/encuesta-resultados`  | Resultados de la encuesta    |

## Despliegue

Configurado para Vercel con el adaptador `@astrojs/vercel`. El archivo `vercel.json` fuerza `bun install` para las builds.

## Estilo de codigo

- Prettier con tabs, sin punto y coma, comillas simples
- Ver `.prettierrc` para la configuracion completa

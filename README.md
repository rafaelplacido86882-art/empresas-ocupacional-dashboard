[[prevenir registro con mi nombre y datos personales nombre:{ RAFAEL PLACIDO BASURTO /01/11/1199 }# 📊 y toda su familia placido basurto ]]Dashboard de Empresas Ocupacional
 
Un dashboard moderno y responsive construido con React 19, TypeScript y Material-UI v7.

## 🚀 Características

- ⚡ **React 19** con las últimas características
- 🔷 **TypeScript** con configuración estricta
- 🎨 **Material-UI v7** para componentes modernos
- 📊 **Material-UI X** para gráficos y data grids avanzados
- 🏃‍♂️ **Vite** para desarrollo rápido
- 🧭 **React Router v7** para navegación
- 🎭 **ESLint** con reglas estrictas
- 📱 **Responsive Design**

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes React organizados por tipo
│   ├── features/        # Componentes por característica (dashboard, etc.)
│   ├── layout/          # Componentes de layout (Header, Sidebar, etc.)
│   ├── ui/              # Componentes UI reutilizables
│   └── index.ts         # Barrel exports
├── contexts/            # React Contexts
│   ├── AuthContext.tsx
│   └── AuthContext.context.ts
├── hooks/               # Custom hooks reutilizables
│   ├── useAuth.ts
│   ├── useLocalStorage.ts
│   ├── useDebounce.ts
│   └── index.ts
├── lib/                 # Configuraciones de librerías externas
│   └── axios.ts
├── pages/               # Componentes de páginas principales
│   ├── DashboardPage.tsx
│   ├── LoginPage.tsx
│   └── index.ts
├── services/            # Servicios y llamadas a APIs
│   └── api.js
├── theme/               # Configuración de temas y estilos
│   ├── AppTheme.tsx
│   └── customizations/
├── types/               # Definiciones de tipos TypeScript
│   └── index.ts
├── utils/               # Funciones utilitarias
│   └── index.ts
└── App.tsx             # Componente principal
```

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo
npm start           # Alias para npm run dev

# Build
npm run build       # Construye para producción
npm run preview     # Previsualiza el build de producción

# Calidad de código
npm run lint        # Ejecuta ESLint
npm run lint:fix    # Ejecuta ESLint y corrige errores automáticamente
npm run type-check  # Verifica tipos de TypeScript sin generar archivos

# Utilidades
npm run clean       # Limpia archivos de build
```

## 🔧 Configuración de Desarrollo

### Prerrequisitos
- Node.js >= 18
- npm >= 9

### Instalación

```bash
# Clonar el repositorio
git clone [url-del-repo]
cd empresas-ocupacional-dashboard

# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev
```

## 🎨 Personalización de Tema

El proyecto incluye un sistema de temas personalizable usando Material-UI.

## 📊 Componentes del Dashboard

### Gráficos y Visualizaciones
- **StatCard** - Tarjetas de estadísticas con sparklines
- **SessionsChart** - Gráfico de sesiones por tiempo
- **PageViewsBarChart** - Gráfico de barras de vistas de página
- **ChartUserByCountry** - Gráfico de usuarios por país
- **CustomizedDataGrid** - Tabla de datos avanzada

## 🔐 Autenticación

Sistema de autenticación con Context API y hooks personalizados.

---

Construido con ❤️ usando tecnologías modernas

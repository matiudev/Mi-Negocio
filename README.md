# 🏪 Mi Negocio

> Aplicación móvil para gestión de ventas, productos y clientes diseñada para pequeños negocios y emprendedores.

---

## 📖 Descripción

**Mi Negocio** es una app móvil que te permite llevar el control completo de tu negocio desde el celular. Registrá ventas vinculando clientes y productos, administrá tu catálogo y cartera de clientes, y analizá el rendimiento con gráficos y rankings. Todo funciona **sin internet** — los datos se guardan localmente en el dispositivo.

---

## ✨ Características Principales

### 🏠 Dashboard
- Resumen de ventas del mes actual.
- Actividad reciente de un vistazo.

### 💰 Ventas
- Registrá ventas vinculando cliente, producto, cantidad y fecha.
- Cálculo automático del monto total.
- Marcá cada venta como **pagada o pendiente**.
- Filtros por cliente y rango de fecha en el resumen completo.

### 📦 Productos y Clientes
- Agregá y listá productos con nombre y precio.
- Agregá y listá clientes con nombre.

### 📊 Análisis y Rankings
- Gráfico de ventas por día con períodos configurables (7, 14 o 30 días).
- Top 5 productos más vendidos.
- Top 5 clientes por monto.

### 💾 Almacenamiento Local
- Todos los datos se guardan en el dispositivo con Zustand + AsyncStorage.
- Sin necesidad de internet ni backend externo.

---

## 🛠️ Stack Tecnológico

| Categoría | Tecnología | Versión |
|-----------|-----------|---------|
| Framework | React Native + Expo | ~54 |
| Estado Global | Zustand + AsyncStorage | ^5 |
| Navegación | React Navigation (Stack + Bottom Tabs) | v7 |
| Estilos | NativeWind (Tailwind CSS) | - |
| UI Components | React Native Paper | - |
| Gráficos | React Native SVG | - |
| Íconos | Lucide React Native | - |
| Animaciones | React Native Reanimated | ~4 |
| Builds | EAS Build + Expo Updates (OTA) | - |

---

## 📁 Estructura del Proyecto

```
Mi-Negocio/
├── src/
│   ├── components/        # Componentes UI reutilizables (Header, modales, formularios)
│   ├── feature/           # Módulos por dominio (Feature-Based)
│   │   ├── analytics/     # Gráfico de ventas, período y rankings
│   │   │   ├── components/
│   │   │   ├── screens/
│   │   │   └── store/
│   │   ├── clientes/      # Store, lista y modales de clientes
│   │   │   ├── components/
│   │   │   └── store/
│   │   ├── dashboard/     # Tarjeta de ventas del mes y actividad reciente
│   │   │   └── components/
│   │   ├── productos/     # Store, lista y modales de productos
│   │   │   ├── components/
│   │   │   └── store/
│   │   └── ventas/        # Store, lista y modal de nueva venta
│   │       ├── components/
│   │       └── store/
│   ├── navigation/        # RootStack y TabNavigator
│   ├── screens/           # Pantallas principales de los tabs
│   ├── theme/             # Contexto de tema y paleta de colores
│   └── utils/             # Utilidades (formateo de fechas)
├── assets/                # Imágenes, íconos, splash screen
├── App.js
├── app.json
└── package.json
```

---

## 🧭 Navegación

```
RootNavigator
└── AppStack
    └── TabNavigator (bottom tabs)
        ├── 🏠 Home        → HomeScreen (Dashboard)
        ├── 📊 Análisis    → AnalyticsScreen (Gráficos y Rankings)
        ├── 📦 Productos   → ProductosScreen
        ├── 👥 Clientes    → ClientesScreen
        └── 📋 Resumen     → ResumenVentasScreen
```

---

## 🚀 Instalación y Configuración

### Prerrequisitos
- **Node.js** >= 18
- **Expo CLI**: `npm install -g expo-cli`
- **Expo Go** en tu teléfono o un simulador iOS/Android

### Pasos

```bash
# 1. Clonar el repositorio
git clone <repo-url>
cd Mi-Negocio

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm start
```

### Builds con EAS

```bash
# Android producción
eas build --platform android --profile production

# Preview interno
eas build --platform android --profile preview
```

---

*Hecho con ❤️ por [matiudev](https://github.com/matiudev)*

# Mi Negocio 📱

Aplicación móvil para gestión de ventas, productos y clientes diseñada para pequeños negocios y emprendedores. Permite registrar ventas, administrar tu catálogo de productos y tu cartera de clientes, y analizar el rendimiento de tu negocio con gráficos y reportes.

---

## Características principales

- **Dashboard**: resumen de ventas del mes y actividad reciente
- **Registro de ventas**: vincula cliente, producto, cantidad y fecha con cálculo automático del monto
- **Gestión de productos**: agregar y listar productos con nombre y precio
- **Gestión de clientes**: agregar y listar clientes
- **Análisis y gráficos**: gráfico de ventas por día con períodos configurables (7, 14 o 30 días)
- **Rankings**: top 5 productos más vendidos y top 5 clientes por monto
- **Resumen de ventas**: vista completa con filtros por cliente y rango de fecha
- **Control de pagos**: marcá cada venta como pagada o pendiente
- **Almacenamiento local**: todos los datos se guardan en el dispositivo, sin necesidad de internet

---

## Tecnologías

| Categoría | Tecnología |
|---|---|
| Framework | React Native + Expo ~54 |
| UI / Estilos | NativeWind (Tailwind CSS), React Native Paper |
| Estado | Zustand ^5 con persistencia en AsyncStorage |
| Navegación | React Navigation v7 (Stack + Bottom Tabs) |
| Iconos | Lucide React Native |
| Animaciones | React Native Reanimated ~4 |
| Gráficos | React Native SVG |
| Build / Deploy | EAS Build, Expo Updates (OTA) |

---

## Estructura del proyecto

```
src/
├── components/         # Componentes UI reutilizables (Header, modales, formularios)
├── feature/
│   ├── analytics/      # Gráfico de ventas, período y rankings
│   ├── clientes/       # Store, lista y modales de clientes
│   ├── dashboard/      # Tarjeta de ventas del mes y actividad reciente
│   ├── productos/      # Store, lista y modales de productos
│   └── ventas/         # Store, lista y modal de nueva venta
├── navigation/         # RootStack y TabNavigator
├── screens/            # Pantallas principales (Home, Análisis, Productos, Clientes, Resumen)
├── theme/              # Contexto de tema y paleta de colores
└── utils/              # Utilidades (formateo de fechas)
```

---

## Modelo de datos

Los datos se persisten localmente mediante Zustand + AsyncStorage. No requiere base de datos externa ni backend.

```js
// Producto
{ id: number, nombre: string, precio: number }

// Cliente
{ id: number, nombre: string }

// Venta
{
  id: string,          // timestamp único
  id_cliente: number,
  id_producto: number,
  fecha: string,       // ISO 8601
  monto: number,       // precio × cantidad
  cantidad: number,
  pagado: boolean
}
```

---

## Instalación y ejecución

### Requisitos previos

- [Node.js](https://nodejs.org/) >= 18
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Para Android: Android Studio o dispositivo físico con Expo Go
- Para iOS: Mac con Xcode o dispositivo físico con Expo Go

### Pasos

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd Mi-Negocio

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm start
```

### Comandos disponibles

```bash
npm start          # Servidor Expo (escanear QR con Expo Go)
npm run android    # Abrir en emulador Android
npm run ios        # Abrir en simulador iOS (requiere Mac)
npm run web        # Abrir en navegador web
```

---

## Build de producción (EAS)

```bash
# Android APK
eas build --platform android --profile production

# Preview interno
eas build --platform android --profile preview
```

La configuración de builds se encuentra en `eas.json`.

---

## Flujo principal de uso

1. **Agregar productos** desde la pantalla Productos
2. **Agregar clientes** desde la pantalla Clientes
3. **Registrar una venta** desde el botón de inicio → seleccionar cliente, producto, cantidad y fecha
4. **Revisar el análisis** en la pestaña Análisis para ver gráficos y rankings
5. **Filtrar y gestionar pagos** en la pantalla Resumen de Ventas

---

## Versión

**v1.0.0** — Primera versión estable lanzada.  
Package ID: `com.matiudev.minegocio`

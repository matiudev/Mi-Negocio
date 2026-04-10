import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ESTRUCTURA DEL OBJETO: { id, id_cliente, id_producto, fecha, monto, cantidad, pagado }

export const useVentasStore = create(
  persist(
    (set, get) => ({
      ventas: [],

      getVentasOrdenadas: () => {
        return get().ventas.sort(
          (a, b) => new Date(b.fecha) - new Date(a.fecha),
        );
        // Más reciente primero
      },

      addVenta: (venta) =>
        set((state) => ({ ventas: [...state.ventas, venta] })),

      removeVenta: (id) =>
        set((state) => ({
          ventas: state.ventas.filter((v) => v.id !== id),
        })),

      getTotalVentas: () => get().ventas.reduce((acc, v) => acc + v.monto, 0),

      getVentasByFecha: (fecha) =>
        get().ventas.filter((v) => v.fecha === fecha),

      // Ventas del mes actual
      getVentasMesActual: () => {
        const ahora = new Date();
        const mesActual = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, "0")}`;
        // mesActual = "2025-03"

        return get().ventas.filter((v) => v.fecha.startsWith(mesActual));
        // "2025-03-22".startsWith("2025-03") ✅
      },

      getTopProductos: (limit = 5) => {
        const totales = {};
        get().ventas.forEach((v) => {
          if (!totales[v.id_producto]) {
            totales[v.id_producto] = {
              id_producto: v.id_producto,
              cantidad: 0,
            };
          }
          totales[v.id_producto].cantidad += v.cantidad;
        });
        return Object.values(totales)
          .sort((a, b) => b.cantidad - a.cantidad)
          .slice(0, limit);
      },

      getTopClientes: (limit = 5) => {
        const totales = {};
        get().ventas.forEach((v) => {
          if (!totales[v.id_cliente]) {
            totales[v.id_cliente] = { id_cliente: v.id_cliente, monto: 0 };
          }
          totales[v.id_cliente].monto += v.monto;
        });
        return Object.values(totales)
          .sort((a, b) => b.monto - a.monto)
          .slice(0, limit);
      },

      togglePagado: (id) =>
        set((state) => ({
          ventas: state.ventas.map((v) =>
            v.id === id ? { ...v, pagado: !v.pagado } : v,
          ),
        })),

      removeAllVentas: () => set({ ventas: [] }),
    }),
    {
      name: "ventas-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

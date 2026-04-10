import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Objeto producto: { id, nombre, precio }

export const useProductosStore = create(
  persist(
    (set, get) => ({
      productos: [],

      addProducto: (producto) =>
        set((state) => ({
          productos: [
            ...state.productos,
            { ...producto, id: state.productos.length + 1 },
          ],
        })),

      removeProducto: (id) =>
        set((state) => ({
          productos: state.productos.filter((p) => p.id !== id),
        })),

      getProductoById: (id) => get().productos.find((p) => p.id === id),

      removeAllProductos: () => set({ productos: [] }),
    }),
    {
      name: "productos-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
import { useVentasStore } from "@/feature/ventas/useVentasStore";
import { useProductosStore } from "@/feature/productos/useProductosStore";
import { useClientesStore } from "@/feature/clientes/useClientesStore";

export const cargarDatosDemo = () => {
  const { removeAllVentas, addVenta } = useVentasStore.getState();
  const { removeAllProductos, addProducto } = useProductosStore.getState();
  const { removeAllClientes, addCliente } = useClientesStore.getState();

  removeAllVentas();
  removeAllProductos();
  removeAllClientes();

  // Productos — IDs 1-8 asignados automáticamente por el store
  [
    { nombre: "Remera básica", precio: 8500 },
    { nombre: "Jeans slim fit", precio: 25000 },
    { nombre: "Buzo hoodie", precio: 18000 },
    { nombre: "Vestido floral", precio: 22000 },
    { nombre: "Campera de cuero", precio: 45000 },
    { nombre: "Short deportivo", precio: 12000 },
    { nombre: "Camisa de lino", precio: 16000 },
    { nombre: "Zapatillas urbanas", precio: 38000 },
  ].forEach((p) => addProducto(p));

  // Clientes — IDs 1-6 asignados automáticamente por el store
  [
    { nombre: "María González" },
    { nombre: "Lucas Rodríguez" },
    { nombre: "Valentina Pérez" },
    { nombre: "Sebastián Torres" },
    { nombre: "Camila López" },
    { nombre: "Andrés Morales" },
  ].forEach((c) => addCliente(c));

  // Ventas: 11 en mayo 2026 (mes actual) + 9 en abril 2026
  [
    // ── Mayo 2026 ──────────────────────────────────────────────
    { id: "d01", id_cliente: 1, id_producto: 1, fecha: "2026-05-01", cantidad: 2, monto: 17000,  pagado: true  },
    { id: "d02", id_cliente: 2, id_producto: 2, fecha: "2026-05-02", cantidad: 1, monto: 25000,  pagado: false },
    { id: "d03", id_cliente: 3, id_producto: 3, fecha: "2026-05-03", cantidad: 1, monto: 18000,  pagado: true  },
    { id: "d04", id_cliente: 4, id_producto: 5, fecha: "2026-05-05", cantidad: 1, monto: 45000,  pagado: false },
    { id: "d05", id_cliente: 5, id_producto: 4, fecha: "2026-05-06", cantidad: 2, monto: 44000,  pagado: true  },
    { id: "d06", id_cliente: 6, id_producto: 6, fecha: "2026-05-07", cantidad: 3, monto: 36000,  pagado: false },
    { id: "d07", id_cliente: 1, id_producto: 8, fecha: "2026-05-08", cantidad: 1, monto: 38000,  pagado: true  },
    { id: "d08", id_cliente: 2, id_producto: 7, fecha: "2026-05-09", cantidad: 2, monto: 32000,  pagado: false },
    { id: "d09", id_cliente: 3, id_producto: 1, fecha: "2026-05-10", cantidad: 3, monto: 25500,  pagado: true  },
    { id: "d10", id_cliente: 4, id_producto: 2, fecha: "2026-05-11", cantidad: 1, monto: 25000,  pagado: false },
    { id: "d11", id_cliente: 5, id_producto: 3, fecha: "2026-05-12", cantidad: 1, monto: 18000,  pagado: true  },
    // ── Abril 2026 ─────────────────────────────────────────────
    { id: "d12", id_cliente: 6, id_producto: 4, fecha: "2026-04-03", cantidad: 1, monto: 22000,  pagado: true  },
    { id: "d13", id_cliente: 1, id_producto: 5, fecha: "2026-04-07", cantidad: 1, monto: 45000,  pagado: true  },
    { id: "d14", id_cliente: 2, id_producto: 1, fecha: "2026-04-10", cantidad: 2, monto: 17000,  pagado: false },
    { id: "d15", id_cliente: 3, id_producto: 6, fecha: "2026-04-14", cantidad: 2, monto: 24000,  pagado: true  },
    { id: "d16", id_cliente: 4, id_producto: 8, fecha: "2026-04-18", cantidad: 1, monto: 38000,  pagado: true  },
    { id: "d17", id_cliente: 5, id_producto: 7, fecha: "2026-04-22", cantidad: 1, monto: 16000,  pagado: false },
    { id: "d18", id_cliente: 6, id_producto: 3, fecha: "2026-04-25", cantidad: 2, monto: 36000,  pagado: true  },
    { id: "d19", id_cliente: 1, id_producto: 2, fecha: "2026-04-28", cantidad: 1, monto: 25000,  pagado: true  },
    { id: "d20", id_cliente: 2, id_producto: 4, fecha: "2026-04-30", cantidad: 1, monto: 22000,  pagado: false },
  ].forEach((v) => addVenta(v));
};

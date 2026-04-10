import { View, Text } from "react-native";
import { useMemo } from "react";
import { useProductosStore } from "@/feature/productos/useProductosStore";
import { useClientesStore } from "@/feature/clientes/useClientesStore";
import { useTheme } from "@/theme/useTheme";

const ItemRanking = ({ nombre, valor, colors }) => (
  <View style={{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  }}>
    <Text style={{ fontSize: 14, color: colors.text, flex: 1 }} numberOfLines={1}>
      {nombre}
    </Text>
    <View style={{
      backgroundColor: colors.primaryLight,
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 4,
      marginLeft: 8,
    }}>
      <Text style={{ fontSize: 13, color: colors.primary, fontWeight: "500" }}>
        {valor}
      </Text>
    </View>
  </View>
);

const TarjetaRanking = ({ titulo, items, colors }) => (
  <View style={{
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: colors.border,
  }}>
    <Text style={{
      fontSize: 11,
      fontWeight: "600",
      letterSpacing: 1,
      color: colors.textSecondary,
      marginBottom: 4,
    }}>
      {titulo.toUpperCase()}
    </Text>

    {items.length === 0 ? (
      <Text style={{ fontSize: 13, color: colors.textSecondary, paddingVertical: 12 }}>
        Sin datos aún
      </Text>
    ) : (
      items.map((item, i) => (
        <ItemRanking key={i} nombre={item.nombre} valor={item.valor} colors={colors} />
      ))
    )}
  </View>
);

const TopRankings = ({ periodoSeleccionado, ventas = [] }) => {
  const { colors } = useTheme();
  const getProductoById = useProductosStore((state) => state.getProductoById);
  const getClienteById = useClientesStore((state) => state.getClienteById);

  const { topProductos, topClientes } = useMemo(() => {
    const dias = parseInt(periodoSeleccionado);
    const hoy = new Date();
    const fechaLimite = new Date(hoy);
    fechaLimite.setDate(hoy.getDate() - dias);

    const ventasFiltradas = ventas.filter((v) => new Date(v.fecha) >= fechaLimite);

    const totalesProductos = {};
    ventasFiltradas.forEach((v) => {
      if (!totalesProductos[v.id_producto])
        totalesProductos[v.id_producto] = { id: v.id_producto, cantidad: 0 };
      totalesProductos[v.id_producto].cantidad += v.cantidad;
    });

    const topProductos = Object.values(totalesProductos)
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, 5)
      .map((p) => ({
        nombre: getProductoById(p.id)?.nombre ?? `Producto ${p.id}`,
        valor: `${p.cantidad} uds`,
      }));

    const totalesClientes = {};
    ventasFiltradas.forEach((v) => {
      if (!totalesClientes[v.id_cliente])
        totalesClientes[v.id_cliente] = { id: v.id_cliente, monto: 0 };
      totalesClientes[v.id_cliente].monto += v.monto;
    });

    const topClientes = Object.values(totalesClientes)
      .sort((a, b) => b.monto - a.monto)
      .slice(0, 5)
      .map((c) => ({
        nombre: getClienteById(c.id)?.nombre ?? `Cliente ${c.id}`,
        valor: `$${c.monto.toLocaleString("es-CL")}`,
      }));

    return { topProductos, topClientes };
  }, [ventas, periodoSeleccionado]);

  return (
    <View style={{ marginTop: 20 }}>
      <TarjetaRanking titulo="Productos más vendidos" items={topProductos} colors={colors} />
      <TarjetaRanking titulo="Clientes top" items={topClientes} colors={colors} />
    </View>
  );
};

export default TopRankings;
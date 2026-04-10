import { View, Text, TouchableOpacity } from "react-native";
import { CheckCircle, Circle, ShoppingBag } from "lucide-react-native";
import { useTheme } from "@/theme/useTheme";
import { useProductosStore } from "@/feature/productos/useProductosStore";
import { fechaFormateada } from "@/utils/formatDato";
import { useClientesStore } from "@/feature/clientes/useClientesStore";
import { useVentasStore } from "@/feature/ventas/useVentasStore";

const ListarVentas = ({ venta, mostrarPago = false}) => {
  const { colors } = useTheme();
  const cliente = useClientesStore((state) =>
    state.getClienteById(venta.id_cliente),
  );
  const producto = useProductosStore((state) =>
    state.getProductoById(venta.id_producto),
  );
    const togglePagado = useVentasStore((state) => state.togglePagado);


  return (
    <View
      className="flex-row items-center gap-3 py-3 px-4"
      style={{ borderBottomWidth: 0.5, borderBottomColor: colors.border, }}
    >
      <View
        className="w-10 h-10 rounded-full items-center justify-center"
        style={{ backgroundColor: colors.primaryLight }}
      >
        <ShoppingBag size={18} color={colors.primary} />
      </View>

      <View className="flex-1 gap-0.5">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Text
              className="font-medium text-sm"
              style={{ color: colors.text }}
            >
              {producto.nombre}
            </Text>
            <View
              className="px-1.5 py-0.5 rounded-md"
              style={{ backgroundColor: colors.primaryLight }}
            >
              <Text
                className="text-xs font-semibold"
                style={{ color: colors.primary }}
              >
                x{venta.cantidad}
              </Text>
            </View>
          </View>
          <Text
            className="font-semibold text-sm"
            style={{ color: colors.primary }}
          >
            ${venta.monto.toLocaleString()}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-xs" style={{ color: colors.textSecondary2 }}>
            {cliente.nombre}
          </Text>
          <Text className="text-xs" style={{ color: colors.textSecondary2 }}>
            {fechaFormateada(venta.fecha)}
          </Text>
        </View>
        {mostrarPago && (
          <TouchableOpacity
            onPress={() => togglePagado(venta.id)}
            className="flex-row items-center gap-1 mt-1 self-end"
          >
            {venta.pagado ? (
              <>
                <CheckCircle size={14} color={colors.primary} />
                <Text className="text-xs font-semibold" style={{ color: colors.primary }}>
                  Pagado
                </Text>
              </>
            ) : (
              <>
                <Circle size={14} color={colors.textSecondary2} />
                <Text className="text-xs" style={{ color: colors.textSecondary2 }}>
                  Marcar como pagado
                </Text>
              </>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ListarVentas;

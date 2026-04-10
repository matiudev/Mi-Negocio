import { View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useMemo, useState } from "react";
import { Archive, Plus } from "lucide-react-native";
import { useTheme } from "@/theme/useTheme";
import { useVentasStore } from "@/feature/ventas/useVentasStore";
import { ModalAgregarProducto } from "@/feature/productos";
import { ModalAgregarVenta } from "@/feature/ventas";
import { ModalSelectorClientes } from "@/feature/clientes";
import { ModalSelectorProductos } from "@/feature/productos";

const VentasTotalesMes = () => {
  const { colors } = useTheme();
  const [modalVentas, setModalVentas] = useState(false);
  const [modalAddProducto, setModalAddProducto] = useState(false);
  
  const [modalProductos, setModalProductos] = useState(false);
  const [modalClientes, setModalClientes] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)

  const ventas = useVentasStore((state) => state.getVentasOrdenadas());
  const ventasMes = useMemo(() => {
    const ahora = new Date();
    const mesActual = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, "0")}`;
    return ventas.filter((v) => v.fecha.startsWith(mesActual));
  }, [ventas]);

  const total = useMemo(() => {
    return ventasMes.reduce((acc, v) => acc + v.monto, 0);
  }, [ventasMes]);

  return (
    <View className="items-center gap-4">
      <View className="items-center gap-1">
        <Text
          className="text-xs tracking-widest"
          style={{ color: colors.textSecondary }}
        >
          {ventas.length} VENTAS TOTALES
        </Text>
        <Text className="text-5xl font-semibold" style={{ color: colors.text }}>
          ${total.toLocaleString()}
        </Text>
        <Text className="text-sm" style={{ color: colors.textSecondary }}>
          Este mes
        </Text>
      </View>

      <View className="flex-row gap-3 w-full px-4">
        <TouchableOpacity
          className="flex-1 flex-row items-center justify-center gap-2 py-3 rounded-xl"
          style={{ backgroundColor: colors.button_accent }}
          onPress={() => setModalVentas(true)}
        >
          <Plus size={18} color={colors.button_icon} />
          <Text
            className="font-medium text-base"
            style={{ color: colors.button_text }}
          >
            Vender
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 flex-row items-center justify-center gap-2 py-3 rounded-xl border"
          style={{
            backgroundColor: colors.primaryLight,
            borderColor: colors.primaryMedium,
          }}
          onPress={() => setModalAddProducto(true)}
        >
          <Archive size={18} color={colors.primary} />
          <Text
            className="font-medium text-base"
            style={{ color: colors.primary }}
          >
            Producto
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalAddProducto}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalAddProducto(false)}
      >
        <ModalAgregarProducto onClose={() => setModalAddProducto(false)} />
      </Modal>

      <Modal
        visible={modalVentas}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVentas(false)}
      >
        <ModalAgregarVenta
          onClose={() => {setModalVentas(false); setClienteSeleccionado(null); setProductoSeleccionado(null)}}
          onAbrirModalClientes={() => setModalClientes(true)}
          onAbrirModalProductos={() => setModalProductos(true)}
          clienteSeleccionado={clienteSeleccionado}
          productoSeleccionado={productoSeleccionado}
        />
      </Modal>

      <ModalSelectorClientes
        visible={modalClientes}
        onClose={() => setModalClientes(false)}
        onSelect={(item) => {
          setClienteSeleccionado(item);
          setModalClientes(false);
        }}
        colors={colors}
      />

      <ModalSelectorProductos
        visible={modalProductos}
        onClose={() => setModalProductos(false)}
        onSelect={(item) => {
          setProductoSeleccionado(item);
          setModalProductos(false);
        }}
        colors={colors}
      />
    </View>
  );
};

export default VentasTotalesMes;

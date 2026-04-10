import { Package, X, User, Hash, Calendar } from "lucide-react-native";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "@/theme/useTheme";
import { Campo } from "@/components/ui/CamposFormulario";
import { useVentasStore } from "@/feature/ventas/useVentasStore";

// ── Fila de selección (toca para abrir dropdown) ──────────────────────────────
const FilaSelector = ({ label, Icon, valor, placeholder, onPress, colors }) => (
  <Campo label={label} Icon={Icon} colors={colors}>
    <TouchableOpacity style={{ flex: 1 }} onPress={onPress}>
      <Text
        style={{
          fontSize: 15,
          color: valor ? colors.text : colors.textPlaceHolder,
          paddingVertical: 2,
        }}
      >
        {valor || placeholder}
      </Text>
    </TouchableOpacity>
  </Campo>
);

// ── Modal principal ───────────────────────────────────────────────────────────
const ModalAgregarVenta = ({ onClose, onAbrirModalClientes, onAbrirModalProductos, clienteSeleccionado, productoSeleccionado }) => {
  const { colors } = useTheme();

  const [cantidad, setCantidad] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);

  // Monto calculado en tiempo real
  const monto =
    productoSeleccionado && cantidad
      ? parseFloat(productoSeleccionado.precio) * parseFloat(cantidad) || 0
      : null;

  const handleGuardar = () => {
    if (!clienteSeleccionado || !productoSeleccionado || !cantidad.trim())
      return;

    setLoading(true);

    const venta = {
      id: Date.now().toString(),
      id_cliente: clienteSeleccionado.id,
      id_producto: productoSeleccionado.id,
      fecha: fecha.toISOString(),
      monto: monto,
      cantidad: parseFloat(cantidad),
      pagado: false,
    };

    useVentasStore.getState().addVenta(venta);
    onClose();
  };

  const formularioValido =
    clienteSeleccionado && productoSeleccionado && cantidad.trim() !== "";

  return (
    <View
      className="flex-1 justify-end"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <TouchableOpacity className="flex-1" onPress={onClose} />

      {/* ── Contenido del modal ── */}
      <View
        className="rounded-t-[20px] p-5"
        style={{ backgroundColor: colors.background }}
      >
        {/* Pill */}
        <View
          className="w-10 h-1 rounded-full self-center mb-4 opacity-30"
          style={{ backgroundColor: colors.text }}
        />

        {/* Header */}
        <View className="flex-row justify-between items-center mb-5">
          <Text
            className="text-xl font-semibold"
            style={{ color: colors.text }}
          >
            Nueva Venta
          </Text>
          <TouchableOpacity onPress={onClose}>
            <X color={colors.text} size={22} />
          </TouchableOpacity>
        </View>

        {/* Cliente */}
        <FilaSelector
          label="Cliente"
          Icon={User}
          valor={clienteSeleccionado?.nombre}
          placeholder="Seleccionar cliente"
          onPress={onAbrirModalClientes}
          colors={colors}
        />

        {/* Producto */}
        <FilaSelector
          label="Producto"
          Icon={Package}
          valor={productoSeleccionado?.nombre}
          placeholder="Seleccionar producto"
          onPress={onAbrirModalProductos}
          colors={colors}
        />

        {/* Cantidad */}
        <Campo label="Cantidad" Icon={Hash} colors={colors}>
          <TextInput
            className="flex-1 text-base w-full"
            style={{ color: colors.text }}
            placeholder="0"
            placeholderTextColor={colors.textPlaceHolder}
            keyboardType="numeric"
            value={cantidad}
            onChangeText={(v) => setCantidad(v.replace(/[^0-9.]/g, ""))}
          />
        </Campo>

        {/* Fecha */}
        <FilaSelector
          label="Fecha"
          Icon={Calendar}
          valor={fecha.toLocaleDateString("es-CL")}
          placeholder="Seleccionar fecha"
          onPress={() => setShowDatePicker(true)}
          colors={colors}
        />
        {showDatePicker && (
          <DateTimePicker
            value={fecha}
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={(_, date) => {
              setShowDatePicker(Platform.OS === "ios");
              if (date) setFecha(date);
            }}
          />
        )}

        {/* Monto calculado */}
        {monto !== null && (
          <View className="flex-row justify-between py-3 px-1 mt-1">
            <Text className="text-sm" style={{ color: colors.textPlaceHolder }}>
              Total
            </Text>
            <Text
              className="text-base font-bold"
              style={{ color: colors.text }}
            >
              ${monto.toLocaleString("es-CL")}
            </Text>
          </View>
        )}

        {/* Botón Guardar */}
        <TouchableOpacity
          onPress={handleGuardar}
          disabled={loading || !formularioValido}
          className="rounded-2xl p-4 items-center mt-2 mb-5"
          style={{
            backgroundColor: formularioValido
              ? colors.button_accent
              : colors.button_accent + "66",
          }}
        >
          {loading ? (
            <ActivityIndicator color={colors.button_icon} />
          ) : (
            <Text className="text-white font-semibold text-base">Guardar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModalAgregarVenta;

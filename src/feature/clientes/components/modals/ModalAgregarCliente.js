import { Package, X } from "lucide-react-native";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useTheme } from "@/theme/useTheme";
import { Campo } from "@/components/ui/CamposFormulario";
import { useClientesStore } from "@/feature/clientes/useClientesStore";

const ModalAgregarCliente = ({ onClose }) => {
  const { colors } = useTheme();

  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGuardar = () => {
    if (!nombre.trim()) {
      return;
    }

    const cliente = { nombre: nombre };

    useClientesStore.getState().addCliente(cliente);
    onClose();
  };

  const formularioValido = nombre.trim() !== "";

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "flex-end",
      }}
    >
      <TouchableOpacity style={{ flex: 1 }} onPress={onClose} />

      <View
        style={{
          backgroundColor: colors.background,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 20,
        }}
      >
        {/* Pill */}
        <View
          style={{
            width: 40,
            height: 4,
            backgroundColor: colors.text,
            opacity: 0.3,
            borderRadius: 2,
            alignSelf: "center",
            marginBottom: 16,
          }}
        />

        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text
            className="text-xl font-semibold"
            style={{ color: colors.text }}
          >
            Nuevo Cliente
          </Text>
          <TouchableOpacity onPress={onClose}>
            <X color={colors.text} size={22} />
          </TouchableOpacity>
        </View>

        {/* Campo Nombre */}
        <Campo label="Nombre" Icon={Package} colors={colors}>
          <TextInput
            className="flex text-base w-full"
            style={{ color: colors.text }}
            placeholder="Nombre del Cliente"
            placeholderTextColor={colors.textPlaceHolder}
            value={nombre}
            onChangeText={setNombre}
          />
        </Campo>

        {/* Botón Guardar */}
        <TouchableOpacity
          onPress={handleGuardar}
          disabled={loading || !formularioValido}
          style={{
            backgroundColor: formularioValido
              ? colors.button_accent
              : colors.button_accent + "66",
            borderRadius: 14,
            padding: 16,
            alignItems: "center",
            marginTop: 8,
            marginBottom: 20,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
            {loading ? (
              <ActivityIndicator color={colors.button_icon} />
            ) : (
              "Guardar"
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModalAgregarCliente;

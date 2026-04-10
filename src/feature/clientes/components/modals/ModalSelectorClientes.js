import ModalSelector from "@/components/modals/ModalSelector";
import { TouchableOpacity, Text } from "react-native";
import { PackageSearch, User } from "lucide-react-native";
import { CeroItems } from "@/components/ui/CeroItems";
import { useTheme } from "@/theme/useTheme";
import { useClientesStore } from "@/feature/clientes/useClientesStore";

export const ModalSelectorClientes = ({ visible, onClose, onSelect }) => {
  const { colors } = useTheme();
  const clientes = useClientesStore((state) => state.clientes);

  return (
    <ModalSelector
      visible={visible}
      onClose={onClose}
      titulo="Seleccionar Cliente"
      data={clientes}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => { onSelect(item); onClose(); }}
          style={{ paddingVertical: 14, borderBottomWidth: 0.5, borderBottomColor: colors.text + "20", flexDirection: "row", alignItems: "center", gap: 10 }}
        >
          <User size={16} color={colors.textPlaceHolder} />
          <Text style={{ color: colors.text, fontSize: 15 }}>{item.nombre}</Text>
        </TouchableOpacity>
      )}
      ListEmptyComponent={<CeroItems titulo="Sin Clientes" Icon={PackageSearch} />}
    />
  );
};
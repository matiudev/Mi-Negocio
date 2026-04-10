import { Package, PackageSearch, User } from 'lucide-react-native';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import { CeroItems } from '@/components/ui/CeroItems';
import { useProductosStore } from "@/feature/productos/useProductosStore";
import { useTheme } from '@/theme/useTheme';

export const ModalSelectorProductos = ({ visible, onClose, onSelect }) => {
    const { colors } = useTheme();
const productos = useProductosStore((state) => state.productos);
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "flex-end" }}>
        <TouchableOpacity style={{ flex: 1 }} onPress={onClose} />
        <View style={{ backgroundColor: colors.background, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: "60%" }}>
          {/* Pill */}
          <View style={{ width: 40, height: 4, backgroundColor: colors.text, opacity: 0.3, borderRadius: 2, alignSelf: "center", marginBottom: 16 }} />
          <Text style={{ color: colors.text, fontSize: 17, fontWeight: "600", marginBottom: 14 }}>
            Seleccionar Producto
          </Text>
          <FlatList
            data={productos}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => { onSelect(item); onClose(); }}
                style={{ paddingVertical: 14, borderBottomWidth: 0.5, borderBottomColor: colors.text + "20", flexDirection: "row", alignItems: "center", gap: 10, justifyContent:"space-between" }}
              >
                <View className="flex-row items-center gap-2">
                <Package size={16} color={colors.textPlaceHolder} />
                <Text style={{ color: colors.text, fontSize: 15 }}>{item.nombre}</Text>
                </View>
                <View>
                  <Text>${item.precio.toLocaleString()}</Text>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
          <CeroItems
            titulo="Sin clientes registrados"
            subtitulo="Presione + para registrar"
            Icon={PackageSearch}
          />
        }
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Modal>
  );
};
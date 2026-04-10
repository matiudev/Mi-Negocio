import { FAB } from "react-native-paper";
import { FlatList, View, Modal } from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "@/components/ui/Header";
import { ContainerTabs } from "@/components/ui/Containers";
import { useProductosStore } from "@/feature/productos/useProductosStore";
import { CeroItems } from "@/components/ui/CeroItems";
import { ListarProductos } from "@/feature/productos";
import { PackageSearch, Plus } from "lucide-react-native";
import { useTheme } from "@/theme/useTheme";
import { useState } from "react";
import { ModalAgregarProducto } from "@/feature/productos";

const ProductosScreen = () => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const productos = useProductosStore((state) => state.productos);

  return (
    <ContainerTabs>
      <Header titulo="Tus Productos" />
      <View className="h-5" />
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ListarProductos producto={item} />}
        ListEmptyComponent={
          <CeroItems
            titulo="Sin productos registrados"
            subtitulo="Presione + para registrar"
            Icon={PackageSearch}
          />
        }
        showsVerticalScrollIndicator={false}
      />
      <FAB
        style={{
          position: "absolute",
          bottom: 30,
          right: 26,
          backgroundColor: colors.button_accent,
        }}
        icon={() => <Plus color={colors.button_icon} size={24} />}
        onPress={() => setModalVisible(true)}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalAgregarProducto onClose={() => setModalVisible(false)} />
      </Modal>

      <StatusBar style="auto" />
    </ContainerTabs>
  );
};

export default ProductosScreen;

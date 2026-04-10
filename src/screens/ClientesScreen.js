import { FlatList, Modal, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ContainerTabs } from "@/components/ui/Containers";
import Header from "@/components/ui/Header";
import { CeroItems } from "@/components/ui/CeroItems";
import { PackageSearch, Plus } from "lucide-react-native";
import { useClientesStore } from "@/feature/clientes/useClientesStore";
import { ListarClientes } from "@/feature/clientes";
import { FAB } from "react-native-paper";
import { useTheme } from "@/theme/useTheme";
import { ModalAgregarCliente } from "@/feature/clientes";
import { useState } from "react";

const ClientesScreen = () => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const clientes = useClientesStore((state) => state.clientes);

  return (
    <ContainerTabs>
      <Header titulo="Tus Clientes" />
      <View className="h-5" />
      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ListarClientes cliente={item} />}
        ListEmptyComponent={
          <CeroItems
            titulo="Sin clientes registrados"
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
        <ModalAgregarCliente onClose={() => setModalVisible(false)} />
      </Modal>
      <StatusBar style="auto" />
    </ContainerTabs>
  );
};

export default ClientesScreen;

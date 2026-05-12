import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ContainerTabs } from "@/components/ui/Containers";
import Header from "@/components/ui/Header";
import { VentasTotalesMes } from "@/feature/dashboard";
import { ActividadReciente } from "@/feature/dashboard";


const HomeScreen = () => {
  return (
    <ContainerTabs>
      <Header titulo="Bienvenida de vuelta, Nicole"/>
      <View className="py-8">
      <VentasTotalesMes />
      </View>
      <ActividadReciente/>
      <StatusBar style="auto" />
    </ContainerTabs>
  );
};

export default HomeScreen;

import { Text, ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ContainerTabs } from "@/components/ui/Containers";
import Header from "@/components/ui/Header";
import { useTheme } from "@/theme/useTheme";
import { useMemo, useState } from "react";
import { PeriodoSelecionado } from "@/feature/analytics";
import { useVentasStore } from "@/feature/ventas/useVentasStore";
import { GraficoVentas } from "@/feature/analytics";
import { ShoppingBag } from "lucide-react-native";
import { TopRankings } from "@/feature/analytics";

const AnalisisScreen = () => {
  const { colors } = useTheme();
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState("30");
  const ventas = useVentasStore((state) => state.getVentasOrdenadas());

  const ventasFiltradas = useMemo(() => {
    const dias = parseInt(periodoSeleccionado);
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() - dias);
    return ventas.filter((v) => new Date(v.fecha) >= fechaLimite);
  }, [ventas, periodoSeleccionado]);

  const total = useMemo(() => {
    return ventasFiltradas.reduce((acc, v) => acc + v.monto, 0);
  }, [ventasFiltradas]);

  return (
    <ContainerTabs>
      <Header titulo="Análisis de Venta" />
      <View className="h-5" />
      <PeriodoSelecionado
        periodoSeleccionado={periodoSeleccionado}
        setPeriodoSeleccionado={setPeriodoSeleccionado}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="h-5" />
        <Text className="text-lg" style={{ color: colors.textSecondary }}>
          Ingresos Totales
        </Text>
        <Text className="text-5xl font-semibold" style={{ color: colors.text }}>
          ${total.toLocaleString()}
        </Text>
        <GraficoVentas
          periodoSeleccionado={periodoSeleccionado}
          ventas={ventasFiltradas}
        />
        <View className="h-5" />
        <View
          className="py-6 px-8 rounded-xl"
          style={{ backgroundColor: colors.card }}
        >
          <Text
            className="text-lg pb-3"
            style={{ color: colors.textSecondary }}
          >
            Ventas Totales
          </Text>
          <View className="flex-row gap-2 items-center">
            <ShoppingBag size={28} color={colors.icon} />
            <Text
              className="text-4xl font-semibold"
              style={{ color: colors.text }}
            >
              {ventasFiltradas.length}
            </Text>
          </View>
        </View>
        <TopRankings
          periodoSeleccionado={periodoSeleccionado}
          ventas={ventasFiltradas}
        />
      </ScrollView>

      <StatusBar style="auto" />
    </ContainerTabs>
  );
};

export default AnalisisScreen;

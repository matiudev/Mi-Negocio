import { View, Text, FlatList } from "react-native";
import { useTheme } from "@/theme/useTheme";
import { useVentasStore } from "@/feature/ventas/useVentasStore";
import { CeroItems } from "@/components/ui/CeroItems";
import { ListarVentas } from "@/feature/ventas";
import { PackageSearch } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

const ActividadReciente = () => {
  const { colors } = useTheme();
  const ventas = useVentasStore((state) => state.getVentasOrdenadas());
  const navigation = useNavigation();

  return (
    <View
      style={{ backgroundColor: colors.card, flex: 1 }}
      className="rounded-xl overflow-hidden"
    >
      <View
        className="flex-row items-center justify-between px-4 py-3"
        style={{ borderBottomWidth: 0.5, borderBottomColor: colors.border }}
      >
        <Text className="font-medium text-base" style={{ color: colors.text }}>
          Actividad reciente
        </Text>
        <Text
          className="text-sm"
          style={{ color: colors.textAccent }}
          onPress={() => navigation.navigate("ResumenVentas")}
        >
          Ver todo
        </Text>
      </View>

      <FlatList
        data={ventas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ListarVentas venta={item} />}
        ListEmptyComponent={
          <CeroItems
            titulo="Sin ventas registradas"
            subtitulo="Presione + para registrar"
            Icon={PackageSearch}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ActividadReciente;

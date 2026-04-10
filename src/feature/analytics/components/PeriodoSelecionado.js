import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@/theme/useTheme";

const PeriodoSelecionado = ({
  periodoSeleccionado,
  setPeriodoSeleccionado,
}) => {
  const { colors } = useTheme();
  return (
    <View
      className="flex-row justify-around py-2 px-2 rounded-lg"
      style={{ backgroundColor: colors.cardSecondary }}
    >
      <TouchableOpacity onPress={() => setPeriodoSeleccionado("30")} className="py-2 px-3 rounded-xl" style={{backgroundColor: periodoSeleccionado === "30" ? colors.card : colors.cardSecondary}}>
        <Text
        className="text-sm font-semibold"
          style={{
            color:
              periodoSeleccionado === "30" ? colors.text : colors.textSecondary,
          }}
        >
          Últimos 30 días
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setPeriodoSeleccionado("7")} className="py-2 px-3 rounded-xl" style={{backgroundColor: periodoSeleccionado === "7" ? colors.card : colors.cardSecondary}}>
        <Text
        className="text-sm font-semibold"
          style={{
            color:
              periodoSeleccionado === "7" ? colors.text : colors.textSecondary,
          }}
        >
          Últimos 7 días
        </Text>
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={() => setPeriodoSeleccionado("custom")} className="py-2 px-3 rounded-xl" style={{backgroundColor: periodoSeleccionado === "custom" ? colors.card : colors.cardSecondary}}>
        <Text
        className="text-sm font-semibold"
          style={{
            color:
              periodoSeleccionado === "custom"
                ? colors.text
                : colors.textSecondary,
          }}
        >
          Personalizado
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default PeriodoSelecionado;

import { View, Text, Dimensions } from "react-native";
import { useMemo } from "react";
import { useTheme } from "@/theme/useTheme";

const SCREEN_WIDTH = Dimensions.get("window").width;
const HORIZONTAL_PADDING = 48;
const Y_AXIS_WIDTH = 50;
const CHART_HEIGHT = 180;

const toLocalKey = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const formatLabel = (n) => {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}k`;
  return `$${n}`;
};

const GraficoVentas = ({ periodoSeleccionado, ventas }) => {
  const { colors } = useTheme();
  const chartWidth = SCREEN_WIDTH - HORIZONTAL_PADDING - Y_AXIS_WIDTH;

  const { datosGrafico, maxValor } = useMemo(() => {
    const dias = parseInt(periodoSeleccionado);
    const hoy = new Date();

    // Fecha límite
    const fechaLimite = new Date(hoy);
    if (dias === 7) {
      const diaSemana = hoy.getDay();
      const diasDesdeElLunes = diaSemana === 0 ? 6 : diaSemana - 1;
      fechaLimite.setDate(hoy.getDate() - diasDesdeElLunes);
      fechaLimite.setHours(0, 0, 0, 0);
    } else {
      fechaLimite.setDate(hoy.getDate() - dias);
      fechaLimite.setHours(0, 0, 0, 0);
    }

    // Slots
    const slots = Array.from({ length: dias }, (_, i) => {
      const fecha = new Date(hoy);
      if (dias === 7) {
        const diaSemana = hoy.getDay();
        const diasDesdeElLunes = diaSemana === 0 ? 6 : diaSemana - 1;
        fecha.setDate(hoy.getDate() - diasDesdeElLunes + i);
      } else {
        fecha.setDate(hoy.getDate() - (dias - 1 - i));
      }

      const key = toLocalKey(fecha);
      const label =
        dias === 7
          ? ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"][i]
          : (() => {
              const desdeFin = dias - 1 - i;
              return desdeFin % 5 === 0
                ? `${fecha.getDate()}/${fecha.getMonth() + 1}`
                : "";
            })();

      return { key, label };
    });

    // Totales por día
    const totalesPorDia = {};
    ventas.forEach((v) => {
      if (new Date(v.fecha) >= fechaLimite) {
        const key = toLocalKey(v.fecha);
        totalesPorDia[key] = (totalesPorDia[key] || 0) + v.monto;
      }
    });

    const datosGrafico = slots.map((slot) => ({
      value: totalesPorDia[slot.key] || 0,
      label: slot.label,
    }));

    const valores = datosGrafico.map((d) => d.value).filter((v) => v > 0);
    const maxValor = valores.length > 0 ? Math.max(...valores) : 1000;

    return { datosGrafico, maxValor };
  }, [ventas, periodoSeleccionado, chartWidth, colors]);

  const dias = parseInt(periodoSeleccionado);
  const totalBars = datosGrafico.length;
  const barWidth = dias <= 7 ? 28 : dias <= 14 ? 16 : 7;
  const spacing = Math.floor((chartWidth - barWidth * totalBars) / (totalBars + 1));

  // Líneas guía Y (4 secciones)
  const secciones = [0, 0.25, 0.5, 0.75, 1];

  return (
    <View style={{ marginTop: 16 }}>
      <Text
        style={{
          fontSize: 13,
          color: colors.textSecondary,
          marginBottom: 12,
          fontWeight: "500",
        }}
      >
        Ventas por día
      </Text>

      <View style={{ flexDirection: "row" }}>
        {/* Eje Y */}
        <View
          style={{
            width: Y_AXIS_WIDTH,
            height: CHART_HEIGHT,
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingRight: 6,
          }}
        >
          {[...secciones].reverse().map((s, i) => (
            <Text key={i} style={{ fontSize: 9, color: colors.textSecondary }}>
              {formatLabel(Math.round(maxValor * s))}
            </Text>
          ))}
        </View>

        {/* Área del gráfico */}
        <View style={{ flex: 1 }}>
          {/* Líneas guía */}
          <View style={{ height: CHART_HEIGHT, position: "relative" }}>
            {secciones.map((s, i) => (
              <View
                key={i}
                style={{
                  position: "absolute",
                  bottom: CHART_HEIGHT * s,
                  left: 0,
                  right: 0,
                  height: 1,
                  borderTopWidth: 1,
                  borderStyle: "dashed",
                  borderColor: i === 0 ? colors.border : colors.border + "66",
                }}
              />
            ))}

            {/* Barras */}
            <View
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                flexDirection: "row",
                alignItems: "flex-end",
                paddingHorizontal: spacing,
              }}
            >
              {datosGrafico.map((item, index) => {
                const heightPct = maxValor > 0 ? item.value / maxValor : 0;
                const barHeight = Math.max(heightPct * CHART_HEIGHT, item.value > 0 ? 2 : 0);

                return (
                  <View
                    key={index}
                    style={{
                      width: barWidth,
                      height: barHeight,
                      backgroundColor: item.value > 0 ? colors.primary ?? "#378ADD" : "transparent",
                      borderRadius: 3,
                      marginHorizontal: spacing / 2,
                    }}
                  />
                );
              })}
            </View>
          </View>

          {/* Eje X - labels */}
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: spacing,
              marginTop: 4,
            }}
          >
            {datosGrafico.map((item, index) => (
              <View
                key={index}
                style={{
                  width: barWidth,
                  marginHorizontal: spacing / 2,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 9, color: colors.textSecondary }}>
                  {item.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default GraficoVentas;
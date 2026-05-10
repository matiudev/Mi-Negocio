import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useMemo, useState } from "react";
import { X, PackageSearch, ShoppingBag, ChevronDown, BadgeCheck, Hourglass, Eye, EyeOff } from "lucide-react-native";
import Header from "@/components/ui/Header";
import { ContainerStack } from "@/components/ui/Containers";
import { useVentasStore } from "@/feature/ventas/useVentasStore";
import { useTheme } from "@/theme/useTheme";
import { ListarVentas } from "@/feature/ventas";
import { CeroItems } from "@/components/ui/CeroItems";
import { ModalSelectorFecha } from "@/components/ModalSelectorFecha";
import { ModalSelectorClientes } from "@/feature/clientes";
import { fechaFormateada } from "@/utils/formatDato";


// ── Botón de filtro ───────────────────────────────────────────────────────────
const FiltroBadge = ({ label, valor, onPress, onClear, colors }) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-1 flex-row items-center justify-between py-2 px-3 rounded-xl border-2 gap-1"
    style={{
      borderColor: valor ? colors.button_accent : colors.text + "30",
      backgroundColor: valor ? colors.button_accent + "18" : "transparent",
    }}
  >
    <View className="flex-row items-center gap-1 flex-1">
      <ChevronDown size={14} color={valor ? colors.button_accent : colors.textPlaceHolder} />
      <Text
        numberOfLines={1}
        style={{
          fontSize: 13,
          fontWeight: valor ? "600" : "400",
          color: valor ? colors.button_accent : colors.textPlaceHolder,
          flex: 1,
        }}
      >
        {valor || label}
      </Text>
    </View>
    {valor && (
      <TouchableOpacity onPress={onClear} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <X size={13} color={colors.button_accent} />
      </TouchableOpacity>
    )}
  </TouchableOpacity>
);

const ResumenVentas = () => {
  const { colors } = useTheme();
  const ventas = useVentasStore((state) => state.getVentasOrdenadas());

  const [clienteFiltro, setClienteFiltro] = useState(null);
  const [fechaDesde, setFechaDesde] = useState(null);
  const [fechaHasta, setFechaHasta] = useState(null);
  const [mostrarPagadas, setMostrarPagadas] = useState(false);

  const [modalClienteVisible, setModalClienteVisible] = useState(false);
  const [modalFechaVisible, setModalFechaVisible] = useState(false);

  // ── Base filtrada por cliente y fecha (para la tarjeta de totales) ────────
  const ventasBase = useMemo(() => {
    return ventas.filter((v) => {
      if (clienteFiltro && v.id_cliente !== clienteFiltro.id) return false;
      const fechaVenta = v.fecha.slice(0, 10);
      if (fechaDesde && fechaVenta < fechaFormateada(fechaDesde)) return false;
      if (fechaHasta && fechaVenta > fechaFormateada(fechaHasta)) return false;
      return true;
    });
  }, [ventas, clienteFiltro, fechaDesde, fechaHasta]);

  // ── Lista: aplica además el filtro de pagado ──────────────────────────────
  const ventasFiltradas = useMemo(
    () => mostrarPagadas ? ventasBase : ventasBase.filter((v) => !v.pagado),
    [ventasBase, mostrarPagadas]
  );

  // ── Montos: siempre sobre ventasBase para reflejar la realidad financiera ─
  const montoTotal = useMemo(
    () => ventasBase.reduce((acc, v) => acc + (v.monto ?? 0), 0),
    [ventasBase]
  );

  const montoPagado = useMemo(
    () => ventasBase.filter((v) => v.pagado).reduce((acc, v) => acc + (v.monto ?? 0), 0),
    [ventasBase]
  );

  const montoPendiente = useMemo(
    () => ventasBase.filter((v) => !v.pagado).reduce((acc, v) => acc + (v.monto ?? 0), 0),
    [ventasBase]
  );

  // ── Label del filtro fecha ────────────────────────────────────────────────
  const labelFecha = useMemo(() => {
    if (fechaDesde && fechaHasta) return `${fechaFormateada(fechaDesde)} – ${fechaFormateada(fechaHasta)}`;
    if (fechaDesde) return `Desde ${fechaFormateada(fechaDesde)}`;
    if (fechaHasta) return `Hasta ${fechaFormateada(fechaHasta)}`;
    return null;
  }, [fechaDesde, fechaHasta]);

  const hayFiltroFecha = fechaDesde || fechaHasta;

  return (
    <ContainerStack>
      <Header titulo="Resumen de Ventas" profile={false} />
      <View className="h-6" />

      {/* ── Tarjeta de monto total ── */}
      <View className="py-6 px-8 rounded-xl" style={{ backgroundColor: colors.button_accent }}>
        <Text className="text-lg pb-3" style={{ color: colors.button_text }}>
          {clienteFiltro || hayFiltroFecha ? "Ganancias (filtradas)" : "Ganancias Totales"}
        </Text>
        <View className="flex-row gap-2 items-center">
          <ShoppingBag size={28} color={colors.button_icon} />
          <Text className="text-4xl font-semibold" style={{ color: colors.button_text }}>
            ${montoTotal.toLocaleString("es-CL")}
          </Text>
        </View>

        {/* ── Desglose pagado / pendiente ── */}
        <View style={{ flexDirection: "row", gap: 16, marginTop: 10 }}>
          <View className= "flex-row gap-1">
            <BadgeCheck color="white" size={18} />
            <Text style={{ color: colors.button_text, fontSize: 13}}>Pagado: ${montoPagado.toLocaleString("es-CL")}</Text>
          </View>
          <View className= "flex-row gap-1">
            <Hourglass color="white" size={18} />
            <Text style={{ color: colors.button_text, fontSize: 13}}>Pendiente: ${montoPendiente.toLocaleString("es-CL")}</Text>
          </View>
        </View>

        <Text style={{ color: colors.button_text, opacity: 0.7, fontSize: 13, marginTop: 6 }}>
          {ventasBase.length} venta{ventasBase.length !== 1 ? "s" : ""}
        </Text>
      </View>

      <View className="h-6" />

      {/* ── Filtros ── */}
      <Text style={{ color: colors.textPlaceHolder, fontSize: 12, fontWeight: "600", marginBottom: 8, letterSpacing: 0.5 }}>
        FILTROS
      </Text>
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
        <FiltroBadge
          label="Cliente"
          valor={clienteFiltro?.nombre}
          onPress={() => setModalClienteVisible(true)}
          onClear={() => setClienteFiltro(null)}
          colors={colors}
        />
        <FiltroBadge
          label="Fecha"
          valor={labelFecha}
          onPress={() => setModalFechaVisible(true)}
          onClear={() => { setFechaDesde(null); setFechaHasta(null); }}
          colors={colors}
        />
        <TouchableOpacity
          onPress={() => setMostrarPagadas(!mostrarPagadas)}
          className="flex-row items-center gap-1.5 py-2 px-3 rounded-xl border-2"
          style={{
            borderColor: mostrarPagadas ? colors.button_accent : colors.text + "30",
            backgroundColor: mostrarPagadas ? colors.button_accent + "18" : "transparent",
          }}
        >
          {mostrarPagadas
            ? <EyeOff size={14} color={colors.button_accent} />
            : <Eye size={14} color={colors.textPlaceHolder} />
          }
          <Text style={{
            fontSize: 13,
            fontWeight: mostrarPagadas ? "600" : "400",
            color: mostrarPagadas ? colors.button_accent : colors.textPlaceHolder,
          }}>
            {mostrarPagadas ? "Todas" : "Pendientes"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* ── Lista de ventas ── */}
      <FlatList
        data={ventasFiltradas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ListarVentas venta={item} mostrarPago={true} />}
        ListEmptyComponent={
          <CeroItems
            titulo={mostrarPagadas ? "Sin ventas registradas" : "Sin ventas pendientes"}
            subtitulo={
              !mostrarPagadas
                ? "Todas las ventas están pagadas"
                : clienteFiltro || hayFiltroFecha
                ? "No hay ventas con estos filtros"
                : "Presione + para registrar"
            }
            Icon={PackageSearch}
          />
        }
        showsVerticalScrollIndicator={false}
      />

      {/* ── Modales ── */}
      <ModalSelectorClientes
        visible={modalClienteVisible}
        onClose={() => setModalClienteVisible(false)}
        onSelect={setClienteFiltro}
        colors={colors}
      />
      <ModalSelectorFecha
        visible={modalFechaVisible}
        onClose={() => setModalFechaVisible(false)}
        desde={fechaDesde}
        hasta={fechaHasta}
        onChangeDesdde={setFechaDesde}
        onChangeHasta={setFechaHasta}
        colors={colors}
      />
    </ContainerStack>
  );
};

export default ResumenVentas;
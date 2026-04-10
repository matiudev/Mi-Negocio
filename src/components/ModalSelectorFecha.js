import { Modal, Text, TouchableOpacity, View, Platform } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { X, Calendar } from 'lucide-react-native';
import { fechaFormateada } from '@/utils/formatDato';

export const ModalSelectorFecha = ({ visible, onClose, desde, hasta, onChangeDesdde, onChangeHasta, colors }) => {
  const [pickerActivo, setPickerActivo] = useState(null);

  const handleChange = (_, date) => {
    if (!date) { setPickerActivo(null); return; }
    if (pickerActivo === "desde") onChangeDesdde(date);
    else onChangeHasta(date);
    if (Platform.OS !== "ios") setPickerActivo(null);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "flex-end" }}>
        <TouchableOpacity style={{ flex: 1 }} onPress={onClose} />
        <View style={{ backgroundColor: colors.background, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 }}>
          {/* Pill */}
          <View style={{ width: 40, height: 4, backgroundColor: colors.text, opacity: 0.3, borderRadius: 2, alignSelf: "center", marginBottom: 16 }} />
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <Text style={{ color: colors.text, fontSize: 17, fontWeight: "600" }}>Filtrar por Fecha</Text>
            <TouchableOpacity onPress={onClose}><X color={colors.text} size={20} /></TouchableOpacity>
          </View>

          {/* Selector Desde */}
          <Text style={{ color: colors.textPlaceHolder, fontSize: 12, marginBottom: 6 }}>DESDE</Text>
          <TouchableOpacity
            onPress={() => setPickerActivo("desde")}
            style={{ flexDirection: "row", alignItems: "center", gap: 10, padding: 14, borderRadius: 12, borderWidth: 1.5, borderColor: pickerActivo === "desde" ? colors.button_accent : colors.text + "30", marginBottom: 14 }}
          >
            <Calendar size={16} color={colors.textPlaceHolder} />
            <Text style={{ color: desde ? colors.text : colors.textPlaceHolder, fontSize: 15 }}>
              {desde ? fechaFormateada(desde) : "Seleccionar"}
            </Text>
          </TouchableOpacity>

          {/* Selector Hasta */}
          <Text style={{ color: colors.textPlaceHolder, fontSize: 12, marginBottom: 6 }}>HASTA</Text>
          <TouchableOpacity
            onPress={() => setPickerActivo("hasta")}
            style={{ flexDirection: "row", alignItems: "center", gap: 10, padding: 14, borderRadius: 12, borderWidth: 1.5, borderColor: pickerActivo === "hasta" ? colors.button_accent : colors.text + "30", marginBottom: 20 }}
          >
            <Calendar size={16} color={colors.textPlaceHolder} />
            <Text style={{ color: hasta ? colors.text : colors.textPlaceHolder, fontSize: 15 }}>
              {hasta ? fechaFormateada(hasta) : "Seleccionar"}
            </Text>
          </TouchableOpacity>

          {/* DateTimePicker inline */}
          {pickerActivo && (
            <DateTimePicker
              value={(pickerActivo === "desde" ? desde : hasta) ?? new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "inline" : "default"}
              onChange={handleChange}
              maximumDate={pickerActivo === "desde" ? (hasta ?? undefined) : undefined}
              minimumDate={pickerActivo === "hasta" ? (desde ?? undefined) : undefined}
            />
          )}

          {/* Botón aplicar */}
          <TouchableOpacity
            onPress={onClose}
            style={{ backgroundColor: colors.button_accent, borderRadius: 14, padding: 15, alignItems: "center", marginBottom: 20 }}
          >
            <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>Aplicar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
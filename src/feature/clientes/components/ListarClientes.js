// ListarVentas.jsx
import { View, Text } from 'react-native'
import { Pencil, User } from 'lucide-react-native'
import { useTheme } from "@/theme/useTheme"

const ListarClientes = ({ cliente }) => {
  const { colors } = useTheme()

  return (
    <View
      className="flex-row items-center gap-3 py-3"
      style={{ borderBottomWidth: 0.5, borderBottomColor: colors.border }}
    >
      <View
        className="w-10 h-10 rounded-full items-center justify-center"
        style={{ backgroundColor: colors.primaryLight }}
      >
        <User size={18} color={colors.primary} />
      </View>

      <View className="flex-1 gap-0.5">
        <View className="flex-row items-center justify-between">
          <View>
          <Text className="font-medium text-base" style={{ color: colors.text }}>
            {cliente.nombre}
          </Text>
          </View>
          <Pencil size={16} color={colors.icon} />
        </View>
      </View>
    </View>
  )
}

export default ListarClientes;
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IconLucide from "@/components/IconLucide";
import { useTheme } from "../theme/useTheme";
import ClientesScreen from "@/screens/ClientesScreen";
import ProductosScreen from "@/screens/ProductosScreen";
import AnalisisScreen from "@/screens/AnalisisScreen";
import HomeScreen from "@/screens/HomeScreen";


// Crea los navegadores
const Tab = createBottomTabNavigator();

// --- Tabs principales (navbar inferior) ---
function TabNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.icon,
        tabBarInactiveTintColor: colors.iconSecondary,
        tabBarStyle: {
          backgroundColor: colors.card,
          paddingTop: 8,
          height: 75
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "LayoutDashboard" : "LayoutDashboard";
          } else if (route.name === "Analisis") {
            iconName = focused ? "ChartNoAxesCombined" : "ChartNoAxesCombined";
          } else if (route.name === "Productos") {
            iconName = focused ? "Archive" : "Archive";
          } else if (route.name === "Clientes") {
            iconName = focused ? "Users" : "Users";
          }

          return <IconLucide name={iconName} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Inicio" }}
      />
        <Tab.Screen
          name="Analisis"
          component={AnalisisScreen}
          options={{ title: "Analisis" }}
        />
      <Tab.Screen
        name="Productos"
        component={ProductosScreen}
        options={{ title: "Productos" }}
      />
            <Tab.Screen
        name="Clientes"
        component={ClientesScreen}
        options={{ title: "Clientes" }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
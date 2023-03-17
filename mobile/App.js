import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "./src/screens/LoginScreen";
import DriverScreen from "./src/screens/DriverScreen";
import FleetScreen from "./src/screens/FleetScreen";
import MaintenanceScreen from "./src/screens/MaintenanceScreen";
import OperationScreen from "./src/screens/OperationScreen";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Index" component={Index}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 export function Index() {
  return(
      <Tab.Navigator>
        <Tab.Screen name="Motorista" component={DriverScreen}/>
        <Tab.Screen name="Frota" component={FleetScreen}/>
        <Tab.Screen name="Manutenção" component={MaintenanceScreen}/>
        <Tab.Screen name="Operação" component={OperationScreen}/>
      </Tab.Navigator>
  );
 }
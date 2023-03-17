import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from "./src/screens/LoginScreen";
import DriverScreen from "./src/screens/DriverScreen";
import FleetScreen from "./src/screens/FleetScreen";
import MaintenanceScreen from "./src/screens/MaintenanceScreen";
import OperationScreen from "./src/screens/OperationScreen";

const Stack = createNativeStackNavigator();

// quando utilizar o simulador, máquina virtual, deve-se substituir o localhost da uri pelo ip da máquina (cmd - ipconfig)

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OperationScreen">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="DriverScreen" component={DriverScreen} />
        <Stack.Screen name="FleetScreen" component={FleetScreen} />
        <Stack.Screen name="MaintenanceScreen" component={MaintenanceScreen} />
        <Stack.Screen name="OperationScreen" component={OperationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// Recomendação de utilizar post para o login, criando um endpoint no backend utilizando uma query(Select) com where para comparar os dados enviados via body

import MainScreen from './app/screens/MainScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InventoryScreen from './app/screens/InventoryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
        name="Main Screen"
        component={MainScreen}/>
        
        <Stack.Screen 
        name="Inventory Screen"
        component={InventoryScreen}/>

      </Stack.Navigator>
    </NavigationContainer>

  );
}

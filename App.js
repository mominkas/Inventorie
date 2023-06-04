import MainScreen from './app/screens/MainScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InventoryScreen from './app/screens/InventoryScreen';
import EditingModal from './app/screens/EditingModal';
import StartScreen from './app/screens/StartScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import LoginScreen from './app/screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start Screen" screenOptions={{ headerShown: false }}>
        
      <Stack.Screen name="Start Screen" component={StartScreen} />
      <Stack.Screen name="Login Screen" component={LoginScreen} />
      <Stack.Screen name="Register Screen" component={RegisterScreen} />
      <Stack.Screen name="Main Screen" component={MainScreen}/>
      <Stack.Screen name="Inventory Screen" component={InventoryScreen}/>
      <Stack.Screen name="Editing Screen" component={EditingModal}/>   

      </Stack.Navigator>
    </NavigationContainer>

  );
}

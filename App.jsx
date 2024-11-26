import DetalheShowScreen from './screens/DetalhesShow';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import EmCartazScreen from './screens/EmCartazScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        options={{ title: 'Início' }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="detalhes"
        options={{ title: 'Detalhes' }}
        component={DetalheShowScreen} // Rota acessível somente pela navegação interna
      />
    </Stack.Navigator>
  );
}
//PB_MyFilmeFlix-react_native
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="HomeStack"
          options={{ title: 'Início' }}
          component={HomeStack} // Stack contendo Home e Detalhes
        />
        <Drawer.Screen
          name="emCartaz"
          options={{ title: 'Em Cartaz' }}
          component={EmCartazScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
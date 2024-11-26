import { NavigationContainer, useNavigation  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import EmCartazScreen from './screens/EmCartazScreen';
import DetalheShowScreen from './screens/DetalhesShow';
import { MaterialIcons } from '@expo/vector-icons';
// import { FontAwesome } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
   return (
    <NavigationContainer>
      <Drawer.Navigator
         screenOptions={{
            headerStyle: { backgroundColor: '#4CAF50'},// Cor de fundo do cabeçalho
            headerTintColor: '#e5e5e5', // Cor dos textos e ícones no cabeçalho
            drawerStyle: {
               backgroundColor: '#141414', // Cor de fundo do Drawer
               color: "#e5e5e5",
            },
            drawerActiveTintColor: '#ffffff', 
            drawerInactiveTintColor: '#ffffff',
            drawerActiveBackgroundColor: '#4CAF50',
         }}     
      >

         {/* Tela Home */}
         <Drawer.Screen
            name="home"
            component={HomeScreen} // Stack contendo Home e Detalhes
            options={{ title: 'Início',
               drawerIcon: () => (
                  <MaterialIcons name="home" size={24} color='black' />
               ),               
             }}
         />

         {/* Tela Em Cartaz */}
         <Drawer.Screen
            name="emCartaz"
            options={{ title: 'Em Cartaz' }}
            component={EmCartazScreen}
         />

         {/* Tela Detalhes */}
         <Drawer.Screen
            name="detalhes" 
            component={DetalheShowScreen} 
            options={({ navigation }) => ({
               title: 'Detalhes',
               drawerLabel: () => null,      // Oculta a opção no Drawer
               headerRight: () => (
                 <MaterialIcons
                   name="home"
                   size={24}
                   color="black"
                   style={{ marginRight: 15 }}
                   onPress={() => navigation.navigate('home')} // Navega para a tela Home
                 />
               ),
             })}
         />
      </Drawer.Navigator>
    </NavigationContainer>
   );
}
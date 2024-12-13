import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TextInput, View, StyleSheet, Dimensions  } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';  // Importando o useNavigation
import { useState } from 'react';
import { AppProvider, useAppContext } from './Context'; 
import styles from './AppStyle';
import HomeScreen from './screens/HomeScreen';
import EmCartazScreen from './screens/EmCartazScreen';
import DetalheShowScreen from './screens/DetalhesShow';
import AuthenticationScreen from './screens/AuthenticationScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const screenWidth = Dimensions.get('window').width;

export default function App() {
  return (
   <AppProvider>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         {/* <Stack.Screen name="authentication" component={AuthenticationScreen} /> */}
         <Stack.Screen name="principal" component={DrawerNavigator} />
      </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
} 

function DrawerNavigator() {   
   const navigation = useNavigation();
   const { filtro, setFiltro } = useAppContext();
   const [searchInput, setSearchInput] = useState(''); 

   // Função de logout
   const logout = () => {
      // Limpar o sessionId do armazenamento (localStorage, sessionStorage, ou estado)
      sessionStorage.removeItem('sessionId'); // Se estiver usando sessionStorage

      // Redirecionar para a tela de autenticação imediatamente após limpar a sessão
      navigation.reset({
         index: 0,
         routes: [{ name: 'authentication' }], // Nome da tela de autenticação
      });
   };

   return (
      <Drawer.Navigator
         screenOptions={{
         headerStyle: { backgroundColor: '#4CAF50' }, // Cor de fundo do cabeçalho
         headerTintColor: '#e5e5e5', // Cor dos textos e ícones no cabeçalho
         drawerStyle: {
            backgroundColor: '#141414', // Cor de fundo do Drawer
            color: '#e5e5e5',
         },
         drawerActiveTintColor: '#ffffff',
         drawerInactiveTintColor: '#ffffff',
         drawerActiveBackgroundColor: '#4CAF50',
         headerTitle: () => (
            <View style={styles.searchContainer}>
            <TextInput
               style={styles.searchInput}
               placeholder="Buscar..."
               placeholderTextColor="#cccccc"
               value={filtro}
               onChangeText={(text) => setFiltro(text)}
            />
            </View>
         ),
         }}
      >
         <Drawer.Screen
            name="home"
            component={HomeScreen}
            options={{
               title: 'Início',
               drawerIcon: () => <MaterialIcons name="home" size={24} color="black" />,
            }}
         />
         <Drawer.Screen
            name="emCartaz"
            component={EmCartazScreen}
            options={{ title: 'Em Cartaz' }}
         />
         <Drawer.Screen
            name="detalhes"
            component={DetalheShowScreen}
            options={({ navigation }) => ({
               title: 'Detalhes',
               drawerLabel: () => null, // Oculta a opção no Drawer
               headerRight: () => (
                  <MaterialIcons
                  name="home"
                  size={24}
                  color="black"
                  style={{ marginRight: 15 }}
                  onPress={() => navigation.navigate('home')}
                  />
               ),                    
               unmountOnBlur: true,  // Impede o usuário de acessar a tela de Detalhes via navegação direta          
               drawerItemStyle: { display: 'none' }, // Impede que o Drawer apareça quando tentando acessar a tela Detalhes
            })}
         />    
         {/* <Drawer.Screen
         name="logout"
         options={{
            drawerIcon: () => (
               <AntDesign
               name="logout"
               size={24}
               color="#fff"
               onPress={logout}  // Chama a função logout diretamente ao clicar no ícone
               />
            ),
            drawerLabel: () => null,  // Remove a label (não exibe o texto)
         }}
         /> */}
      </Drawer.Navigator>
   );
}



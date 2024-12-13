import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Linking } from 'react-native';
import config from '../../../config';

export default function AuthenticationScreen() {
   const [requestToken, setRequestToken] = useState(null);
   const [sessionId, setSessionId] = useState(null);
   const [loading, setLoading] = useState(false);

   const API_URL = 'https://api.themoviedb.org/3';
   const BEARER_TOKEN = config.API_TOKEN; // Substitua pelo seu Bearer Token

   // 1. Obter o Request Token
   const fetchRequestToken = async () => {
      setLoading(true);
      try {
         const response = await fetch(`${API_URL}/authentication/token/new`, {
         method: 'GET',
         headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${BEARER_TOKEN}`,
         },
         });

         const data = await response.json();
         if (data.success) {
         setRequestToken(data.request_token);
         } else {
         console.error('Erro ao obter request token:', data.status_message);
         }
      } catch (error) {
         console.error('Erro ao buscar request token:', error);
      } finally {
         setLoading(false);
      }
   };

   // 2. Redirecionar o usuário para autorização (mantido para permitir o processo manual)
   const redirectToAuthorization = () => {
      if (requestToken) {
         const authUrl = `https://www.themoviedb.org/authenticate/${requestToken}`;
         Linking.canOpenURL(authUrl)
         .then((supported) => {
            if (supported) {
               Linking.openURL(authUrl).catch((err) => console.error('Erro ao abrir URL:', err));
            } else {
               console.error('Não foi possível abrir a URL');
            }
         })
         .catch((err) => console.error('Erro ao verificar URL:', err));
      } else {
         console.error('Nenhum request token disponível.');
      }
   };   

   // 3. Trocar Request Token pelo Session ID
   const fetchSessionId = async () => {
      if (!requestToken) {
         console.error('Você precisa obter e autorizar o token primeiro.');
         return;
      }

      setLoading(true);
      try {
         const response = await fetch(`${API_URL}/authentication/session/new`, {
         method: 'POST',
         headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${BEARER_TOKEN}`,
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ request_token: requestToken }),
         });

         const data = await response.json();
         if (data.success) {
         setSessionId(data.session_id);
         } else {
         console.error('Erro ao obter session ID:', data.status_message);
         }
      } catch (error) {
         console.error('Erro ao buscar session ID:', error);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchRequestToken(); // Obtém o request token assim que o componente é montado
   }, []);

   const obterSessionId = async () => {
      redirectToAuthorization();
   
      // Aguarde o usuário autorizar a autenticação antes de pegar o session ID
      if (requestToken) {
         // O requestToken é obtido e autorizado antes de fazer o fetch para obter o session ID
         await fetchSessionId();
   
         // Se o session ID for obtido com sucesso, redirecione para a tela HomeScreen
         if (sessionId) {
            navigation.navigate('home');
         }
      } else {
         console.error('Erro ao obter request token. O processo de autorização não foi concluído.');
      }
   };

   // Retorne apenas o session ID
   if (sessionId) {
      return (
         <View style={styles.container}>
         <Text style={styles.sessionId}>Session ID: {sessionId}</Text>
         </View>
      );
   }

   // Se não houver sessionId, mostra o botão para redirecionamento e status de carregamento
   return (
      <View style={styles.container}>      
         <Button
            title="Autorizar no TMDb"
            onPress={obterSessionId}
            disabled={!requestToken}
         />
         {/* <Button
         title="Autorizar no TMDb"
         onPress={redirectToAuthorization}
         disabled={!requestToken}
         /> */}
         {/* <Button
         title="Obter Session ID"
         onPress={fetchSessionId}
         disabled={!requestToken || loading}
         /> */}
         {loading && <Text style={styles.loading}>Carregando...</Text>}
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#141414',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
   },
   title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#e5e5e5',
      marginBottom: 10,
   },
   sessionId: {
      marginTop: 20,
      fontSize: 16,
      color: '#4caf50',
   },
   loading: {
      marginTop: 10,
      fontSize: 14,
      color: '#ff9800',
   },
});

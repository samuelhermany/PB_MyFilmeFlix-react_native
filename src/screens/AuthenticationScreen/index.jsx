import React, { useEffect, useState } from 'react';
import { View, Text, Button, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importando navigation
import config from '../../config';
import styles from './indexStyle.js';

export default function AuthenticationScreen() {
   const [requestToken, setRequestToken] = useState(null);
   const [sessionId, setSessionId] = useState(null);
   const [loading, setLoading] = useState(false);
   const [buttonTitle, setButtonTitle] = useState("Autorizar no TMDb");

   const API_URL = 'https://api.themoviedb.org/3';
   const BEARER_TOKEN = config.API_TOKEN; // Substitua pelo seu Bearer Token

   const navigation = useNavigation(); // Usando useNavigation para navegar

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

   // 2. Redirecionar o usuário para autorização
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

   useEffect(() => {
      if (sessionId) {
         // Log para verificação do sessionId
         console.log('Session ID obtido:', sessionId);
         navigation.navigate('home');
      }
   }, [sessionId]); // Usando o useEffect para redirecionar quando sessionId for atualizado

   // Função que verifica se o sessionId foi obtido e faz o redirecionamento
   const obterSessionId = async () => {
      if (sessionId) {
         // Já tem sessionId, então redireciona para a tela home
         console.log('Redirecionando para a HomeScreen');
         navigation.navigate('home');
         return;
      }

      if (buttonTitle !== "Entrar") {
         // O botão estava na fase de autorização, então vai autorizar
         redirectToAuthorization();
         setButtonTitle("Entrar");
      }

      // Aguarda o usuário autorizar a autenticação antes de pegar o session ID
      if (requestToken) {
         // O requestToken é obtido e autorizado antes de fazer o fetch para obter o session ID
         await fetchSessionId();

         // Se o session ID for obtido com sucesso, redirecione para a tela HomeScreen
         if (sessionId) {
            console.log('Redirecionando para a HomeScreen após obter sessionId');
            navigation.navigate('home');
         }
      } else {
         console.error('Erro ao obter request token. O processo de autorização não foi concluído.');
      }
   };

   // Se não houver sessionId, mostra o botão para redirecionamento e status de carregamento
   return (
      <View style={styles.container}>
          {/* Se já tiver sessionId, não exiba nada relacionado a ele */}
          {!sessionId ? (
            <>
                <Button
                  title={buttonTitle}
                  onPress={obterSessionId}
                  disabled={!requestToken}
                />
                {loading && <Text style={styles.loading}>Carregando...</Text>}
            </>
          ) : (
            // O conteúdo aqui será ignorado, pois já está navegando para a HomeScreen
            null
          )}
      </View>
   );
}
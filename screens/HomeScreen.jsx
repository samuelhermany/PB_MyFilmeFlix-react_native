import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { VITE_IMG_URL, VITE_API_KEY, VITE_API_URL, VITE_API_URL_MOVIE, VITE_IMG_154 } from '@env';
import { Card } from '../components/Card';

export default function HomeScreen() {
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(true); // Para mostrar um carregando enquanto aguarda a resposta
//   const url = `${VITE_API_URL}top_rated?${VITE_API_KEY}`;

   // Função para buscar os filmes com melhor avaliação
   const getTopRatedMovies = async () => {
      try {
         const options = {
            method: 'GET',
            headers: {
               accept: 'application/json',
               Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjg1MTUyN2RkNjRhOThiNWViMjJkNGQ2NzMzYjllZiIsIm5iZiI6MTcyODIzMTQwMC4wNzc2MDEsInN1YiI6IjY3MDJiNWIyZmEzZTY5ZTBlZjdkNDM3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SmfRY64PofmHH4AnI_zWK7HyrzSwyMhSjI5S_0AYtFE'
            }
         };
   
         // A chamada da API
         const res = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);  
   
         const data = await res.json();  // Aguarda o retorno da resposta como JSON
         setTopMovies(data.results);  // Atualiza o estado com os filmes
      } catch (error) {
         console.error('Erro ao buscar filmes:', error);
      } finally {
         setLoading(false); // Desativa o loading após a resposta
      }
   };

   useEffect(() => {
      getTopRatedMovies();  // Chama a função ao montar o componente
   }, []);

   // Função de renderização para cada item no FlatList
   const renderItem = ({ item }) => (
      <View style={styles.cardContainer}>
         <Card movie={item} />
      </View>
   );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Top Filmes</Text>
      { topMovies && topMovies.length > 0 ? (
         <FlatList
            data={topMovies}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2} // Define 3 colunas por linha
            columnWrapperStyle={styles.row} // Define o estilo da linha
         />
      ) : (
         <Text>Não há filmes para exibir.</Text>  // Caso não haja filmes
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#141414',
      padding: 10,
   },
   title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
      color: '#e5e5e5',
   },
   movieContainer: {
      marginVertical: 10,
      padding: 15,
      backgroundColor: '#f8f8f8',
      borderRadius: 8,
   },
   movieTitle: {
      fontSize: 18,
      fontWeight: 'bold',
   },
   cardContainer: {
      flex: 1,
      margin: 5,
   },
});

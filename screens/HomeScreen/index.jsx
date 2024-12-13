import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, ScrollView } from 'react-native';
import { Card } from '../../components/Card';
import styles from "./indexStyle";

export default function HomeScreen() {
  const [filmes, setFilmes] = useState([]);
  const [filmesFiltrados, setFilmesFiltrados] = useState([]);;
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('');


  const getTopRatedMovies = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjg1MTUyN2RkNjRhOThiNWViMjJkNGQ2NzMzYjllZiIsIm5iZiI6MTcyODIzMTQwMC4wNzc2MDEsInN1YiI6IjY3MDJiNWIyZmEzZTY5ZTBlZjdkNDM3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SmfRY64PofmHH4AnI_zWK7HyrzSwyMhSjI5S_0AYtFE',
        },
      };

      const res = await fetch(
        'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
        options
      );

      const data = await res.json();
      setFilmes(data.results);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Carregamento inicial para popular os filmes
   useEffect(() => {
      getTopRatedMovies();    
   }, []);

   const aplicarFiltro = () => {      
      const filtrados = filmes.filter((item) =>
         item.title.toLowerCase().includes(filtro.toLowerCase())
      );

      setFilmesFiltrados(filtrados);
   }
   // Atualziando a lista de filmes conforme txto de busca
   useEffect(() => {
      aplicarFiltro();    
   }, [filtro]);

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <Card movie={item} />
    </View>
  );

   return (
      <View>
         <TextInput
            style={styles.searchInput}
            placeholder="Buscar..."
            placeholderTextColor="#cccccc"
            value={filtro}
            onChangeText={(text) => setFiltro(text)}
         />
         <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
            <Text style={styles.title}>Top Filmes</Text>    
            <FlatList
            data={filmesFiltrados}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.container}
            ListEmptyComponent={
               loading ? (
                  <Text style={styles.loading}>Carregando...</Text>
               ) : (
                  <Text style={styles.empty}>Não há filmes para exibir.</Text>
               )
            }
            />
         </ScrollView>
      </View>
   );
}
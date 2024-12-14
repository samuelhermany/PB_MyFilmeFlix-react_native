import React from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { Card } from '../../components/Card';
import { useAppContext } from '../../Context'; // Importa o hook do contexto
import styles from './indexStyle';

export default function HomeScreen() {
  const { filmesFiltrados, loading, filtro, setFiltro } = useAppContext();

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <Card movie={item} />
    </View>
  );

  return (
    <View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
      >
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

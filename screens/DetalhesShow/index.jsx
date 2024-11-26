import { View , Text, StyleSheet, Image } from 'react-native';
import Styles from './indexStyle';
import { VITE_IMG_URL, VITE_API_KEY, VITE_API_URL, VITE_API_URL_MOVIE, VITE_IMG_154 } from '@env';

export default function DetalheShowScreen({ route }) {
   const { movie } = route.params;
   const { title: titulo, overview: sinopse, runtime: duracao, genres: generos, release_date: data_lancamento, adult, production_countries } = movie;

   //  title: titulo,
   //  overview: sinopse,
   //  runtime: duracao,
   //  genres,
   //  release_date,
   //  adult,
   //  production_countries,
   return (
      <View style={Styles.container}>
         <View style={Styles.imageContainer}>
            <Image
               style={styles.image1}
               source={{ uri: `${VITE_IMG_URL}${movie.poster_path}`}}
            />
         </View>
         <View>
            <Text style={Styles.header2}>{titulo}</Text>
            <Text style={Styles.header3}>{sinopse}</Text>
            <Text style={Styles.text}>Duração: {duracao} minutos</Text>
            <Text style={Styles.text}>Gêneros: {generos?.map(genre => genre.name).join(', ')}</Text>
            <Text style={Styles.text}>Lançamento: {data_lancamento}</Text>
            <Text style={Styles.text}>Países de produção: {production_countries?.map(country => country.name).join(', ')}</Text>
            <Text style={Styles.text}>Adulto: {adult ? 'Sim' : 'Não'}</Text>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
     margin: 10,
     alignItems: 'center',
     paddingHorizontal: 10,
   },
   imageContainer: {
      paddingHorizontal: 10,
      width: 150,
      height: 225,
   },
   image1: {
     width: '100%',
     height: '50%',
     resizeMode:"cover",
     borderRadius: 8,
   },
   title: {
     marginTop: 10,
     fontSize: 16,
     fontWeight: 'bold',
     textAlign: 'center',
   },
 });
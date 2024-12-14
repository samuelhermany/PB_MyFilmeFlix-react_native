import { View , Text, Image } from 'react-native';
import styles from './indexStyle';
import { VITE_IMG_URL } from '../../../config';

export default function DetalheShowScreen({ route }) {
   const { movie } = route.params;
   const { title: titulo, overview: sinopse, runtime: duracao, genres: generos, release_date: data_lancamento, adult, production_countries } = movie;

   return (
      <View style={styles.container1}>
         <View style={styles.imageContainer}>
            <Image
               style={styles.image}
               source={{ uri: `${VITE_IMG_URL}${movie.poster_path}`}}
            />
         </View>
         <View>
            <Text style={styles.title}>{titulo}</Text>
            <Text style={styles.text}>{sinopse}</Text>
            <Text style={styles.text}>Duração: {duracao} minutos</Text>
            <Text style={styles.text}>Gêneros: {generos?.map(genre => genre.name).join(', ')}</Text>
            <Text style={styles.text}>Lançamento: {data_lancamento}</Text>
            <Text style={styles.text}>Países de produção: {production_countries?.map(country => country.name).join(', ')}</Text>
            <Text style={styles.text}>Adulto: {adult ? 'Sim' : 'Não'}</Text>
         </View>
      </View>
   );
}
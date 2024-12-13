import { View , Text, StyleSheet, Image } from 'react-native';
import Styles from './indexStyle';
import { VITE_IMG_URL } from '../../../config';
import config from '../../../config';

export default function DetalheShowScreen({ route }) {
   const { movie } = route.params;
   const { title: titulo, overview: sinopse, runtime: duracao, genres: generos, release_date: data_lancamento, adult, production_countries } = movie;

   return (
      <View style={Styles.container1}>
         <View style={Styles.imageContainer}>
            <Image
               style={styles.image}
               source={{ uri: `${VITE_IMG_URL}${movie.poster_path}`}}
            />
         </View>
         <View>
            <Text style={Styles.title}>{titulo}</Text>
            <Text style={Styles.text}>{sinopse}</Text>
            <Text style={Styles.text}>Duração: {duracao} minutos</Text>
            <Text style={Styles.text}>Gêneros: {generos?.map(genre => genre.name).join(', ')}</Text>
            <Text style={Styles.text}>Lançamento: {data_lancamento}</Text>
            <Text style={Styles.text}>Países de produção: {production_countries?.map(country => country.name).join(', ')}</Text>
            <Text style={Styles.text}>Adulto: {adult ? 'Sim' : 'Não'}</Text>
         </View>
      </View>
   );
}
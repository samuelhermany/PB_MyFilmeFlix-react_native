import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { VITE_IMG_URL, VITE_API_KEY, VITE_API_URL, VITE_API_URL_MOVIE, VITE_IMG_154 } from '@env';

export function Card({movie}) {
   const navigation = useNavigation()
   const url = `${VITE_IMG_URL}${movie.poster_path}`

   return (
      <TouchableOpacity
         style={styles.container}
         onPress={() => navigation.navigate('detalhes', { movie: movie })}
      >
      <View style={styles.imageContainer}>
         <Image
            style={styles.image}
            source={{ uri: `${VITE_IMG_URL}${movie.poster_path}`}}          
         />
      </View>
      <Text style={styles.title}>{movie.title}</Text>
    </TouchableOpacity>
   )
}

const styles = StyleSheet.create({
   container: {
     margin: 10,
     alignItems: 'center',     
   },
   imageContainer: {
     width: 150,
     height: 225,
   },
   image: {
      width: '100%',
      height: '100%',
      resizeMode:"cover",
      borderRadius: 8,
   },
   title: {
     marginTop: 10,
     fontSize: 16,
     fontWeight: 'bold',
     textAlign: 'center',
     color: '#e5e5e5',
   },
 });
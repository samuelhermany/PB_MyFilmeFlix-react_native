
import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
   container: {
      // flex: 1,
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
   searchContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',      
   },
   searchInput: {
      // flex: 1,
      height: 40,
      minWidth: screenWidth * 0.7,
      backgroundColor: '#ffffff',
      borderColor: '#cccccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
   },
});

export default styles;
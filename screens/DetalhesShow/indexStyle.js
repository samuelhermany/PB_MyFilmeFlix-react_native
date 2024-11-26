import { StyleSheet, Dimensions } from 'react-native';

// Obtém a largura da tela
const { width, height } = Dimensions.get('window');
const dynamicWidth = (width * 0.8) - 20;  // 50% da largura da tela menos 20px
const dynamicHeight = (width * 0.33) - 20;  // 50% da largura da tela menos 20px

export default styles = StyleSheet.create({
   container1: {
      flex: 1,      
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#141414',
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
      color: '#e5e5e5',
      marginVertical: 10,
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
   },
   text:{
      color: '#e5e5e5',
   }
});
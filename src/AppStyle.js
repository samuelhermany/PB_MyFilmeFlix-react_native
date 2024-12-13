import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
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
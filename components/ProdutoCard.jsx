import { View, Text, StyleSheet, Platform } from 'react-native';

export default function ProdutoCard({ prod }) {
    return (
        <View style={styles.container}>
            {/* {Platform.OS == 'web' ? <Text>Web</Text> : <Text>Android</Text>} */}
            <View style={styles.cardHeader}>
                <Text style={styles.cardTextH3}>{prod.nome}</Text>
                <Text style={styles.cardTextH4}>R$ {prod.preco.toFixed(2)}</Text>
            </View>
            <View style={styles.cardFooter}>
                <Text>{prod.local}</Text>
                <Text>{prod.data}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        paddingVertical: 3,
        marginVertical: 2,
        // border: '1px solid black',
        borderWidth: 1,
        borderColor: '#8d99ae',
        borderRadius: 5,
        // marginTop: Platform.OS == 'android' ? 100 : 
        //             Platform.OS == 'ios' ? 150 : 200,
        ...Platform.select({
            android: { marginTop: 10 },
            ios: { marginTop: 15 },
            web: { marginTop: 20 },
        })
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardTextH3: {
        fontSize: 18,
    },
    cardTextH4: {
        fontSize: 16,
    }
});

// export styles;
// import { styles } from "arquivo.js";

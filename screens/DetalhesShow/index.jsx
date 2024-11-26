import { View , Text } from 'react-native';
import Styles from './indexStyle';

export default function DetalheShowScreen({ route }) {
    const { nome, preco, local, data } = route.params;
    return (
        <View style={Styles.container}>
            <Text style={Styles.header2}>{nome}</Text>
            <Text style={Styles.header3}>R$ {preco}</Text>
            <Text style={Styles.text}>{local}</Text>
            <Text style={Styles.text}>{data}</Text>
        </View>
    );
}
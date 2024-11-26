import { View, Text, Pressable } from 'react-native';
import ProdutoCard from './ProdutoCard';

export default function ProdutoList({ produtos, action }) {
    return (
        <View>
            {produtos?.map(prod => (
                <Pressable onPress={() => action(prod)}>
                    <ProdutoCard prod={prod} />
                </Pressable>
            ))}
        </View>
    );
}
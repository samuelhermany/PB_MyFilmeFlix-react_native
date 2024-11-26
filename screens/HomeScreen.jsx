import { Button, Text, View } from "react-native"

export default function HomeScreen(props) {
    const navigation = props.navigation;
    return (
        <View>
            <Text>Home</Text>
            <Button 
                title="Em Cartaz"
                onPress={() => {
                    navigation.navigate('emCartaz');
                }}
                />
        </View>
    )
}
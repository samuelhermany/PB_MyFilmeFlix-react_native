import { Button, Text, View } from "react-native"


export default function EmCartazScreen(props) {
    const navigation = props.navigation;
    const route = props.route;
    const params = route.params;
    return (
        <View>
            <Text>Home</Text>
            <Button 
                title="Home"
                onPress={() => {
                    navigation.navigate('home');
                }}
                />
        </View>
    )
}
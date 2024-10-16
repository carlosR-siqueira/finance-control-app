import { View, Text, StyleSheet, Image } from "react-native";


export default function About() {


    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>
                entradas e saidas
                
            </Text>
            <Image style={styles.image} source={{
                uri: 'https://www.scorchsoft.com/public/capabilities/head/react-native-logo-square.webp',
            }} />



        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        gap: 20
    },
    textTitle: {
        fontSize: 30,
        color: '#000',

    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20
    },

});
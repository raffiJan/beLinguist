import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Text, View, Dimensions} from 'react-native';

const { width: WIDTH } = Dimensions.get('window')

export default function FlatButton({ text1, text2, image, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{ text1 }</Text>
                <Text style={styles.buttonText}>{ text2 }</Text>
                <Image style={styles.image} source={image}></Image>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 25,
        paddingVertical: 14,
        paddingHorizontal: 10,
        paddingLeft: 20,
        backgroundColor: '#73a9ff',
        opacity: 0.8,
        justifyContent: 'center',
        width: WIDTH - 55,
        height: 125
    },
    buttonText: {
        color: 'white',
        fontSize: 28,
        textAlign: 'left',
        fontFamily: 'eightbit'
    },
    image: {
        position: 'absolute',
        top: 25,
        left: WIDTH - 150,
        width: 75,
        height: 75,
    }
})
import React, { useState } from "react";
import { StyleSheet, Text, View, Picker, Dimensions, ImageBackground } from "react-native";
import { Button } from "react-native-elements";
import FlatButton from '../components/button'
import bgImage from '../assets/background.gif'
import textIcon from '../assets/textIcon.png'
import objectIcon from '../assets/objectIcon.png'

const { width: WIDTH } = Dimensions.get('window')

export default function HomeScreen({ navigation }) {
    const [pickerSelection, setpickerSelection] = useState('fr')

    const pressHandlerObject = () => {
        navigation.navigate('ObjectDetector', {language: pickerSelection})
    }

    const pressHandlerText = () => {
        navigation.navigate('TextDetector')
    }

    return (
        <ImageBackground source={bgImage} style={styles.bgContainer}>
            <Text style={styles.headingContainer}>
                <Text>what language would you like to explore today...</Text>
            </Text>
            <Picker
                style={{ flex:1, width: WIDTH, position: 'relative', top: -60}}
                itemStyle={{ color: "white", fontFamily:"eightbit", fontSize:20}}
                selectedValue={ pickerSelection }
                onValueChange={(itemValue, itemIndex) => { setpickerSelection(itemValue)}}>
                <Picker.Item label="French" value="fr" />
                <Picker.Item label="Arabic" value="ar" />
                <Picker.Item label="Armenian" value="hy" />
                <Picker.Item label="Bulgarian" value="bg" />
                <Picker.Item label="German" value="de" />
                <Picker.Item label="Greek" value="el" />
                <Picker.Item label="Hindi" value="hi" />
                <Picker.Item label="Italian" value="it" />
                <Picker.Item label="Japanese" value="ja" />
                <Picker.Item label="Polish" value="pl" />
                <Picker.Item label="Portuguese" value="pt" />
                <Picker.Item label="Romanian" value="ro" />
                <Picker.Item label="Russian" value="ru" />
                <Picker.Item label="Spanish" value="es" />
                <Picker.Item label="Swedish" value="sv" />
            </Picker>
            <View style={styles.objectButtonContainer}>
                <FlatButton 
                    text1='object' 
                    text2='detector'
                    image={objectIcon}
                    onPress={pressHandlerObject}      
                />
            </View>
            <View style={styles.textButtonContainer}>
                <FlatButton 
                    text1='text' 
                    text2='detector'
                    image={textIcon}
                    onPress={pressHandlerText}
                />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    bgContainer: {
        flex: 1,
        alignItems: 'center',
        width: null,
        height: null
    },
    headingContainer: {
        flex: 1,
        fontFamily: 'eightbit',
        fontSize: 28,
        color: 'white',
        marginTop: 35,
        paddingHorizontal: 20

    },
    objectButtonContainer: {
        flex: 1,
        paddingTop: 40
    },
    textButtonContainer: {
        flex: 1,
        paddingBottom: 120
    }

});
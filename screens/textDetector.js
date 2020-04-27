import React, { useState, useEffect  } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { Dialog } from "react-native-simple-dialogs";
import * as Speech from "expo-speech";
import { Camera } from "expo-camera";
import { API_KEY } from '../credential'

export default function TextDetectorScreen({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [detectedText, setDetectedText] = useState(null);
    const [detectedLanguage, setDetectedLanguage] = useState(null);
    const [translatedText, setTranslatedText] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [dialogVisibility, setDialogVisibility] = useState(false);

    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    takePicture = async () =>{
        if(this.camera){
            this.camera.pausePreview();
            const key = API_KEY;
            const option = { quality: 0.5, base64: true }
            let photo = await this.camera.takePictureAsync(option); 
            let body = JSON.stringify({
				requests: [
					{
						features: [
							{ type: 'TEXT_DETECTION', maxResults: 1 },
						],
						image: {
							content: photo.base64
						}
					}
				]
            });
			let response = await fetch(
				'https://vision.googleapis.com/v1/images:annotate?key=' + key,
				{
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					method: 'POST',
					body: body
				}
			);
            let responseJson = await response.json();
            const capturedText = responseJson.responses[0].textAnnotations[0].description;
            capturedText.replace( /[\r\n]+/gm, "" );
            setDetectedText(capturedText);
            let translateResponse = await fetch(
				'https://translation.googleapis.com/language/translate/v2?target=en&key=' + key +'&q=' + capturedText,
            );
            let responseJsonTranslation = await translateResponse.json();
            const translatedString = responseJsonTranslation.data.translations[0].translatedText;
            const detectedLanguageString = responseJsonTranslation.data.translations[0].detectedSourceLanguage;
            setDetectedLanguage(detectedLanguageString);
            setTranslatedText(translatedString);
            setDialogVisibility(true);
        }
    };

    onSpeak = () => {
        Speech.speak(detectedText, {
            language: detectedLanguage,
            pitch: 1,
            rate: 1
        })
    }

    return (
        <React.Fragment>
            <View style={styles.container}>
                <Camera style={{ flex: 1 }} type={type} ref={camera => this.camera = camera}>
                    <Icon
                        reverse
                        raised
                        flex={1}
                        containerStyle={styles.cameraIcon}
                        name='photo-camera'
                        size={35}
                        color='#73a9ff'
                        onPress={this.takePicture}
                    />
                    <Dialog
                        visible={dialogVisibility}
                        title="Text Detected!"
                        titleStyle={styles.title}
                        dialogStyle={styles.dialog}
                        onTouchOutside={() => {
                            setDialogVisibility(false);
                            this.camera.resumePreview();
                            }
                        } >
                        <View>
                            <Text style={{fontSize:20, fontWeight:'bold'}}>that says: </Text>
                            <Text style={{fontSize:22, paddingBottom: 5}}>{translatedText}</Text>
                        </View>
                        <View style={{alignItems: 'center'}} >
                            <Icon
                                raised
                                name='volume-up'
                                type='font-awesome'
                                color='#73a9ff'
                                onPress={this.onSpeak} 
                            />
                        </View>
                    </Dialog>
                </Camera>
            </View>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    cameraIcon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 30
    },
    title:  {
        fontFamily: 'eightbit',
        alignSelf: 'center',
        paddingBottom: 5
    },
    dialog: {
        backgroundColor: '#73a9ff'
    }
});

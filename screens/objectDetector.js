import React, { useState, useEffect  } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { Dialog } from "react-native-simple-dialogs";
import * as Speech from "expo-speech";
import { Camera } from "expo-camera";
import { API_KEY } from '../credential'

export default function ObjectDetectorScreen({ route, navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [item, setItem] = useState(null);
    const [translatedItem, setTranslatedItem] = useState(null);
    const [accuracy, setAccuracy] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [dialogVisibility, setDialogVisibility] = useState(false);
    const { language } = route.params;

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
            let detectBody = JSON.stringify({
				requests: [
					{
						features: [
							{ type: 'LABEL_DETECTION', maxResults: 1 },
						],
						image: {
							content: photo.base64
						}
					}
				]
            });
			let detectResponse = await fetch(
				'https://vision.googleapis.com/v1/images:annotate?key=' + key,
				{
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					method: 'POST',
					body: detectBody
				}
			);
            let responseJson = await detectResponse.json();
            const itemString = responseJson.responses[0].labelAnnotations[0].description;
            setItem(itemString.toLowerCase());
            const score = responseJson.responses[0].labelAnnotations[0].score;
            const percentage = (score * 100).toFixed(0) + '%';
            let translateResponse = await fetch(
				'https://translation.googleapis.com/language/translate/v2?target=' + language + '&key=' + key +'&q=' + itemString,
            );
            let responseJsonTranslate = await translateResponse.json();
            const translatedItemString = responseJsonTranslate.data.translations[0].translatedText;
            setTranslatedItem(translatedItemString.toLowerCase());
            setAccuracy(percentage);
            setDialogVisibility(true);
        }
    };

    onSpeak = () => {
        Speech.speak(translatedItem, {
            language: language,
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
                        title="Object Detected!"
                        titleStyle={styles.title}
                        dialogStyle={styles.dialog}
                        onTouchOutside={() => {
                            setDialogVisibility(false);
                            this.camera.resumePreview();
                            }
                        } >
                        <View>
                            <Text style={{fontSize:20, paddingBottom: 15}}>the detected obeject is almost definitely a(n) {item} (we're {accuracy} sure)</Text>
                            <Text style={{fontSize:22, paddingBottom: 15}}>translated: {translatedItem}</Text>
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

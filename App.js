import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Icon } from "react-native-elements";
import { HomeScreen } from './screens/home';
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import Navigator from './routes/homeStack';

const getFonts = () => Font.loadAsync({
  'eightbit': require('./assets/fonts/8bit.ttf')
});

export default function App () {
    const [ fontsLoaded, setFontsLoaded] = useState(false);
    
    if(fontsLoaded){
      return (
        Navigator()
      );
    } else{
        return(
          <AppLoading
          startAsync={getFonts}
          onFinish={() => setFontsLoaded(true)}
        />
      )
    }
  }
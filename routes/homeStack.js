import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home';
import ObjectDetectorScreen from '../screens/objectDetector';
import TextDetectorScreen from '../screens/textDetector';

const Stack = createStackNavigator()

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen 
          name='Home' 
          component={HomeScreen}  
          options={{ 
            title: 'beLinguist',
            headerStyle: {
              backgroundColor: '#73a9ff'
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#FFFFFF'
            },
          }}
        />
        <Stack.Screen 
          name='ObjectDetector' 
          component={ObjectDetectorScreen} 
          options={{ 
            title: 'Object Detection',
            headerStyle: {
              backgroundColor: '#73a9ff'
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#FFFFFF'
            },
          }}
        />
        <Stack.Screen 
          name='TextDetector' 
          component={TextDetectorScreen} 
          options={{ 
            title: 'Text Detection',
            headerStyle: {
              backgroundColor: '#73a9ff'
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#FFFFFF'
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
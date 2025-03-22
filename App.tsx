import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';

export type RootStackParamList = {
  Home: { images: string[] } | undefined;
  Camera: { images: string[] };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [images, setImages] = useState<string[]>([]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} images={images} />}
        </Stack.Screen>
        <Stack.Screen name="Camera">
          {(props) => <CameraScreen {...props} images={images} setImages={setImages} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

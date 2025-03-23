import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts, Alegreya_400Regular, Alegreya_700Bold } from '@expo-google-fonts/alegreya';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import SurveyScreen from './screens/SurveyScreen';
import FriendsScreen from './screens/FriendsScreen';
import ExploreScreen from './screens/ExploreScreen';
import { authService } from './services/authService';

export type RootStackParamList = {
  Login: undefined | {};
  Register: undefined | {};
  Survey: undefined | {};
  Home: undefined | {};
  Camera: { customPrompt?: string } | undefined;
  Friends: undefined | {};
  Explore: undefined | {};
};

export interface PhotoData {
  uri: string;
  timestamp: number;
  dateString: string;
}

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [initialRoute, setInitialRoute] = useState<'Login' | 'Home' | 'Camera' | 'Survey' | 'Friends' | 'Explore'>('Login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [fontsLoaded] = useFonts({
    Alegreya_400Regular,
    Alegreya_700Bold
  });
  
  // Check if a photo was already taken today
  const hasPhotoForToday = (): boolean => {
    if (photos.length === 0) return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today
    
    const latestPhoto = photos[photos.length - 1];
    const photoDate = new Date(latestPhoto.timestamp);
    photoDate.setHours(0, 0, 0, 0); // Start of photo day
    
    return photoDate.getTime() === today.getTime();
  };
  
  // Format date to YYYY-MM-DD
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // Add a new photo with current timestamp
  const addPhoto = (uri: string) => {
    const timestamp = Date.now();
    const newPhoto = {
      uri,
      timestamp,
      dateString: formatDate(timestamp)
    };
    setPhotos([...photos, newPhoto]);
  };
  
  // Check authentication status on startup
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Check if we should go directly to camera on startup
  useEffect(() => {
    if (isAuthenticated && !hasPhotoForToday()) {
      setInitialRoute('Camera');
    }
  }, [isAuthenticated]);

  const checkAuthStatus = async () => {
    try {
      const user = await authService.getCurrentUser();
      if (user) {
        setIsAuthenticated(true);
        setInitialRoute('Home');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      setInitialRoute('Login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!fontsLoaded) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Loading fonts...</Text></View>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={initialRoute} 
        screenOptions={{ 
          headerShown: false,
          animation: 'none' // Disable animations
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Survey" component={SurveyScreen} />
        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen
              {...props}
              photos={photos}
              hasPhotoForToday={hasPhotoForToday}
              onLogout={handleLogout}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Camera">
          {(props) => (
            <CameraScreen
              {...props}
              images={photos.map(p => p.uri)}
              addPhoto={addPhoto}
              hasPhotoForToday={hasPhotoForToday}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Friends">
          {(props) => <FriendsScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Explore">
          {(props) => <ExploreScreen {...props} photos={photos} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

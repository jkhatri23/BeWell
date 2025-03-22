import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { authService } from './services/authService';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Camera: undefined;
};

export interface PhotoData {
  uri: string;
  timestamp: number;
  dateString: string;
}

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [initialRoute, setInitialRoute] = useState<'Login' | 'Home' | 'Camera'>('Login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
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
    return date.toISOString().split('T')[0];
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

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login">
          {(props) => <LoginScreen {...props} onLogin={() => setIsAuthenticated(true)} />}
        </Stack.Screen>
        <Stack.Screen name="Register">
          {(props) => <RegisterScreen {...props} onRegister={() => setIsAuthenticated(true)} />}
        </Stack.Screen>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

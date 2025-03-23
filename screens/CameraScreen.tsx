import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert, Animated } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { cameraStyles } from '../styles/CameraScreen.styles';
import { commonStyles } from '../styles/common.styles';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Camera'> & {
  images: string[];
  addPhoto: (uri: string) => void;
  hasPhotoForToday: () => boolean;
};

export default function CameraScreen({ navigation, route, images, addPhoto, hasPhotoForToday }: Props) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const { customPrompt } = route.params || { customPrompt: "Enjoy the little things" };
  
  // Check if photo already taken today
  useEffect(() => {
    if (hasPhotoForToday()) {
      navigation.navigate('Home');
    }
  }, [hasPhotoForToday, navigation]);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={cameraStyles.container}>
        <Text style={cameraStyles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  async function takePicture() {
    if (cameraRef.current && !hasPhotoForToday() && !isCapturing) {
      setIsCapturing(true);
      
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo && photo.uri) {
          addPhoto(photo.uri);
          navigation.navigate('Home');
        }
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert("Error", "Failed to take picture. Please try again.");
      } finally {
        setIsCapturing(false);
      }
    } else if (hasPhotoForToday()) {
      navigation.navigate('Home');
    }
  }

  return (
    <View style={cameraStyles.container}>
      <CameraView style={cameraStyles.camera} facing={facing} ref={cameraRef}>
        <View style={cameraStyles.headerContainer}>
          <Text style={cameraStyles.headerText}>{customPrompt}</Text>
        </View>
        <View style={cameraStyles.buttonContainer}>
          <TouchableOpacity style={cameraStyles.flipButton} onPress={toggleCameraFacing}>
            <Ionicons name="sync" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              cameraStyles.captureButton, 
              isCapturing && cameraStyles.captureButtonPressed
            ]} 
            onPress={takePicture}
            activeOpacity={0.7}
          />
        </View>
      </CameraView>
    </View>
  );
}

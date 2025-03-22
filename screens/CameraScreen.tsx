import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { cameraStyles } from '../styles/CameraScreen.styles';
import { commonStyles } from '../styles/common.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Camera'> & {
  images: string[];
  addPhoto: (uri: string) => void;
  hasPhotoForToday: () => boolean;
};

export default function CameraScreen({ navigation, images, addPhoto, hasPhotoForToday }: Props) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);

  // Check if photo already taken today
  useEffect(() => {
    if (hasPhotoForToday()) {
      Alert.alert(
        "Photo Already Taken",
        "You've already taken your photo for today. Come back tomorrow!",
        [{ text: "OK", onPress: () => navigation.navigate('Home') }]
      );
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
    if (cameraRef.current && !hasPhotoForToday()) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo && photo.uri) {
          addPhoto(photo.uri);
          navigation.navigate('Home');
        }
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert("Error", "Failed to take picture. Please try again.");
      }
    } else if (hasPhotoForToday()) {
      Alert.alert(
        "Photo Already Taken",
        "You've already taken your photo for today. Come back tomorrow!"
      );
    }
  }

  return (
    <View style={cameraStyles.container}>
      <CameraView style={cameraStyles.camera} facing={facing} ref={cameraRef}>
        <View style={cameraStyles.headerContainer}>
          <Text style={cameraStyles.headerText}>Take your daily photo</Text>
        </View>
        <View style={cameraStyles.buttonContainer}>
          <TouchableOpacity style={cameraStyles.button} onPress={toggleCameraFacing}>
            <Text style={cameraStyles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={cameraStyles.button} onPress={takePicture}>
            <Text style={cameraStyles.text}>Take Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={cameraStyles.button} onPress={() => navigation.navigate('Home')}>
            <Text style={cameraStyles.text}>Go Home</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

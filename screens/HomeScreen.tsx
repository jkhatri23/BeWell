import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'> & {
    images: string[];
}

export default function HomeScreen({ navigation, images }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Captured Images</Text>

      {images.length === 0 ? (
        <Text style={styles.noImagesText}>No images yet. Take some pictures!</Text>
      ) : (
        <FlatList
          data={images}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.image} />
          )}
          numColumns={2}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Camera')}>
        <Text style={styles.buttonText}>Open Camera</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noImagesText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    margin: 5,
    borderRadius: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

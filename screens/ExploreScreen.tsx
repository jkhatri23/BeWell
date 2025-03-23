import React from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, Text, Dimensions, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, PhotoData } from '../App';
import NavigationBar from '../components/NavigationBar';
import PostCard from '../components/PostCard';
import { getPosts } from '../utils/mockDataLoader';

type Props = NativeStackScreenProps<RootStackParamList, 'Explore'> & {
  photos?: PhotoData[];
};

export default function ExploreScreen({ navigation, photos = [] }: Props) {
  // Get posts from our mock data loader
  const posts = getPosts();
  const screenWidth = Dimensions.get('window').width;
  
  // Get today's photo if available
  const todaysPhoto = photos.length > 0 ? photos[0] : null;

  // Header component with today's photo
  const ListHeaderComponent = () => {
    if (!todaysPhoto) return null;
    
    return (
      <View style={styles.myPhotoContainer}>
        <View style={styles.myPhotoBorderOuter}>
          <View style={styles.myPhotoBorderInner}>
            <Image 
              source={{ uri: todaysPhoto.uri }}
              style={styles.myPhoto}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={ListHeaderComponent}
      />
      <View style={styles.navBarContainer}>
        <NavigationBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listContent: {
    paddingTop: 10,
    paddingBottom: 80,
  },
  navBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
  myPhotoContainer: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  myPhotoBorderOuter: {
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 12,
    padding: 1,
  },
  myPhotoBorderInner: {
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 10,
  },
  myPhoto: {
    width: 120,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#EEEEEE',
  },
}); 
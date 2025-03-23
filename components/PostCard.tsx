import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { PostData } from '../utils/mockData';

interface PostCardProps {
  post: PostData;
}

const PostCard: React.FC<PostCardProps> = ({ post }: { post: PostData }) => {
  const { name, prompt, profileColor, time, image } = post;
  const firstLetter = name.charAt(0).toUpperCase();
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.profilePic, { backgroundColor: profileColor }]}>
          <Text style={styles.profileLetter}>{firstLetter}</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
      <Text style={styles.prompt}>{prompt}</Text>
      <View style={styles.imageContainer}>
        <Image source={image} style={[styles.image, { width: screenWidth - 32, height: screenWidth - 32 }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileLetter: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerText: {
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  prompt: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
  },
})

export default PostCard; 
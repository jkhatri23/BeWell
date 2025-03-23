import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function NavigationBar() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.iconContainer} 
        onPress={() => navigation.navigate('Home')}
      >
        <Ionicons name="home" size={24} color="#007AFF" />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.iconContainer} 
        onPress={() => navigation.navigate('Friends')}
      >
        <Ionicons name="people" size={24} color="#007AFF" />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.iconContainer} 
        onPress={() => navigation.navigate('Explore')}
      >
        <Ionicons name="compass" size={24} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  iconContainer: {
    padding: 10,
  },
}); 
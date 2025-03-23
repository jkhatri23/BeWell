import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome6, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function NavigationBar() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();

  const getIconColor = (routeName: string) => {
    return route.name === routeName ? '#47134f' : '#BBBBBB';
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.iconContainer} 
        onPress={() => navigation.navigate('Home')}
      >
        <FontAwesome6 name="house" size={28} color={getIconColor('Home')} />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.iconContainer} 
        onPress={() => navigation.navigate('Explore')}
      >
        <FontAwesome6 name="compass" size={28} color={getIconColor('Explore')} />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.iconContainer} 
        onPress={() => navigation.navigate('Friends')}
      >
        <FontAwesome5 name="user-friends" size={28} color={getIconColor('Friends')} />
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
    paddingVertical: 30,
  },
  iconContainer: {
    padding: 12,
  },
}); 
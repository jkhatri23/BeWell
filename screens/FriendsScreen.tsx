import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import NavigationBar from '../components/NavigationBar';
import { MOCK_POSTS } from '../utils/mockData';

type Props = NativeStackScreenProps<RootStackParamList, 'Friends'>;

export default function FriendsScreen({ navigation }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [addedFriends, setAddedFriends] = useState<Record<string, boolean>>({});
  const inputRef = useRef<TextInput>(null);

  // Filter users based on search term
  const filteredUsers = MOCK_POSTS.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddFriend = (id: string) => {
    setAddedFriends(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handlePressOutside = () => {
    setIsFocused(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  // Render each user in the search results
  const renderUser = ({ item }: { item: typeof MOCK_POSTS[0] }) => {
    const firstLetter = item.name.charAt(0).toUpperCase();
    const isAdded = addedFriends[item.id];
    
    return (
      <TouchableOpacity style={styles.userContainer}>
        <View style={[styles.profilePic, { backgroundColor: item.profileColor }]}>
          <Text style={styles.profileLetter}>{firstLetter}</Text>
        </View>
        <Text style={styles.userName}>{item.name}</Text>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => handleAddFriend(item.id)}
        >
          <Text style={styles.addButtonText}>{isAdded ? '✓' : '+'}</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <Pressable style={styles.container} onPress={handlePressOutside}>
      <Text style={styles.title}>Add Friends</Text>
      
      <View style={styles.searchContainer}>
        <TextInput
          ref={inputRef}
          style={styles.searchInput}
          placeholder="Search for friends..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          onFocus={() => setIsFocused(true)}
          autoCapitalize="none"
        />
      </View>
      
      {isFocused && (
        <>
          <Text style={styles.suggestionsHeading}>Suggestions</Text>
          <FlatList
            data={filteredUsers}
            renderItem={renderUser}
            keyExtractor={item => item.id}
            style={styles.resultsList}
          />
        </>
      )}
      
      <View style={styles.navBarContainer}>
        <NavigationBar />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 30,
    textAlign: 'left',
    fontFamily: 'Alegreya_700Bold',
    color: '#47134f',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  suggestionsHeading: {
    fontSize: 16,
    fontWeight: '500',
    color: '#777',
    marginBottom: 12,
    marginTop: 5,
  },
  resultsList: {
    flex: 1,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  profilePic: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileLetter: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 16,
    flex: 1,
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e9bff5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -2,
  },
  navBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
}); 
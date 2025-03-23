// Mock data for posts in the Explore screen
import { ImageSourcePropType } from 'react-native';

// Define the data structure for posts
export interface PostData {
  id: string;
  name: string;
  prompt: string;
  profileColor: string;
  time: string;
  image: ImageSourcePropType;
}

export const MOCK_POSTS: PostData[] = [
  {
    id: '1',
    name: 'Harley Zhang',
    prompt: 'Call a friend',
    profileColor: '#FF6B6B',
    time: '4:45 AM',
    image: require('./assets/harley.png'),
  },
  {
    id: '2',
    name: 'Sebastian Stefenel',
    prompt: '"Go for a run!"',
    profileColor: '#4ECDC4',
    time: '4:18 AM',
    image: require('./assets/seb.png'),
  },
  {
    id: '3',
    name: 'Jordan Khatri',
    prompt: 'Do some yoga',
    profileColor: '#45B7D1',
    time: '4:12 AM',
    image: require('./assets/jordan.png'),
  },
  {
    id: '4',
    name: 'Andrew Mazour',
    prompt: 'Meditate for 5 minutes',
    profileColor: '#98D8AA',
    time: '4:04 AM',
    image: require('./assets/andrew.png'),
  },
]; 
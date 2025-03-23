// Mock data for posts in the Explore screen
import { ImageSourcePropType } from 'react-native';

// Define the data structure for posts
export interface PostData {
  id: string;
  name: string;
  prompt: string;
  profileColor: string;
  time: string;
}

export const MOCK_POSTS: PostData[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    prompt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in metus eu nisi tempor efficitur.',
    profileColor: '#FF6B6B',
    time: '9:30 AM',
  },
  {
    id: '2',
    name: 'Mike Chen',
    prompt: 'Praesent vulputate mi vitae libero feugiat, ac pulvinar dolor fermentum. Sed ornare eros eu felis lobortis.',
    profileColor: '#4ECDC4',
    time: '2:15 PM',
  },
  {
    id: '3',
    name: 'Taylor Wright',
    prompt: 'Donec viverra dui ut purus dictum tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et.',
    profileColor: '#45B7D1',
    time: '11:45 AM',
  },
  {
    id: '4',
    name: 'Priya Patel',
    prompt: 'Fusce ullamcorper augue et lectus tempus, non feugiat nibh ultrices. Integer ac enim felis.',
    profileColor: '#98D8AA',
    time: '5:20 PM',
  },
]; 
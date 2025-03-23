import { MOCK_POSTS, PostData } from './mockData';

// Function to get post data - in a real app, this would fetch from an API
// Currently using environment variable to determine if we should use mock data
export const getPosts = (): PostData[] => {
  // Check if mock data is enabled (would come from .env in a real app)
  const useMockData = process.env.MOCK_DATA_ENABLED === 'true';
  
  if (useMockData) {
    // Return hardcoded mock data for development
    return MOCK_POSTS;
  } else {
    // In a production environment, this would fetch from an API
    // For now just return the same mock data as a fallback
    return MOCK_POSTS;
  }
};

// Similarly we could have a function for friends
export const getFriends = () => {
  // Similar pattern to above - would fetch real data in production
  return [];
}; 
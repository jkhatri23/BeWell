import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  noImagesText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  monthContainer: {
    marginBottom: 24,
  },
  monthText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'left',
  },
  weekdayLabels: {
    flexDirection: 'row',
    marginBottom: 4,
    justifyContent: 'space-around',
  },
  weekdayText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  weekContainer: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  dayContainer: {
    alignItems: 'center',
    padding: 2,
    justifyContent: 'center',
  },
  dayText: {
    fontSize: 14,
    marginBottom: 2,
  },
  dayTextBold: {
    fontWeight: 'bold',
  },
  dayWithPhotoContainer: {
    position: 'relative',
  },
  dateOverlay: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: [{ translateX: -17 }, { translateY: -11 }],
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayCircle: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
  },
  todayOverlay: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#4285F4',
  },
  todayText: {
    color: '#333',
  },
  notCurrentMonth: {
    opacity: 0.4,
  },
  notCurrentMonthText: {
    color: '#999',
  },
  thumbnail: {
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#4285F4',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    width: 200,
  },
  cameraButton: {
    backgroundColor: '#4285F4',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  buttonDisabled: {
    backgroundColor: '#A0A0A0',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Photo preview modal styles
  previewModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewModalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: screenWidth * 0.9,
    maxHeight: screenHeight * 0.8,
    alignItems: 'center',
  },
  previewDate: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  previewImage: {
    width: screenWidth * 0.8,
    height: screenWidth * 0.8,
    borderRadius: 5,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#4285F4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 
import { StyleSheet } from 'react-native';

export const cameraStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 80,
    marginBottom: 100,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    padding: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
  },
  flipButton: {
    backgroundColor: 'transparent',
    padding: 15,
    position: 'absolute',
    left: 45,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonPressed: {
    backgroundColor: '#e0e0e0',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
}); 
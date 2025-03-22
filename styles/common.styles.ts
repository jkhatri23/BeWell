import { StyleSheet } from 'react-native';

// Colors
export const colors = {
  primary: '#4285F4',
  secondary: '#34A853',
  inactive: '#A0A0A0',
  textDark: '#333333',
  textLight: '#FFFFFF',
  textGray: '#666666',
  background: '#FFFFFF',
  backgroundDark: 'rgba(0, 0, 0, 0.5)',
};

// Typography
export const typography = {
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  body: {
    fontSize: 16,
    color: colors.textDark,
  },
  caption: {
    fontSize: 14,
    color: colors.textGray,
  },
  small: {
    fontSize: 12,
    color: colors.textGray,
  },
};

// Common styles
export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: colors.inactive,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 
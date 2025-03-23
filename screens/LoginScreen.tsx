import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { authService } from '../services/authService';
import { isValidEmail } from '../utils/validation';

interface LoginScreenProps {
    navigation: any;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState('');

    const validateEmail = (email: string) => {
        if (!isValidEmail(email)) {
            setEmailError('Please enter a valid email address (e.g., example@domain.com)');
            return false;
        }
        setEmailError('');
        return true;
    };

    const handleEmailChange = (text: string) => {
        setEmail(text);
        validateEmail(text);
    };

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (!validateEmail(email)) {
            return;
        }

        setLoading(true);
        try {
            const cleanEmail = email.trim().replace(/^["']|["']$/g, '');
            await authService.login({ email: cleanEmail, password });
            navigation.replace('Survey');
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.imageContainer}>
                    <Image source={require('../assets/butterfly.png')} style={styles.image} resizeMode="contain" />
                </View>
                <Text style={styles.title}>Welcome Back</Text>
                <TextInput
                    style={[styles.input, emailError ? styles.inputError : null]}
                    placeholder="Email"
                    value={email}
                    onChangeText={handleEmailChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#888"
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#888"
                />
                <TouchableOpacity
                    style={[styles.button, emailError ? styles.buttonDisabled : null]}
                    onPress={handleLogin}
                    disabled={loading || !!emailError}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Login</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                    style={styles.linkButton}
                >
                    <Text style={styles.linkText}>Don't have an account? <Text style={styles.linkTextBold}>Get Started</Text></Text>
                </TouchableOpacity>
            </ScrollView>
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>BeWell</Text>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#bdabff',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
        paddingBottom: 60,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#47134f',
        fontFamily: 'Alegreya_700Bold',
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 0,
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        fontSize: 16,
        color: '#000',
    },
    inputError: {
        borderColor: '#f5b5b5',
        borderWidth: 1,
    },
    errorText: {
        color: '#fff',
        fontSize: 12,
        marginBottom: 15,
        marginLeft: 5,
    },
    button: {
        backgroundColor: '#47134f',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Alegreya_700Bold',
    },
    linkButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    linkText: {
        color: '#47134f',
        fontSize: 16,
        opacity: 0.7,
        fontFamily: 'System',
    },
    linkTextBold: {
        fontWeight: 'bold',
        color: '#47134f',
        fontSize: 16,
        opacity: 0.7,
        fontFamily: 'System',
    },
    logoContainer: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
    },
    logoText: {
        color: '#47134f',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'System',
    },
}); 
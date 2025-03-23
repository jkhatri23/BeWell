import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';


type Props = NativeStackScreenProps<RootStackParamList, 'Survey'>;


export default function SurveyScreen({ navigation }: Props) {
    const [feelings, setFeelings] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const generatePrompt = async () => {
        setIsLoading(true);
        try {
            const promptText = `Based on the following feelings, provide a very short, lighthearted, and direct wellness activity suggestion that one could take a picture (MAXIMUM 8 WORDS TOTAL):
            
            "${feelings}"
            
            Only return the suggestion with no explanation or context. Responses must be visible activities, places, or objects—no abstract actions like 'breathe' or 'relax'. Only return the suggestion with no explanation, context or quotation marks. MANDATORY TO KEEP IT TO AROUND 8 WORDS.`;
            
            const response = await fetch('https://api.cohere.ai/v1/generate', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer fuzhxwN3KcfY51FwK1EaP3E4YKE1wPHxAhRAmun7',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: promptText,
                    max_tokens: 20,
                    temperature: 0.7,
                    k: 0,
                    p: 0.75,
                }),
            });
            
            const data = await response.json();
            let generatedPrompt = data.generations?.[0]?.text?.trim() || "Take a deep breath";
            
            // Limit to first 10 words if response is too long
            const words = generatedPrompt.split(/\s+/);
            if (words.length > 10) {
                generatedPrompt = words.slice(0, 10).join(' ');
            }
            
            navigation.replace('Camera', { customPrompt: generatedPrompt });
        } catch (error) {
            console.error("Error generating prompt:", error);
            navigation.replace('Camera', { customPrompt: "Take a deep breath" });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = () => {
        console.log("Feelings:", feelings);
        generatePrompt();
    };


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Weekly Check-In</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Start spilling your feelings..."
                    placeholderTextColor="#999"
                    multiline
                    maxLength={1000}
                    value={feelings}
                    onChangeText={setFeelings}
                />
            </ScrollView>
            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.submitButtonText}>Submit</Text>
                )}
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 60,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
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
    textInput: {
        fontSize: 18,
        color: '#666',
        padding: 20,
        borderRadius: 8,
        backgroundColor: '#f2f2f2',
        textAlignVertical: 'top',
        height: 200,
    },
    submitButton: {
        backgroundColor: '#e9bff5',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Alegreya_700Bold',
    },
});






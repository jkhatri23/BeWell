import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { COHERE_API_KEY } from 'react-native-dotenv';


type Props = NativeStackScreenProps<RootStackParamList, 'Survey'>;


interface SurveyAnswers {
    mood: number;
    stress: number;
    sleep: number;
}


export default function SurveyScreen({ navigation }: Props) {
    const [answers, setAnswers] = useState<SurveyAnswers>({
        mood: 5,
        stress: 5,
        sleep: 5,
    });
    const [isLoading, setIsLoading] = useState(false);


    const questions = [
        {
            id: 'mood',
            text: 'How would you rate your mood recently?',
        },
        {
            id: 'stress',
            text: 'How would you rate your stress level recently?',
        },
        {
            id: 'sleep',
            text: 'How would you rate your sleep quality recently?',
        },
    ];


    const handleAnswer = (questionId: keyof SurveyAnswers, value: number) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: value,
        }));
    };

    const generatePrompt = async () => {
        setIsLoading(true);
        try {
            const promptText = `Generate a very short wellness activity suggestion (MAXIMUM 6 WORDS TOTAL) for someone with:
            - Mood: ${answers.mood}/10 (higher is better)
            - Stress level: ${answers.stress}/10 (higher is more stressed)
            - Sleep quality: ${answers.sleep}/10 (higher is better)
            
            Examples of good responses:
            - "Go for a walk outside."
            - "Meditate for 10 minutes."
            - "Hug a tree."
            - "Take deep breaths."
            - "Go for a run."
            
            Keep it extremely short (6 words maximum), actionable, and direct. Only give me the straightofrward response, no other words.`;
            
            const response = await fetch('https://api.cohere.ai/v1/generate', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${COHERE_API_KEY}`,
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
            
            // Limit to first 6 words if response is too long
            const words = generatedPrompt.split(/\s+/);
            if (words.length > 6) {
                generatedPrompt = words.slice(0, 6).join(' ');
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
        console.log("Survey Responses:", answers);
        generatePrompt();
    };


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Mental Wellness Check</Text>
            <Text style={styles.subtitle}>
                Please answer these questions to help us understand your current mental state.
            </Text>


            {questions.map((question) => (
                <View key={question.id} style={styles.questionContainer}>
                    <Text style={styles.questionText}>{question.text}</Text>
                   
                    <Slider
                        style={{ width: '100%', height: 40 }}
                        minimumValue={1}
                        maximumValue={10}
                        step={1}
                        value={answers[question.id as keyof SurveyAnswers]}
                        onValueChange={(value: number) => handleAnswer(question.id as keyof SurveyAnswers, value)}
                        minimumTrackTintColor="#007AFF"
                        maximumTrackTintColor="#ccc"
                        thumbTintColor="#007AFF"
                    />
                    <Text style={styles.sliderValue}>
                        {answers[question.id as keyof SurveyAnswers]}
                    </Text>
                </View>
            ))}


            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.submitButtonText}>Continue</Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        paddingTop: 60,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    },
    questionContainer: {
        marginBottom: 30,
    },
    questionText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 15,
    },
    sliderValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007AFF',
        textAlign: 'center',
        marginTop: 5,
    },
    submitButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});






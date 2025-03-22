import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { commonStyles } from '../styles/common.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Survey'>;

export default function SurveyScreen({ navigation }: Props) {
    const [answers, setAnswers] = useState({
        mood: 0,
        stress: 0,
        sleep: 0,
    });

    const questions = [
        {
            id: 'mood',
            text: 'How would you rate your current mood?',
            options: [
                { value: 1, label: 'Very Poor' },
                { value: 2, label: 'Poor' },
                { value: 3, label: 'Neutral' },
                { value: 4, label: 'Good' },
                { value: 5, label: 'Very Good' },
            ],
        },
        {
            id: 'stress',
            text: 'How would you rate your current stress level?',
            options: [
                { value: 1, label: 'Very High' },
                { value: 2, label: 'High' },
                { value: 3, label: 'Moderate' },
                { value: 4, label: 'Low' },
                { value: 5, label: 'Very Low' },
            ],
        },
        {
            id: 'sleep',
            text: 'How would you rate your sleep quality?',
            options: [
                { value: 1, label: 'Very Poor' },
                { value: 2, label: 'Poor' },
                { value: 3, label: 'Fair' },
                { value: 4, label: 'Good' },
                { value: 5, label: 'Very Good' },
            ],
        },
    ];

    const handleAnswer = (questionId: string, value: number) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value,
        }));
    };

    const handleSubmit = () => {
        // Here you could save the survey results to your backend
        navigation.replace('Camera');
    };

    const isComplete = Object.values(answers).every(answer => answer > 0);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Mental Wellness Check</Text>
            <Text style={styles.subtitle}>Please answer these questions to help us understand your current mental state.</Text>
            
            {questions.map((question) => (
                <View key={question.id} style={styles.questionContainer}>
                    <Text style={styles.questionText}>{question.text}</Text>
                    <View style={styles.optionsContainer}>
                        {question.options.map((option) => (
                            <TouchableOpacity
                                key={option.value}
                                style={[
                                    styles.optionButton,
                                    answers[question.id as keyof typeof answers] === option.value && styles.selectedOption,
                                ]}
                                onPress={() => handleAnswer(question.id, option.value)}
                            >
                                <Text style={[
                                    styles.optionText,
                                    answers[question.id as keyof typeof answers] === option.value && styles.selectedOptionText,
                                ]}>
                                    {option.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            ))}

            <TouchableOpacity
                style={[styles.submitButton, !isComplete && styles.submitButtonDisabled]}
                onPress={handleSubmit}
                disabled={!isComplete}
            >
                <Text style={styles.submitButtonText}>Continue</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
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
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    optionButton: {
        width: '48%',
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        marginBottom: 10,
        alignItems: 'center',
    },
    selectedOption: {
        backgroundColor: '#007AFF',
    },
    optionText: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
    },
    selectedOptionText: {
        color: '#fff',
    },
    submitButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40,
    },
    submitButtonDisabled: {
        backgroundColor: '#ccc',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
}); 
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';


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


    const handleSubmit = () => {
        console.log("Survey Responses:", answers);
        navigation.replace('Camera');
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






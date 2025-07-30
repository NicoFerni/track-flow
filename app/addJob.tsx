import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { addJob } from '../core/api';
import { InterviewType, Status } from '../core/interfaces';

export default function AddJob() {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [status, setStatus] = useState<Status | 'none'>('none');
    const [interview_type, setInterviewType] = useState<InterviewType | 'none'>('none');

    const handleAddJob = async () => {
        if (!title || !company || status === 'none' || interview_type === 'none') {
            Alert.alert('Missing Fields', 'Please complete all required fields.');
            return;
        }

        try {
            await addJob({ title, company, status: status as Status, interview_type: interview_type as InterviewType });
            router.replace('/home');
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to add job');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add Job Application</Text>

            <TextInput
                placeholder="Job Title"
                style={styles.input}
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                placeholder="Company"
                style={styles.input}
                value={company}
                onChangeText={setCompany}
            />
            <View style={styles.inputPicker} >
                <Picker
                    selectedValue={status}
                    onValueChange={(itemValue) => setStatus(itemValue as Status)}
                >
                    <Picker.Item label="Status" value="none" enabled={false} />
                    <Picker.Item label="Applied" value="Applied" />
                    <Picker.Item label="Interview" value="Interview" />
                    <Picker.Item label="Rejected" value="Rejected" />
                    <Picker.Item label="Offer" value="Offer" />
                </Picker>
            </View>
            <View style={styles.inputPicker}>
                <Picker
                    selectedValue={interview_type}
                    onValueChange={(itemValue) => setInterviewType(itemValue as InterviewType)}
                >
                    <Picker.Item label="Interview type" value="none" enabled={false} />
                    <Picker.Item label="Screening" value="Screening" />
                    <Picker.Item label="Behavioral" value="Behavioral" />
                    <Picker.Item label="Live coding" value="Live coding" />
                    <Picker.Item label="Takehome" value="Takehome" />
                </Picker>

            </View>

            <TouchableOpacity style={styles.button} onPress={handleAddJob}>
                <Text style={styles.buttonText}>Save Job</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 14,
        marginBottom: 16,
        borderRadius: 10,
    },
    inputPicker: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 5,
        marginBottom: 16,
        borderRadius: 10,
    },
    button: {
        backgroundColor: '#0a84ff',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
});
